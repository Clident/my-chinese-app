import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { z } from 'zod'
import { getRandomDialogue } from '@/lib/hsk-fallback-data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

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

  // 无 Key → 直接走离线数据，不调 AI
  if (!apiKey || apiKey.trim().length < 10) {
    return Response.json({ ...getRandomDialogue(level), isFallback: true })
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

  try {
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
    console.error('[generate-dialogue] error:', error?.message)
    return Response.json({ ...getRandomDialogue(level), isFallback: true })
  }
}
