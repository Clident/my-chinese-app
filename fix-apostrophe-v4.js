const fs = require('fs')
const file = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
const raw = fs.readFileSync(file, 'utf8')

// ============================================================
// 逐字符解析：找到每个 pinyin: '...' 字段的真实边界
// 处理 \' 转义（TS 字符串内的转义单引号）
// ============================================================
let result = ''
let i = 0
let pinyinCount = 0
let fixCount = 0

while (i < raw.length) {
  // 查找下一个 pinyin: '
  const marker = "pinyin: '"
  const idx = raw.indexOf(marker, i)
  if (idx === -1) {
    result += raw.slice(i)
    break
  }

  result += raw.slice(i, idx + marker.length)
  i = idx + marker.length  // 跳过 pinyin: '

  // 逐字符扫描 pinyin 字段值
  let pinyinVal = ''
  while (i < raw.length) {
    const ch = raw[i]
    if (ch === '\\' && raw[i + 1] === "'") {
      // 已转义的 \' → 替换为空格（视为音节分隔）
      pinyinVal += ' '
      i += 2
      fixCount++
    } else if (ch === "'") {
      // 未转义 ' → 字符串结束 or 隔音符号
      // 如果后面紧跟字母/隔音符号特征 → 视为隔音符号，替换为空格
      const next = raw[i + 1]
      if (next && /[a-zA-ZāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüÜ]/.test(next)) {
        // 隔音符号：' 前后是字母 → 替换为空格，不结束字符串
        pinyinVal += ' '
        i += 1
        fixCount++
      } else {
        // 字符串结束引号
        i++ // 跳过 '
        break
      }
    } else {
      pinyinVal += ch
      i++
    }
  }

  if (pinyinVal.includes("'")) {
    // 替换残留的未处理引号
    const fixed = pinyinVal.replace(/'/g, ' ').replace(/\s+/g, ' ').trim()
    if (fixed !== pinyinVal) fixCount++
    pinyinVal = fixed
  }

  if (pinyinVal) {
    result += pinyinVal + "'"
    pinyinCount++
  }
}

console.log(`Parsed ${pinyinCount} pinyin fields, apostrophe fixes: ${fixCount}`)
fs.writeFileSync(file, result, 'utf8')
console.log('Done!')
