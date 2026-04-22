const fs = require('fs')
const path = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let c = fs.readFileSync(path, 'utf8')

// The file uses single-quoted strings. Any apostrophe inside a string value breaks parsing.
// Fix pinyin apostrophes by escaping them
c = c.replace(/Nuòbèi'ěr/g, "Nuòbèi\\'ěr")

// For all other cases: scan line by line, find single-quoted values, escape inner apostrophes
const lines = c.split('\n')
const fixed = lines.map(line => {
  // Match: 'key': 'value' patterns - find values that contain unescaped apostrophes
  return line.replace(/'(?=.*')/g, "\\'")
})
fs.writeFileSync(path, fixed.join('\n'))
console.log('Fixed')
