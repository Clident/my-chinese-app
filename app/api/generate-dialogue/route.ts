import { generateText, Output } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { z } from 'zod'
import { headers } from 'next/headers'
// 假设你有一个 lib 文件存 Fallback 数据
import { getRandomDialogue, type HSKLevel } from '@/lib/hsk-fallback-data'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || '',
})

// 增加一个简单的内存熔断器：如果报错，5分钟内不准再调 API
let isCircuitBroken = false;
let lastErrorTime = 0;

export async function POST(request: Request) {
  const body = await request.json()
  const level = (body.level as HSKLevel) || 'HSK1-2'
  const now = Date.now();

  // 1. 如果 5 分钟内刚报错过，直接走离线模式，不浪费请求
  if (isCircuitBroken && now - lastErrorTime < 5 * 60 * 1000) {
    console.log('[Server] Circuit Open: Skipping API and returning Fallback')
    return Response.json({ ...getRandomDialogue(level), isFallback: true, offlineMode: true })
  }

  // 2. 检查环境变量
  if (!process.env.GEMINI_API_KEY) {
    return Response.json({ ...getRandomDialogue(level), isFallback: true })
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
      prompt: `あなたは中国語教師です。HSKレベル「${level}」向けに、日常会話を作成してください...（省略原有的Prompt逻辑）`,
    })

    return Response.json({ ...output, isFallback: false })
  } catch (error: any) {
    // 3. 如果遇到 429，触发熔断
    if (error.status === 429) {
      isCircuitBroken = true;
      lastErrorTime = now;
      console.error('[Server] API 429 Triggered. Switching to Offline Mode.');
    }
    return Response.json({ ...getRandomDialogue(level), isFallback: true })
  }
}