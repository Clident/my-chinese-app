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

const fallbackExplanation = `**文法ポイント**
この対話では基本的な挨拶と依頼の表現が使われています。「请」(qǐng) は丁寧な依頼を表す重要な表現です。

**中日漢字の違い**
「好的」は日本語の「良い」と似ていますが、中国語では同意や了承を表す返事としてよく使われます。日本語の「はい、わかりました」に相当します。

**発音のコツ**
声調に注意しましょう。特に第3声は低く抑えてから少し上げる発音です。「你好」の「你」(nǐ) は第3声です。

**使える表現**
- 谢谢 (xièxie) - ありがとう
- 不客气 (bú kèqi) - どういたしまして
- 再见 (zàijiàn) - さようなら

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

  const MAX_RETRIES = 3
  let lastError: any = null

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      recordRequest(apiKey)

      const google = createGoogleGenerativeAI({ apiKey })
      const { text } = await generateText({
        model: google('gemini-2.0-flash'),
        prompt: `你是日本人向けの中国語教師です。以下の「${scene}」での対話について、日本語で詳しく解説してください。

対話：
${dialogueText}

以下の点について、簡潔に説明してください：

1. **文法ポイント**：この対話で使われている重要な文法構造を説明してください。

2. **中日漢字の違い**：日本語と中国語で同じ漢字でも意味や使い方が異なるものがあれば、詳しく説明してください。

3. **発音のコツ**：特に注意すべき発音やピンインのポイントがあれば説明してください。

4. **使える表現**：この場面で役立つ追加の表現やフレーズがあれば紹介してください。`,
        maxOutputTokens: 1500,
      })

      return Response.json({ explanation: text })

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
