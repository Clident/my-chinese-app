import { generateText, Output } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { z } from 'zod'
import { headers } from 'next/headers'
import { getRandomDialogue, type HSKLevel } from '@/lib/hsk-fallback-data'

// Environment variable check at module load
if (!process.env.GEMINI_API_KEY) {
  console.error('[Server] GEMINI_API_KEY is not configured. AI features will use fallback data.')
} else {
  console.log('[Server] GEMINI_API_KEY is configured.')
}

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
})

// Exponential backoff retry helper
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 2000
): Promise<T> {
  let lastError: unknown
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error: unknown) {
      lastError = error
      const statusCode = (error as { status?: number })?.status
      const errorMessage = (error as { message?: string })?.message || ''
      
      // Retry on 429 (rate limit) or 503 (service unavailable)
      if ((statusCode === 429 || statusCode === 503 || errorMessage.includes('429')) && attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt)
        console.log(`[Server] Rate limited (${statusCode}), retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`)
        await new Promise(resolve => setTimeout(resolve, delay))
        continue
      }
      throw error
    }
  }
  throw lastError
}

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 10 // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute in ms

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

// Schema for key vocabulary
const keyVocabularySchema = z.object({
  word: z.string().describe('重要単語'),
  pinyin: z.string().describe('ピンイン'),
  meaning: z.string().describe('日本語の意味'),
  writingNote: z.string().nullable().describe('中日漢字の書き方の違い（あれば）'),
  usageNote: z.string().nullable().describe('語感や使い方の違い（あれば）'),
})

const dialogueSchema = z.object({
  scene: z.string().describe('場面の名前（日本語）'),
  sceneEmoji: z.string().describe('場面を表す絵文字'),
  lines: z.array(
    z.object({
      speaker: z.string().describe('話者（A または B）'),
      chinese: z.string().describe('中国語の文'),
      pinyin: z.string().describe('ピンイン'),
      japanese: z.string().describe('日本語訳'),
    })
  ).min(2).max(3).describe('2〜3文の対話'),
  keyVocabulary: z.array(keyVocabularySchema).min(2).max(2).describe('2つの重要単語と解説'),
})

const scenes = [
  'コンビニ',
  '会社',
  '空港',
  'レストラン',
  '駅',
  'ホテル',
  'タクシー',
  'スーパー',
  '病院',
  '銀行',
  '学校',
  'カフェ',
  '商談',
  '面接',
  'デパート',
]

// Level-specific prompt configurations
function getLevelPrompt(level: HSKLevel, scene: string): string {
  const basePrompt = `あなたは日本人向けの中国語教師です。「${scene}」という場面での自然な中国語会話を作成してください。`
  
  switch (level) {
    case 'HSK1-2':
      return `${basePrompt}

レベル：HSK 1-2（初級）
要件：
- 2文の超短い対話（AとBの会話）
- 最も基本的な語彙のみ使用（你好、谢谢、多少钱など）
- 中日同義漢字を積極的に使用（学生、学校、先生、会社など日本人に馴染みやすい語）
- 簡単な文構造（主語+動詞+目的語）
- 各文に正確なピンインと自然な日本語訳を付ける
- 場面にふさわしい絵文字を1つ選ぶ
- 重要単語を2つ抽出し、中日漢字の違いや使い方の違いを説明

JSONで出力してください。`

    case 'HSK3-4':
      return `${basePrompt}

レベル：HSK 3-4（中級）
要件：
- 2〜3文の日常的な対話（AとBの会話）
- 中級レベルの語彙と文法（複文、補語、受け身など）
- 実用的なビジネス表現も含む
- 各文に正確なピンインと自然な日本語訳を付ける
- 場面にふさわしい絵文字を1つ選ぶ
- 重要単語を2つ抽出し、特に以下を説明：
  - 中日漢字の意味の違い（如：「手紙」中国語=トイレットペーパー、「勉強」中国語=無理強いする）
  - 日本語との語感の違い

JSONで出力してください。`

    case 'HSK5-6':
      return `${basePrompt}

レベル：HSK 5-6（高級）
要件：
- 3文の洗練された対話（AとBの会話）
- 高度な表現：成語、慣用句、敬語表現を含む
- 職場での委婉な断り方、謙遜表現、フォーマルな挨拶
- 書面語と口語の使い分け
- 各文に正確なピンインと自然な日本語訳を付ける
- 場面にふさわしい絵文字を1つ選ぶ
- 重要単語を2つ抽出し、以下を詳しく説明：
  - 高級表現の使い方とニュアンス
  - 日本のビジネス敬語との対応関係
  - 成語の背景や使用シーン

JSONで出力してください。`

    default:
      return `${basePrompt}

要件：
- 2〜3文の短い対話
- 中級レベルの中国語
- 各文に正確なピンインと自然な日本語訳を付ける
- 場面にふさわしい絵文字を1つ選ぶ
- 重要単語を2つ抽出

JSONで出力してください。`
  }
}

export async function POST(request: Request) {
  // Rate limiting check
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
  
  if (!checkRateLimit(ip)) {
    console.warn(`[Server] Rate limit exceeded for IP: ${ip}`)
    // Return fallback instead of error
    const body = await request.clone().json().catch(() => ({}))
    const level = (body.level as HSKLevel) || 'HSK1-2'
    const fallback = getRandomDialogue(level)
    return Response.json({ ...fallback, isFallback: true })
  }

  // Parse request body for level
  let level: HSKLevel = 'HSK1-2'
  try {
    const body = await request.json()
    if (body.level && ['HSK1-2', 'HSK3-4', 'HSK5-6'].includes(body.level)) {
      level = body.level as HSKLevel
    }
  } catch {
    // Default to HSK1-2 if body parsing fails
  }

  // Check if API key exists
  if (!process.env.GEMINI_API_KEY) {
    console.warn('[Server] GEMINI_API_KEY not configured, returning fallback data')
    const fallback = getRandomDialogue(level)
    return Response.json({ ...fallback, isFallback: true })
  }

  const randomScene = scenes[Math.floor(Math.random() * scenes.length)]

  try {
    const { output } = await withRetry(() => generateText({
      model: google('gemini-2.0-flash'),
      output: Output.object({
        schema: dialogueSchema,
      }),
      prompt: getLevelPrompt(level, randomScene),
    }))

    return Response.json({ ...output, isFallback: false })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const statusCode = (error as { status?: number })?.status
    
    if (statusCode === 429 || errorMessage.includes('429')) {
      console.error('[Server] API Key quota exceeded (429). Returning fallback data.')
    } else {
      console.error('[Server] AI API error:', errorMessage)
    }
    
    // Double fallback strategy: return level-appropriate fallback data
    const fallback = getRandomDialogue(level)
    return Response.json({ ...fallback, isFallback: true })
  }
}
