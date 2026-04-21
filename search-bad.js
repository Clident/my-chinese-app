const fs = require('fs')
const c = fs.readFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', 'utf8')
const lines = c.split('\n')
lines.forEach((l, i) => {
  if (l.includes('dàxuéshēng') || l.includes('Zhège') || l.includes('nǎlǐ') || l.includes('fāng\\')) {
    console.log((i + 1) + ': ' + l.trim().slice(0, 160))
  }
})
