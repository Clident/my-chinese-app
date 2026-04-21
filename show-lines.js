const fs = require('fs')
const c = fs.readFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', 'utf8')
const lines = c.split('\n')
// 找第191行（HSK6 第二条）和第216行（HSK6 最后一条）附近的内容
lines.forEach((l, i) => {
  if (i >= 189 && i <= 196) {
    console.log(`[${i + 1}]: ${l}`)
  }
  if (i >= 213 && i <= 220) {
    console.log(`[${i + 1}]: ${l}`)
  }
})
