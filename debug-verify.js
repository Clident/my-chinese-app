const fs = require('fs')
const c = fs.readFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', 'utf8')
const lines = c.split('\n')
let count = 0
lines.forEach((l, i) => {
  if (l.includes('{ speaker:')) {
    count++
    if (count <= 3) console.log('[' + (i + 1) + '] ' + l.trim().slice(0, 100))
  }
})
console.log('Total lines with { speaker:: ' + count)
console.log('File length: ' + c.length + ' chars')

// 测试 chinese 和 pinyin regex
const test = lines.find(l => l.includes('{ speaker:'))
if (test) {
  console.log('\nTest line: ' + test.slice(0, 80))
  const m = test.match(/chinese:\s*'([^']+)'/)
  console.log('chMatch:', m ? '"' + m[1].slice(0, 40) + '"' : 'null')
  const p = test.match(/pinyin:\s*'([^']+)'/)
  console.log('pyMatch:', p ? '"' + p[1].slice(0, 40) + '"' : 'null')
}
