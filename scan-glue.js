const fs = require('fs')
const file = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let content = fs.readFileSync(file, 'utf8')

// Find all instances where tone-marked syllable is glued to next syllable
// Pattern: [a-z][àáǎäēéěëìíǐïōóǒöùúǔüǖǘǚǜ]+ followed by [àáǎäēéěëìíǐïōóǒöùúǔüǖǘǚǜ]
const regex = /([a-z])([àáǎäēéěëìíǐïōóǒöùúǔüǖǘǚǜ])'/gi
let match
let count = 0
while ((match = regex.exec(content)) !== null) {
  console.log(`Found glued: "${match[0]}" at pos ${match.index}`)
  count++
}
console.log(`Total: ${count}`)

// Fix: remove the glued second occurrence
content = content.replace(/([a-z])([àáǎäēéěëìíǐïōóǒöùúǔüǖǘǚǜ])'/gi, '$1$2')

fs.writeFileSync(file, content, 'utf8')
console.log('Done')
