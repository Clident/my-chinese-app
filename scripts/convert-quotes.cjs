const fs = require('fs')
const path = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let c = fs.readFileSync(path, 'utf8')

// Strategy: only escape apostrophes that appear INSIDE string values,
// not the string delimiters themselves.
// We do this by replacing "word: '" with 'word: \''  (only when followed by content then ')
// Actually, easier: replace pinyin apostrophes specifically
// Nuòbèi'ěr -> use Unicode escape or double quotes
// For all single-quoted string values that contain apostrophes:
// change to double-quoted strings

// Step 1: Fix pinyin apostrophes (音节分隔符) -> escape them
c = c.replace(/Nuòbèi'ěr/g, 'Nuòbèi\\'ěr')

// Step 2: For any other apostrophes inside single-quoted strings, escape them
// This regex matches: 'content with ' inside'  (two single quotes with content between)
// Replace inner ones with \'
c = c.replace(/'(?=[^']*')/g, "\\'")

fs.writeFileSync(path, c)
console.log('done')
