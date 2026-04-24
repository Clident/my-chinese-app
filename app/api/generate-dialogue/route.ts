import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { z } from 'zod'
import { getRandomDialogue } from '@/lib/hsk-fallback-data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ============================================================
// 限速：强制间隔 62s，跨越 Google RPM 窗口
// ============================================================
let globalLastCallTime = 0
const COOLDOWN_MS = 62_000

// ============================================================
// Schema
// ============================================================
const DialogueSchema = z.object({
  scene: z.string(),
  sceneEmoji: z.string(),
  lines: z.array(z.object({
    speaker: z.string(),
    chinese: z.string(),
    pinyin: z.string(),
    japanese: z.string(),
  })),
  keyVocabulary: z.array(z.object({
    word: z.string(),
    pinyin: z.string(),
    meaning: z.string(),
    writingNote: z.string().nullable(),
    usageNote: z.string().nullable(),
  })).optional(),
})

// ============================================================
// 限速检查（前置保护）
// ============================================================
function rateLimitGuard(): Response | null {
  const waitMs = Math.max(0, COOLDOWN_MS - (Date.now() - globalLastCallTime))
  if (waitMs > 0) {
    const waitSec = Math.ceil(waitMs / 1000)
    console.log(`[rate-limit] blocked, wait ${waitSec}s`)
    return Response.json(
      { ...getRandomDialogue('HSK1-2'), isFallback: true, retryAfterSec: waitSec },
      { status: 429, headers: { 'Retry-After': String(waitSec) } }
    )
  }
  return null
}

// ============================================================
// 从 AI 返回文本提取 JSON
// ============================================================
function extractJson(raw: string): unknown {
  // 去掉 markdown 代码块标记
  const cleaned = raw
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim()

  // 找第一个 { 到最后一个 } 之间
  const start = cleaned.indexOf('{')
  const end = cleaned.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('no JSON found in response')
  return JSON.parse(cleaned.slice(start, end + 1))
}

// ============================================================
// POST
// ============================================================
export async function POST(request: Request) {
  // ── 1. 解析 body ──────────────────────────────────────────
  let level = 'HSK1-2'
  try {
    const body = await request.json().catch(() => ({}))
    level = body?.level || 'HSK1-2'
  } catch { /* ignore */ }

  // ── 2. API Key 检查 ──────────────────────────────────────
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey || apiKey.trim().length < 10) {
    console.log('[generate-dialogue] no API key, fallback')
    return Response.json({ ...getRandomDialogue(level), isFallback: true })
  }

  // ── 3. 限速：请求发出前就更新时间戳 ──────────────────────
  const blocked = rateLimitGuard()
  if (blocked) return blocked
  globalLastCallTime = Date.now()

  // ── 4. 生成 Prompt ────────────────────────────────────────
  const PROMPT = `你是中文老师。请生成一个适合 HSK${level} 级别的中文情景对话。

要求：
1. 场景真实自然（如：餐厅、机场、公司等）
2. 4-6句对话
3. 每句包含：speaker（角色名，如A/B）、chinese（中文句子）、pinyin（带声调符号的拼音）、japanese（对应日语翻译）

【重要】pinyin 必须使用带声调符号的拼音，例如：Nǐ hǎo（不是 Ni3 hao3），mā（1声），má（2声），mǎ（3声），mà（4声）。每个汉字都必须有对应的带调拼音。

请直接输出纯 JSON，不要任何 Markdown 代码块或解释文字：
{
  "scene": "场景名称",
  "sceneEmoji": "🎯",
  "lines": [
    {"speaker": "A", "chinese": "你好！", "pinyin": "Nǐ hǎo!", "japanese": "こんにちは！"}
  ]
}`

  // ── 5. 调用 AI ───────────────────────────────────────────
  const MAX_RETRIES = 3
  let lastError: any = null

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const google = createGoogleGenerativeAI({ apiKey })
      const { text } = await generateText({
        model: google('gemini-2.0-flash'),
        prompt: PROMPT,
        maxOutputTokens: 2048,
      })

      const raw = extractJson(text)
      const parsed = DialogueSchema.safeParse(raw)

      if (!parsed.success) {
        console.error('[generate-dialogue] Zod error:', parsed.error.message)
        // 格式错直接 fallback，不重试
        return Response.json({ ...getRandomDialogue(level), isFallback: true })
      }

      return Response.json({ ...parsed.data, isFallback: false })

    } catch (error: any) {
      lastError = error
      const msg = error?.message ?? ''
      const isQuota = /429|quota|rate.?limit|resouRces exhausted/i.test(msg)

      if (isQuota) {
        const waitMs = extractRetryAfter(msg)
        const waitSec = Math.ceil(waitMs / 1000)
        console.warn(`[generate-dialogue] 429 attempt ${attempt}/${MAX_RETRIES}, wait ${waitSec}s`)

        if (attempt < MAX_RETRIES) {
          await new Promise(r => setTimeout(r, waitMs))
          continue
        }
        // 所有重试失败 → 429 返回，让前端知道要等
        return Response.json(
          { ...getRandomDialogue(level), isFallback: true, retryAfterSec: waitSec },
          { status: 429, headers: { 'Retry-After': String(waitSec) } }
        )
      }

      console.error('[generate-dialogue] error:', msg)
      break
    }
  }

  // ── 6. Fallback ───────────────────────────────────────────
  console.error('[generate-dialogue] exhausted, fallback')
  return Response.json({ ...getRandomDialogue(level), isFallback: true })
}

// ================================================================
// GET — 前端 footer 探测部署信息
// ================================================================
export async function GET() {
  return Response.json({
    version: process.env.GIT_REV || 'dev',
    timestamp: new Date().toISOString(),
    status: 'ok',
  })
}

// ── 辅助：提取 Retry-After 秒数 ──────────────────────────────
function extractRetryAfter(msg: string): number {
  const m = msg.match(/(\d+(?:\.\d+)?)\s*(?:s|seconds?)/i)
  if (m) return Math.ceil(parseFloat(m[1]) * 1000)
  const m2 = msg.match(/retry after (\d+)/i)
  if (m2) return parseInt(m2[1]) * 1000
  return COOLDOWN_MS
}
