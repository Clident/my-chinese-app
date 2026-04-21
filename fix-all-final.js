const fs = require('fs')
const file = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let content = fs.readFileSync(file, 'utf8')

// ============================================================
// 手术刀：精准切除 5 个顽固病灶
// ============================================================
const surgicalFix = (pinyin) => {
  return pinyin
    .replace(/dàxué/g, 'dà xué')
    .replace(/dàxuéshēng/g, 'dà xué shēng')
    .replace(/Zhège/g, 'Zhè gè')
    .replace(/nǎlǐ/g, 'nǎ lǐ')
    .replace(/liǎojiě/g, 'liǎo jiě')
    .replace(/zánmen/g, 'zán men')
    .replace(/qièshí/g, 'qiè shí')
    // 修复标点粘附：在任何声调字母/拉丁字母和标点之间强制补空格
    .replace(/([āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜa-zA-Z])\s*([，。？！,.?!])/g, '$1 $2')
    // 修复可能存在的双空格/多余空格
    .replace(/\s+/g, ' ')
    .trim()
}

let count = 0
content = content.replace(
  /pinyin:\s*'([^']+)'/g,
  (match, pinyinVal) => {
    const fixed = surgicalFix(pinyinVal)
    if (fixed !== pinyinVal) {
      count++
      console.log(`✓ "${pinyinVal.slice(0, 80)}${pinyinVal.length > 80 ? '...' : ''}"`)
      console.log(`  → "${fixed.slice(0, 80)}${fixed.length > 80 ? '...' : ''}"`)
    }
    return `pinyin: '${fixed}'`
  }
)

console.log(`\nSurgical fixes applied: ${count} entries`)
fs.writeFileSync(file, content, 'utf8')
