const fs = require('fs')
const path = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let c = fs.readFileSync(path, 'utf8')
// Fix apostrophes inside single-quoted strings
c = c.replace(/Don't/g, "Don\\'t")
c = c.replace(/It's/g, "It\\'s")
c = c.replace(/don't/g, "don\\'t")
c = c.replace(/I've/g, "I\\'ve")
fs.writeFileSync(path, c)
console.log('Fixed apostrophes in strings')
