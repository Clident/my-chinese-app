const fs = require('fs')
const c = fs.readFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', 'utf8')
console.log('Total length:', c.length)
const lines = c.split('\n')
console.log('Total lines:', lines.length)
const speakerLines = lines.filter(l => l.includes('speaker'))
console.log('Lines with speaker:', speakerLines.length)
if (speakerLines.length > 0) {
  console.log('First:', speakerLines[0].trim().slice(0, 120))
  console.log('Third:', speakerLines[2].trim().slice(0, 120))
}
