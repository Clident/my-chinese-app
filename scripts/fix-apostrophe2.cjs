const fs = require('fs')
const path = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let c = fs.readFileSync(path, 'utf8')

// Fix: apostrophe in pinyin values breaks single-quoted strings
// Replace Nuòbèi'ěr (pinyin with apostrophe separator) -> Nuòbèi\'ěr
c = c.replace(/Nuòbèi'ěr/g, "Nuòbèi\\'ěr")

// Also fix any other apostrophes that might be inside single-quoted strings
// Scan and replace only apostrophes that appear to be inside string values
// Strategy: find all single-quoted string values and escape apostrophes within them
c = c.replace(/'([^']*)'([^']*)'/g, (match, p1, p2) => {
  // Check if the content has unescaped apostrophes
  return "'" + p1.replace(/'/g, "\\'") + "'" + p2.replace(/'/g, "\\'") + "'"
})

fs.writeFileSync(path, c)
console.log('done')
