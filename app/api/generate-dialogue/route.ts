import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { z } from 'zod'
import { getRandomDialogue } from '@/lib/hsk-fallback-data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// 简单的请求限速（进程内，Railway 单实例场景够用）
const lastRequestTime = new Map<string, number>()
const COOLDOWN_MS = 55_000

function getWaitMs(key: string): number {
  const last = lastRequestTime.get(key) ?? 0
  return Math.max(0, COOLDOWN_MS - (Date.now() - last))
}
function recordRequest(key: string) {
  lastRequestTime.set(key, Date.now())
}
function extractRetryAfter(error: any): number | null {
  const msg = error?.message ?? ''
  const match = msg.match(/retry in ([\d.]+)s/i) ?? msg.match(/Please retry in ([\d.]+)/i)
  return match ? Math.ceil(parseFloat(match[1]) * 1000) : null
}

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

export async function POST(request: Request) {
  let level = 'HSK1-2'

  try {
    const body = await request.json().catch(() => ({}))
    level = body?.level || 'HSK1-2'
  } catch {
    // ignore
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey || apiKey.trim().length < 10) {
    console.log('[generate-dialogue] no valid API key, using fallback')
    return Response.json({ ...getRandomDialogue(level), isFallback: true })
  }

  // ① 限速检查：距离上次请求不到 55s → 告诉客户端等多久
  const waitMs = getWaitMs(apiKey)
  if (waitMs > 0) {
    console.log(`[generate-dialogue] rate limited, wait ${Math.ceil(waitMs / 1000)}s`)
    return Response.json(
      { ...getRandomDialogue(level), isFallback: true, retryAfterSec: Math.ceil(waitMs / 1000) },
      { headers: { 'Retry-After': String(Math.ceil(waitMs / 1000)) } }
    )
  }

  const PROMPT = `你是中文老师。请生成一个适合 HSK${level} 级别的中文情景对话。
要求：
1. 场景真实自然（如：餐厅、机场、公司等）
2. 4-6句对话
3. 每句包含：speaker（角色名，如A/B）、chinese（中文句子）、pinyin（拼音）、japanese（对应日语翻译）

请用以下JSON格式输出，不要添加任何解释或额外文字：
{
  "scene": "场景名称",
  "sceneEmoji": "🎯",
  "lines": [
    {"speaker": "A", "chinese": "你好！", "pinyin": "Nǐ hǎo!", "japanese": "こんにちは！"}
  ]
}`

  const MAX_RETRIES = 3
  let lastError: any = null

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      // ② 记录本次请求时间（调 AI 之前就记，防止并发）
      recordRequest(apiKey)

      const google = createGoogleGenerativeAI({ apiKey })
      const { text } = await generateText({
        model: google('gemini-2.0-flash'),
        prompt: PROMPT,
        maxOutputTokens: 2048,
      })

      // 从 AI 返回文本中手动提取 JSON
      const trimmed = text.trim()
      const jsonStart = trimmed.indexOf('{')
      const jsonEnd = trimmed.lastIndexOf('}')

      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error('AI response does not contain valid JSON')
      }

      const jsonStr = trimmed.slice(jsonStart, jsonEnd + 1)
      const raw = JSON.parse(jsonStr)
      const parsed = DialogueSchema.safeParse(raw)

      if (!parsed.success) {
        console.error('[generate-dialogue] Zod parse error:', parsed.error.message)
        return Response.json({ ...getRandomDialogue(level), isFallback: true })
      }

      return Response.json({ ...parsed.data, isFallback: false })

    } catch (error: any) {
      lastError = error
      const is429 = error?.statusCode === 429 || /quota|rate.?limit|429/i.test(error?.message ?? '')

      if (is429) {
        // ③ 遇到限速：提取 Retry-After，等够了再重试
        const retryMs = extractRetryAfter(error) ?? COOLDOWN_MS
        console.warn(`[generate-dialogue] 429 on attempt ${attempt}/${MAX_RETRIES}, waiting ${Math.ceil(retryMs / 1000)}s`)
        if (attempt < MAX_RETRIES) {
          await new Promise(r => setTimeout(r, retryMs))
          continue
        }
      } else {
        // 非限速错误不重试
        console.error('[generate-dialogue] error:', error?.message)
        break
      }
    }
  }

  // 所有重试都失败 → fallback
  console.error('[generate-dialogue] all retries exhausted:', lastError?.message)
  return Response.json({ ...getRandomDialogue(level), isFallback: true })
}
