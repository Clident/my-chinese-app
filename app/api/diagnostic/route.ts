// 极简诊断路由：逐个模块测试，看哪个导致 500

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  const steps: string[] = []
  const errors: string[] = []

  // Step 1: 基础环境
  try {
    steps.push('env: ok')
  } catch (e: any) {
    errors.push(`env: ${e.message}`)
  }

  // Step 2: zod
  try {
    const { z } = await import('zod')
    const schema = z.object({ test: z.string() })
    schema.parse({ test: 'ok' })
    steps.push('zod: ok')
  } catch (e: any) {
    errors.push(`zod: ${e.message}`)
  }

  // Step 3: getRandomDialogue
  try {
    const { getRandomDialogue } = await import('@/lib/hsk-fallback-data')
    const result = getRandomDialogue('HSK1-2')
    steps.push(`fallback-data: ok (scene=${result.scene})`)
  } catch (e: any) {
    errors.push(`fallback-data: ${e.message}`)
  }

  // Step 4: createGoogleGenerativeAI
  try {
    const { createGoogleGenerativeAI } = await import('@ai-sdk/google')
    steps.push('createGoogleGenerativeAI: imported ok')
  } catch (e: any) {
    errors.push(`createGoogleGenerativeAI: ${e.message}`)
  }

  // Step 5: generateText
  try {
    const { generateText } = await import('ai')
    steps.push('generateText: imported ok')
  } catch (e: any) {
    errors.push(`generateText: ${e.message}`)
  }

  // Step 6: 如果有 key，尝试调用 AI
  const apiKey = process.env.GEMINI_API_KEY
  if (apiKey && apiKey.trim().length >= 10) {
    try {
      const { createGoogleGenerativeAI } = await import('@ai-sdk/google')
      const { generateText } = await import('ai')
      const google = createGoogleGenerativeAI({ apiKey })
      const { text } = await generateText({
        model: google('gemini-2.0-flash'),
        prompt: 'Say hello in 3 words.',
        maxOutputTokens: 50,
      })
      steps.push(`AI call: ok (response=${text.trim().slice(0, 50)})`)
    } catch (e: any) {
      errors.push(`AI call: ${e.message}`)
    }
  } else {
    steps.push('AI call: skipped (no key)')
  }

  return Response.json({
    steps,
    errors,
    envKeyExists: !!apiKey,
    envKeyPrefix: apiKey ? `${apiKey.slice(0, 10)}...` : 'none',
  })
}
