import { generateText, Output } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { z } from 'zod'
import { NextResponse } from 'next/server'
import { getRandomDialogue, type HSKLevel } from '@/lib/hsk-fallback-data'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || '',
})

// 增加一个简单的内存熔断器：如果报错，5分钟内不准再调 API
let isCircuitBroken = false;
let lastErrorTime = 0;

export async function POST(request: Request) {
  // 重点 1: 必须使用 await，且增加 try-catch 防止解析空 body 报错
  let level: HSKLevel = 'HSK1-2';
  try {
    const body = await request.json(); 
    level = (body.level as HSKLevel) || 'HSK1-2';
  } catch (e) {
    console.log('[Server] No JSON body found, using default level');
  }

  const now = Date.now();

  // 1. 熔断保护逻辑
  if (isCircuitBroken && now - lastErrorTime < 5 * 60 * 1000) {
    console.log('[Server] Circuit Open: Returning Fallback');
    return NextResponse.json({ ...getRandomDialogue(level), isFallback: true, offlineMode: true });
  }

  // 2. 检查环境变量
  if (!process.env.GEMINI_API_KEY) {
    console.warn('[Server] No API Key found, using Fallback');
    return NextResponse.json({ ...getRandomDialogue(level), isFallback: true });
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

    return NextResponse.json({ ...output, isFallback: false })

  } catch (error: any) {
    console.error('[Server] API Error:', error.message);
    
    // 3. 遇到 429 错误时触发熔断
    if (error.status === 429 || error.message?.includes('429')) {
      isCircuitBroken = true;
      lastErrorTime = now;
    }
    
    // 强制返回标准的 JSON 格式兜底数据，确保前端不报 SyntaxError
    const fallback = getRandomDialogue(level);
    return NextResponse.json({ ...fallback, isFallback: true, errorReason: error.message }, { status: 200 });
  }
}