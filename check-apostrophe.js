const fs = require('fs')
const c = fs.readFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', 'utf8')
// 找所有 pinyin 字段
const matches = [...c.matchAll(/pinyin:\s*'([^']+)'/g)]
console.log(`Total pinyin fields: ${matches.length}`)
matches.forEach((m, i) => {
  if (m[1].includes("'") || m[1].includes("\\'")) {
    console.log(`[${i}] RAW: "${m[1]}"`)
  }
})
