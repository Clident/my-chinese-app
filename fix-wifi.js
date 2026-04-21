const fs = require('fs')
const file = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let content = fs.readFileSync(file, 'utf8')

// Wi-Fi: 删掉 wi fi（英文无拼音），Wi 和 Fi 各加一个虚拟音节占位
// 实际上 "Wi-Fi吗" 对应 3 个中文字符（Wi-Fi 是英文，不算汉字）
// 所以只留 wi fi ma → wi fi ma，删 de 后面的 wi fi → de ma
// 但 wi 和 fi 会被 splitPinyin 过滤掉（只有辅音 w f 不是有效音节）
// 修复为不含 Wi-Fi 的拼音
content = content.split("qǐng wèn fáng jiān lǐ yǒu miǎn fèi de wi fi ma").join("qǐng wèn fáng jiān lǐ yǒu miǎn fèi de ma")

fs.writeFileSync(file, content, 'utf8')
console.log('Fixed Wi-Fi line')
