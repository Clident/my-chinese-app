const fs = require('fs')
const path = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let content = fs.readFileSync(path, 'utf8')

// Find end of each array (the closing bracket + comma + newline before next export or helper)
function findArrayEnd(content, arrayStart) {
  // Find the position after array name: " = ["
  const startPos = content.indexOf(' = [', arrayStart) + 4
  if (startPos < 4) return -1
  
  // Count brackets to find matching close
  let depth = 1
  let pos = startPos
  while (depth > 0 && pos < content.length) {
    const char = content[pos]
    if (char === '[') depth++
    if (char === ']') depth--
    pos++
  }
  return pos - 1 // position of closing ]
}

// Find array declarations
const hsk12Start = content.indexOf('export const hsk12Dialogues')
const hsk34Start = content.indexOf('export const hsk34Dialogues')
const hsk56Start = content.indexOf('export const hsk56Dialogues')

const hsk12End = findArrayEnd(content, hsk12Start)
const hsk34End = findArrayEnd(content, hsk34Start)
const hsk56End = findArrayEnd(content, hsk56Start)

console.log('HSK12 array ends at char:', hsk12End, 'line:', content.substring(0, hsk12End).split('\n').length)
console.log('HSK34 array ends at char:', hsk34End, 'line:', content.substring(0, hsk34End).split('\n').length)
console.log('HSK56 array ends at char:', hsk56End, 'line:', content.substring(0, hsk56End).split('\n').length)

// Show context around each end
console.log('\n--- HSK12 end context ---')
console.log(content.substring(hsk12End - 50, hsk12End + 20))

console.log('\n--- HSK34 end context ---')
console.log(content.substring(hsk34End - 50, hsk34End + 20))

console.log('\n--- HSK56 end context ---')
console.log(content.substring(hsk56End - 50, hsk56End + 20))
