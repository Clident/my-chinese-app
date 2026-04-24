// migrate-scene-ja.js
// 为 hsk-fallback-data.ts 每个 dialogue 对象插入 scene_ja 字段
// scene_ja = scene 的值

const fs = require('fs')
const path = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let content = fs.readFileSync(path, 'utf8')

let count = 0
content = content.replace(
  /(\n    scene:\s*'[^']+')/g,
  (match, prefix) => {
    count++
    // Extract scene value
    const m = prefix.match(/scene:\s*'([^']+)'/)
    const sceneVal = m ? m[1] : ''
    return `${prefix},\n    scene_ja: '${sceneVal}'`
  }
)

console.log(`Processed ${count} scene entries`)
fs.writeFileSync(path, content, 'utf8')
console.log('Written.')