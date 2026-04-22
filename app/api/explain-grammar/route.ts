import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// 限速：和 generate-dialogue 共用逻辑，55s 冷却
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

const fallbackExplanation = `【語源】
この対話で使われている基本的な語彙について説明します。

【使い分け】
丁寧な依頼には「请」(qǐng) を使い、日常会話ではシンプルな表現が好まれます。

※ 現在AIサーバーに接続できないため、一般的な解説を表示しています。`

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey || apiKey.trim().length < 10) {
    return Response.json({ explanation: fallbackExplanation })
  }

  // 限速检查
  const waitMs = getWaitMs(apiKey)
  if (waitMs > 0) {
    return Response.json(
      { explanation: fallbackExplanation, retryAfterSec: Math.ceil(waitMs / 1000) },
      { headers: { 'Retry-After': String(Math.ceil(waitMs / 1000)) } }
    )
  }

  let lines: any[] = []
  let scene = '一般'

  try {
    const body = await req.json()
    lines = body?.lines ?? []
    scene = body?.scene ?? '一般'
  } catch {
    // ignore parse error
  }

  const dialogueText = lines
    .map((line) => `${line.speaker}: ${line.chinese} (${line.pinyin}) - ${line.japanese}`)
    .join('\n')

  // 强制人设 system prompt — PM 严禁瞎编版本
  const systemPrompt = `你现在是一位极其严谨的中文教育专家。在生成文法和单词解释时，必须遵守以下死命令：

1. **严禁瞎编！**「健身」就是健身(Fitness)，绝不等于「健康」(Health)。每个词必须准确解释。
2. **拼音严禁空格！** 必须是 (jiànshēn)，严禁 (jiàn shē n)。音节内部绝对不能有空格。
3. **结构必须清晰：**
   - 【单词】(拼音) - 日语意思
   - 📝 核心点：用一句话说清楚用法或文化背景
   - 💬 场景：这个词在什么场景下最常用
4. **如果不确定，宁可不写，也不要乱写。**`

  const userPrompt = `请解释以下「${scene}」场景对话中的重点词汇和表达：

${dialogueText}

请用日语解释，控制在150字以内，必须遵守格式要求。`

  const MAX_RETRIES = 3
  let lastError: any = null

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      recordRequest(apiKey)

      const google = createGoogleGenerativeAI({ apiKey })
      const { text } = await generateText({
        model: google('gemini-2.0-flash'),
        system: systemPrompt,
        prompt: userPrompt,
        maxOutputTokens: 800,
      })

      // 修拼音空格：声调元音后如果有空格，移除它
      const cleaned = text.replace(/([āáǎàēéěèīíǐìōóǒòūúǔùüǖǘǚǜ])\s+/gi, '$1')
      return Response.json({ explanation: cleaned })

    } catch (error: any) {
      lastError = error
      const is429 = error?.statusCode === 429 || /quota|rate.?limit|429/i.test(error?.message ?? '')

      if (is429) {
        const retryMs = extractRetryAfter(error) ?? COOLDOWN_MS
        console.warn(`[explain-grammar] 429 on attempt ${attempt}/${MAX_RETRIES}, waiting ${Math.ceil(retryMs / 1000)}s`)
        if (attempt < MAX_RETRIES) {
          await new Promise(r => setTimeout(r, retryMs))
          continue
        }
      } else {
        console.error('[explain-grammar] AI error:', error?.message)
        break
      }
    }
  }

  console.error('[explain-grammar] all retries exhausted:', lastError?.message)
  return Response.json({ explanation: fallbackExplanation })
}
