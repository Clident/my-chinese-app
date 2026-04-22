/**
 * Batch dialogue generator for HSK fallback data
 * Usage: node --experimental-vm-modules scripts/batch-generate.mjs [level] [count]
 * Example: node scripts/batch-generate.mjs hsk12 10
 */
import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

// ⚠️ LOCAL DEV ONLY — never commit this key to git
const API_KEY = 'AIzaSyCUqzwV8YSNo9Mi-ZWe7arf2HwEsHVhVug'

const google = createGoogleGenerativeAI({ apiKey: API_KEY })

const LEVEL_CONFIG = {
  hsk12: {
    level: 'HSK1-2',
    scenes: [
      'コンビニ', '学校', 'カフェ', 'レストラン', '駅', '病院', '銀行',
      '美容院', '友達との聊天', '的市场', 'バスの中で', '映画館', '図書館',
      '健身房', '旅行代理点', ' 택시안에서', 'KTV', ' пиццерия',
    ],
    levelNum: 1,
  },
  hsk34: {
    level: 'HSK3-4',
    scenes: [
      '公司', '医院', '银行', '酒店', '百货商店', '警察署', '邮局',
      '眼镜店', '房产中介', '旅行社', '驾校', '理发店', '电脑维修店',
      '签证中心', '快递公司', '手机店', '花店', '蛋糕店',
    ],
    levelNum: 3,
  },
  hsk56: {
    level: 'HSK5-6',
    scenes: [
      '高管会议', '学术研讨会', '法律咨询', '投资洽谈', '产品发布会',
      '年终总结会', '离职面谈', '绩效考核', '项目立项会', '危机公关',
      '媒体采访', '政府拜会', '学术论文答辩', '国际展会', '慈善拍卖会',
    ],
    levelNum: 5,
  },
}

const SCHEMA = `{
  "scene": "场景名称",
  "sceneEmoji": "🎯",
  "lines": [
    {"speaker": "A", "chinese": "中文句子", "pinyin": "带声调拼音", "japanese": "日语翻译"}
  ],
  "keyVocabulary": [
    {"word": "单词", "pinyin": "拼音", "meaning": "日语意思", "writingNote": "中日差异", "usageNote": "用法注意"}
  ]
}`

async function generateBatch(level, count = 10) {
  const config = LEVEL_CONFIG[level]
  if (!config) {
    console.error(`Unknown level: ${level}`)
    console.log('Available:', Object.keys(LEVEL_CONFIG).join(', '))
    process.exit(1)
  }

  const model = google('gemini-2.0-flash')
  const results = []

  for (let i = 0; i < count; i++) {
    const scene = config.scenes[i % config.scenes.length]
    const prompt = `你是一名对外汉语老师。请为${config.level}级别生成1个中文情景对话。

要求：
1. 场景：${scene}
2. HSK${config.levelNum}级别，对应约${config.levelNum === 1 ? '150' : config.levelNum === 3 ? '1200' : '5000'}词汇量
3. ${config.levelNum <= 2 ? '2-4句对话，句子要简短实用' : '3-5句对话，表达自然流畅'}
4. pinyin必须是完整音节，空格分隔每个汉字的拼音（如"Nǐ hǎo!"而不是"Nǐhǎo!"）
5. 词汇解释要指出中日汉字写法的差异

请严格输出以下JSON格式，不要添加任何解释或markdown代码块：
${SCHEMA}`

    try {
      // Throttle: wait between requests to avoid quota
      if (i > 0) {
        console.log(`  Waiting 3s before request ${i + 1}...`)
        await new Promise(r => setTimeout(r, 3000))
      }

      const { text } = await generateText({
        model: model,
        prompt: prompt,
        maxOutputTokens: 1024,
      })

      // Extract JSON from response
      const jsonStart = text.indexOf('{')
      const jsonEnd = text.lastIndexOf('}')
      if (jsonStart === -1 || jsonEnd === -1) {
        console.log(`  ⚠ Request ${i + 1}: no JSON found, skipping`)
        continue
      }

      const jsonStr = text.slice(jsonStart, jsonEnd + 1)
      const parsed = JSON.parse(jsonStr)

      // Validate structure
      if (!parsed.lines || !Array.isArray(parsed.lines) || parsed.lines.length === 0) {
        console.log(`  ⚠ Request ${i + 1}: invalid lines, skipping`)
        continue
      }

      // Validate each line has chinese + pinyin + japanese
      for (const line of parsed.lines) {
        if (!line.chinese || !line.pinyin || !line.japanese) {
          console.log(`  ⚠ Request ${i + 1}: line missing fields, skipping`)
          continue
        }
        // Fix pinyin: ensure no spaces inside a single character's pinyin
        // Split pinyin by spaces, each token should match one Chinese char
        const chars = line.chinese.replace(/[，。！？、；：""''（）《》【】\s]/g, '').split('')
        const pinyins = line.pinyin.split(/\s+/).filter(p => p.length > 0)
        // For now just strip trailing punctuation from pinyin
        line.pinyin = line.pinyin.replace(/([āēīōūǖáéíóúǘǎěǐǒǔǚàèìòùǜn])!/g, '$1!').replace(/([āēīōūǖáéíóúǘǎěǐǒǔǚàèìòùǜn])\./g, '$1.')
        line.pinyin = line.pinyin.replace(/([āēīōūǖáéíóúǘǎěǐǒǔǚàèìòùǜn]),/g, '$1,')
        line.pinyin = line.pinyin.replace(/([āēīōūǖáéíóúǘǎěǐǒǔǚàèìòùǜn])\?/g, '$1?')
      }

      results.push(parsed)
      console.log(`  ✅ Request ${i + 1}: "${parsed.scene}" (${parsed.lines.length} lines)`)

      // Cooldown after every 3 requests
      if ((i + 1) % 3 === 0 && i < count - 1) {
        console.log(`  ⏸ 5s cooldown after batch of 3...`)
        await new Promise(r => setTimeout(r, 5000))
      }
    } catch (err) {
      console.error(`  ❌ Request ${i + 1} error:`, err.message)
      // Wait longer on error
      await new Promise(r => setTimeout(r, 8000))
    }
  }

  return results
}

