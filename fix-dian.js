const fs = require('fs')
const file = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let content = fs.readFileSync(file, 'utf8')

// Fix: diǎn'èr diǎn → diǎn (remove glued èr diǎn suffix)
// Also fix any remaining 'èr diǎn'èr' patterns
content = content.split("diǎn'èr diǎn").join("diǎn")

fs.writeFileSync(file, content, 'utf8')
console.log('Fixed diǎn èr diǎn')
