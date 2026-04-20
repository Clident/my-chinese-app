import { generateText, Output } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { z } from 'zod'
import { getRandomDialogue } from '../../../lib/hsk-fallback-data'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || '',
})

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let level = 'HSK1-2'

  const body = await request.json().catch(() => ({}))
  level = body.level || 'HSK1-2'

  if (!process.env.GEMINI_API_KEY) {
    console.log('No Key, using fallback')
    return Response.json({ ...getRandomDialogue(level as any), isFallback: true })
  }

  try {
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
      prompt: `你是一个中文老师。请严格按照下面的 JSON 结构返回结果，不能有额外解释或文本：
{
  "scene": "...",
  "sceneEmoji": "...",
  "lines": [
    {"speaker": "...", "chinese": "...", "pinyin": "...", "japanese": "..."}
  ],
  "keyVocabulary": [
    {"word": "...", "pinyin": "...", "meaning": "...", "writingNote": "...", "usageNote": "..."}
  ]
}
请生成符合 HSK レベル「${level}」的日常会話。writingNote と usageNote は必要に応じて null にしてください。`,
    })

    if (!output || typeof output !== 'object') {
      throw new Error('AI returned invalid output')
    }

    return Response.json({ ...output, isFallback: false })

  } catch (error: any) {
    console.error('Final Backend Catch:', error?.message ?? error)

    // 强制返回标准的 JSON 结构兜底数据，确保前端不报 SyntaxError
    const fallback = getRandomDialogue(level as any)
    return new Response(JSON.stringify({
      ...fallback,
      isFallback: true,
      error: true,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}