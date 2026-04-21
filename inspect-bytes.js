const fs = require('fs')
const file = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
const raw = fs.readFileSync(file, 'utf8')

// 在文件层面搜索：包含 shí 和 èr 之间的那个字符（可能是 ' 或 \'）
const idx1 = raw.indexOf('shí')
const idx2 = raw.indexOf('èr')
if (idx1 >= 0 && idx2 > idx1) {
  const between = raw.slice(idx1 + 3, idx2)
  console.log(`Between shí and èr: [${between}]`)
  console.log(`Bytes: ${Buffer.from(between).toString('hex')}`)
  // 也检查 fāng 和 àn 之间
  const i3 = raw.indexOf('fāng')
  const i4 = raw.indexOf('àn')
  if (i3 >= 0 && i4 > i3) {
    const between2 = raw.slice(i3 + 4, i4)
    console.log(`Between fāng and àn: [${between2}]`)
    console.log(`Bytes: ${Buffer.from(between2).toString('hex')}`)
  }
}
