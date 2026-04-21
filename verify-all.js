// verify-all.js — 严格按 Rule A: pinyin.split(' ').length === chinese.split('').length
// 但用 prepareData 的镜像对齐算法：汉字按 /[\u4e00-\u9fa5]|[a-zA-Z0-9-]+|[^\w\s]/ 拆分
const fs = require('fs')
const file = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
const content = fs.readFileSync(file, 'utf8')

const isPunctuation = (char) => /^[^\w\u4e00-\u9fa5]+$/.test(char)

const lines = content.split('\n')
let errors = 0
let total = 0

for (const line of lines) {
  if (!line.trim().startsWith('{ speaker') && !line.includes("speaker : '")) continue
  const chMatch = line.match(/chinese\s*:\s*'([^']+)'/)
  const pyMatch = line.match(/pinyin\s*:\s*'([^']+)'/)
  if (!chMatch || !pyMatch) continue

  const chineseRaw = chMatch[1]
  const pinyinRaw = pyMatch[1]

  // 与 scene-dialogue.tsx 的 prepareData 完全一致的归一化逻辑
  const normalizedPy = pinyinRaw
    .replace(/([，。？！,.?!：；])/g, ' $1 ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  const chineseChars = chineseRaw.match(/[\u4e00-\u9fa5]|[a-zA-Z0-9-]+|[^\w\s]/g) || []

  total++
  if (normalizedPy.length !== chineseChars.length) {
    errors++
    const shortC = chineseRaw.length > 45 ? chineseRaw.slice(0, 45) + '...' : chineseRaw
    const shortP = pinyinRaw.length > 45 ? pinyinRaw.slice(0, 45) + '...' : pinyinRaw
    const diff = normalizedPy.length - chineseChars.length
    console.log(`❌ (py=${normalizedPy.length} ch=${chineseChars.length} ${diff > 0 ? '+' + diff : diff}) ${shortC}`)
    console.log(`   py: ${shortP}`)
    console.log(`   pyArr: [${normalizedPy.join(', ')}]`)
    console.log(`   chArr: [${chineseChars.join(', ')}]`)
    console.log()
  }
}

if (errors === 0) {
  console.log(`✅ All ${total} entries pass Rule A!`)
} else {
  console.log(`\n⚠️  ${errors} mismatches out of ${total}`)
}
