import { generateText, Output } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { z } from 'zod'
import { getRandomDialogue } from '@/lib/hsk-fallback-data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let level: any = 'HSK1-2'

  try {
    const body = await request.json().catch(() => ({}))
    level = body?.level || 'HSK1-2'

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey || apiKey.length < 10) {
      console.error('API Key Missing or Invalid')
      return Response.json({ ...getRandomDialogue(level), isFallback: true, msg: 'No Key' })
    }

    const google = createGoogleGenerativeAI({ apiKey })

    const { output } = await generateText({
      model: google('gemini-2.0-flash'),
      output: Output.object({
        schema: z.object({
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
          })),
        }),
      }),
      prompt: `あなたは中国語教師です。HSK${level}レベルの短い会話を1つ作成してください。JSONで出力。`,
    })

    return Response.json({ ...output, isFallback: false })

  } catch (error: any) {
    console.error('CRITICAL_BACKEND_ERROR:', error?.message)

    try {
      const fallback = getRandomDialogue(level)
      return new Response(JSON.stringify({
        ...fallback,
        isFallback: true,
        error_info: error?.message,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (_innerError) {
      return new Response(JSON.stringify({ scene: 'Error', lines: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }
}
