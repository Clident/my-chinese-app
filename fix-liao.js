const fs = require('fs')
const file = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let content = fs.readFileSync(file, 'utf8')

content = content.split('liǎojiě').join('liǎo jiě')

fs.writeFileSync(file, content, 'utf8')
console.log('Fixed liǎojiě → liǎo jiě')
