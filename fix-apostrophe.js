const fs = require('fs')
let c = fs.readFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', 'utf8')
// 修掉 fāng'àn 中的单引号（破坏 TypeScript 字符串字面量）
c = c.replace(/fāng'àn/g, 'fāng àn')
// 同时把 yánjiū → yán jiū, chéngshú → chéng shú, yǒuxiē → yǒu xiē, dìfang → dì fang
c = c.replace(/yánjiū/g, 'yán jiū')
c = c.replace(/chéngshú/g, 'chéng shú')
c = c.replace(/yǒuxiē/g, 'yǒu xiē')
c = c.replace(/dìfang/g, 'dì fang')
fs.writeFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', c, 'utf8')
console.log('Fixed: fāng àn, yán jiū, chéng shú, yǒu xiē, dì fang')
