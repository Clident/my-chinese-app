const fs = require('fs')
const c = fs.readFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', 'utf8')
const lines = c.split('\n')
// 找包含 Yǒu de 的那条（HSK3）
lines.forEach((l, i) => {
  if (l.includes('Yǒu de') || l.includes('密码在房卡')) {
    console.log(`[${i + 1}]: ${l}`)
  }
  if (l.includes('既然事情') || l.includes('Jìrán')) {
    console.log(`[${i + 1}]: ${l}`)
  }
  if (l.includes('方案我们研究') || l.includes('Zhè cì de fāng')) {
    console.log(`[${i + 1}]: ${l}`)
  }
})
