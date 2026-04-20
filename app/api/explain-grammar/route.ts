import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { headers } from 'next/headers'

// Environment variable check at module load
if (!process.env.GEMINI_API_KEY) {
  console.error('[Server] GEMINI_API_KEY is not configured for grammar explanation.')
}

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
})

// Simple in-memory rate limiting
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
  
  if (record.count >= RATE_LIMIT) {
    return false
  }
  
  record.count++
  return true
}

// Fallback explanation when API is unavailable
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
  // Rate limiting check
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
  
  if (!checkRateLimit(ip)) {
    console.warn(`[Server] Rate limit exceeded for IP: ${ip}`)
    return Response.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 }
    )
  }

  const { lines, scene } = await req.json()

  // Check if API key exists
  if (!process.env.GEMINI_API_KEY) {
    console.warn('[Server] GEMINI_API_KEY not configured, returning fallback explanation')
    return Response.json({ explanation: fallbackExplanation })
  }

  const dialogueText = lines
    .map((line: { speaker: string; chinese: string; pinyin: string; japanese: string }) => 
      `${line.speaker}: ${line.chinese} (${line.pinyin}) - ${line.japanese}`
    )
    .join('\n')

  try {
    const { text } = await generateText({
      model: google('gemini-2.0-flash'),
      prompt: `あなたは日本人向けの中国語教師です。以下の「${scene}」での対話について、日本語で詳しく解説してください。

対話：
${dialogueText}

以下の点について解説してください：

1. **文法ポイント**：この対話で使われている重要な文法構造を説明してください。

2. **中日漢字の違い**：日本語と中国語で同じ漢字でも意味や使い方が異なるものがあれば、詳しく説明してください。例えば「手紙」（日本語：手紙、中国語：トイレットペーパー）のような違いです。

3. **発音のコツ**：特に注意すべき発音やピンインのポイントがあれば説明してください。

4. **使える表現**：この場面で役立つ追加の表現やフレーズがあれば紹介してください。

分かりやすく、簡潔に説明してください。`,
      maxOutputTokens: 1500,
    })

    return Response.json({ explanation: text })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const statusCode = (error as { status?: number })?.status
    
    if (statusCode === 429) {
      console.error('[Server] API Key quota exceeded (429) for grammar explanation.')
    } else {
      console.error('[Server] AI API error in grammar explanation:', errorMessage)
    }
    
    return Response.json({ explanation: fallbackExplanation })
  }
}
