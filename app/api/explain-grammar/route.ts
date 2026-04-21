import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Simple in-memory rate limiting (resets on cold start, acceptable for Vercel)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 10
const RATE_LIMIT_WINDOW = 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT) return false

  record.count++
  return true
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
  const ip = req.headers.get('x-forwarded-for')
    || req.headers.get('x-real-ip')
    || 'unknown'

  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 }
    )
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey || apiKey.trim().length < 10) {
    return Response.json({ explanation: fallbackExplanation })
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

  try {
    const google = createGoogleGenerativeAI({ apiKey })

    const { text } = await generateText({
      model: google('gemini-2.0-flash'),
      prompt: `你是日本人向けの中国語教師です。以下の「${scene}」での対話について、日本語で詳しく解説してください。

対話：
${dialogueText}

以下の点？谢邀能く、簡潔に説明してください：

1. **文法ポイント**：この対話で使われている重要な文法構造を説明してください。

2. **中日漢字の違い**：日本語と中国語で同じ漢字でも意味や使い方が異なるものがあれば、詳しく説明してください。

3. **発音のコツ**：特に注意すべき発音やピンインのポイントがあれば説明してください。

4. **使える表現**：この場面で役立つ追加の表現やフレーズがあれば紹介してください。`,
      maxOutputTokens: 1500,
    })

    return Response.json({ explanation: text })

  } catch (error: any) {
    console.error('[explain-grammar] AI error:', error?.message)
    return Response.json({ explanation: fallbackExplanation })
  }
}
