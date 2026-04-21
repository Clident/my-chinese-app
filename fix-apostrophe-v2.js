const fs = require('fs')
let c = fs.readFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', 'utf8')

// ============================================================
// 核心修复：在 pinyin 字段的单引号旁插入空格
// 原理：单引号只出现在多音节词中（如 shí'èr = 十二, fāng'àn = 方案）
// 替换为 "shí èr"、"fāng àn" 后，数据完全等价格式
// ============================================================
let count = 0
c = c.replace(
  /pinyin:\s*'([^']+)'/g,
  (match, val) => {
    // 把 shí'èr → shí èr，fāng'àn → fāng àn
    const fixed = val.replace(/([a-zA-ZāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüÜ])\s*'\s*([a-zA-ZāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüÜ])/g, '$1 $2')
    if (fixed !== val) {
      count++
      console.log(`⌁ "${val}" → "${fixed}"`)
    }
    return `pinyin: '${fixed}'`
  }
)

console.log(`\nApostrophe fixes: ${count}`)
fs.writeFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', c, 'utf8')
