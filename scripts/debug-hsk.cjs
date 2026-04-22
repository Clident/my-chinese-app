const fs = require('fs')
const content = fs.readFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', 'utf8')

// Find all occurrences of 'HSK'
let pos = 0
while ((pos = content.indexOf('HSK', pos)) !== -1) {
  console.log(`Found "HSK" at position ${pos}: "${content.substring(pos, pos+30)}"`)
  pos++
}

// Show bytes around position 3480-3510 (expected end of hsk12)
console.log('\n--- Bytes around position 3480-3530 ---')
console.log(JSON.stringify(content.substring(3470, 3540)))