// Pretty-print as TypeScript export
function formatAsTS(dialogues, levelKey) {
  const lines = dialogues.map(d => {
    const linesStr = d.lines.map(l =>
      `      { speaker: '${l.speaker}', chinese: '${l.chinese.replace(/'/g, "\\'")}', pinyin: '${(l.pinyin || '').replace(/'/g, "\\'")}', japanese: '${l.japanese.replace(/'/g, "\\'")}' }`
    ).join(',\n')

    const vocabStr = (d.keyVocabulary || []).map(v =>
      `      { word: '${(v.word || '').replace(/'/g, "\\'")}', pinyin: '${(v.pinyin || '').replace(/'/g, "\\'")}', meaning: '${(v.meaning || '').replace(/'/g, "\\'")}', writingNote: '${((v.writingNote || '').replace(/'/g, "\\'"))}', usageNote: '${((v.usageNote || '').replace(/'/g, "\\'"))}' }`
    ).join(',\n')

    return `  {
    scene: '${d.scene.replace(/'/g, "\\'")}',
    sceneEmoji: '${d.sceneEmoji || '🎯'}',
    lines: [
${linesStr}
    ],
    keyVocabulary: [
${vocabStr}
    ],
  }`
  })

  return `export const ${levelKey}Dialogues: FallbackDialogue[] = [
${lines.join(',\n')}
]`
}

// Main
const args = process.argv.slice(2)
const levelArg = (args[0] || 'hsk12').toLowerCase()
const count = parseInt(args[1] || '10', 10)

const levelMap = {
  hsk12: 'hsk12Dialogues',
  hsk34: 'hsk34Dialogues',
  hsk56: 'hsk56Dialogues',
  all: ['hsk12', 'hsk34', 'hsk56'],
}

const levels = levelArg === 'all' ? ['hsk12', 'hsk34', 'hsk56'] : [levelArg]

;(async () => {
  for (const lvl of levels) {
    if (!LEVEL_CONFIG[lvl]) {
      console.error(`Unknown: ${lvl}`)
      continue
    }
    console.log(`\n=== Generating ${count} dialogues for ${lvl} ===`)
    const dialogues = await generateBatch(lvl, count)
    const ts = formatAsTS(dialogues, levelMap[lvl])
    console.log(`\n--- ${lvl} output ---`)
    console.log(ts)
    console.log(`\nTotal generated this run: ${dialogues.length}`)
  }
  console.log('\n✅ Done. Copy the output into lib/hsk-fallback-data.ts')
})()
