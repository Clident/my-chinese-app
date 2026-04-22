const fs = require('fs')
const path = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let c = fs.readFileSync(path, 'utf8')

// Count apostrophes before
const before = (c.match(/'/g) || []).length

// Escape all apostrophes in the file
c = c.replace(/'/g, "\\'")

// Count after
const after = (c.match(/\\'/g) || []).length
fs.writeFileSync(path, c)
console.log(`Escaped ${after} apostrophes`)
