const fs = require('fs')
let c = fs.readFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', 'utf8')

// 修复 Nǎlǐ（大写）→ Nǎ lǐ
c = c.replace(/Nǎlǐ/g, 'Nǎ lǐ')

// 修复被截断的那条数据（pinyin: 'Zhè cì de fāng\'）
// 完整应该是：Zhè cì de fāng àn wǒ men yán jiū le hěn jiǔ , jué de háishi yǒu xiē bú tài chéng shú de dì fang .
// 找到破损行并替换
c = c.replace(
  /pinyin: 'Zhè cì de fāng\\[^']*'/g,
  "pinyin: 'Zhè cì de fāng àn wǒ men yán jiū le hěn jiǔ , jué de háishi yǒu xiē bú tài chéng shú de dì fang .'"
)

fs.writeFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', c, 'utf8')
console.log('Fixed Nǎlǐ and broken line')
