const fs = require('fs')
const file = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let c = fs.readFileSync(file, 'utf8')

// ============================================================
// 核心修复：把 pinyin 字段里的所有 '（隔音符号）替换为空格
// 原理：' 只出现在多音节词中（如 shí'èr=十二，fāng'àn=方案）
// 替换为空格后自动与 Rule A（字音一一对应）完全兼容
// ============================================================
let count = 0
c = c.replace(
  /pinyin:\s*'([^']+)'/g,
  (match, val) => {
    // 两种形态都要处理：shí'èr（裸引号）和 shí\'èr（已转义）
    const fixed = val
      .replace(/'/g, ' ')    // 裸单引号 → 空格
      .replace(/\\'/g, ' ') // 已转义 \' → 空格
      .replace(/\s+/g, ' ') // 多个空格合并为1
      .trim()
    if (fixed !== val) {
      count++
      console.log(`✓ "${val.slice(0, 60)}${val.length > 60 ? '...' : ''}"`)
      console.log(`  → "${fixed.slice(0, 60)}${fixed.length > 60 ? '...' : ''}"`)
    }
    return `pinyin: '${fixed}'`
  }
)

console.log(`\nApostrophe fixes: ${count} entries`)
fs.writeFileSync(file, c, 'utf8')
