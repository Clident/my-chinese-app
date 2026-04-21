const fs = require('fs')
const c = fs.readFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', 'utf8')
const lines = c.split('\n')
lines.forEach((l, i) => {
  if (l.includes('rúhé') || l.includes('Xīwàng') || l.includes('fāng àn')) {
    console.log(`[${i + 1}]: ${l.trim().slice(0, 160)}`)
  }
  if (l.includes('háishi') || l.includes('chéngshú') || l.includes('dìfang')) {
    console.log(`[${i + 1}]: ${l.trim().slice(0, 160)}`)
  }
})
