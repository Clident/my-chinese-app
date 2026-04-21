const fs = require('fs')
const c = fs.readFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', 'utf8')
// 找 hsk12Dialogues 的位置
const idx = c.indexOf('hsk12Dialogues')
const idx2 = c.indexOf('hsk34Dialogues')
const idx3 = c.indexOf('hsk56Dialogues')
console.log('hsk12Dialogues at:', idx)
console.log('hsk34Dialogues at:', idx2)
console.log('hsk56Dialogues at:', idx3)
if (idx >= 0) {
  console.log('\nContent around hsk12Dialogues:')
  console.log(c.slice(idx, idx + 200))
}
