const fs = require('fs')

const file = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let content = fs.readFileSync(file, 'utf8')

const exactFixes = [
  // Wi-Fi: 把 wi fi 改为不占位（Wi-Fi 本来就是英文，不是拼音）
  [
    "pinyin: 'qǐng wèn fáng jiān lǐ yǒu miǎn fèi de wi fi ma?'",
    "pinyin: 'qǐng wèn fáng jiān lǐ yǒu miǎn fèi de ma'"
  ],
  // 退房时间：缺少 èr diǎn（十二点）
  [
    "pinyin: 'yǒu de mì mǎ zài fáng kǎ shàng miàn tuì fáng shí jiān shì zhōng wǔ shí'",
    "pinyin: 'yǒu de mì mǎ zài fáng kǎ shàng miàn tuì fáng shí jiān shì zhōng wǔ shí èr diǎn'"
  ],
  // liǎojiě → liǎo jiě
  [
    "pinyin: 'qǐng wèn nín duì wǒ men gōng sī yǒu shén mè liǎojiě?'",
    "pinyin: 'qǐng wèn nín duì wǒ men gōng sī yǒu shén mè liǎo jiě?'"
  ],
  // tiānmáfan → tiān má fán
  [
    "pinyin: 'guān yú zhè cì de shī wù wǒ men shēn gǎn bào qiàn gěi nín tiān máfan le'",
    "pinyin: 'guān yú zhè cì de shī wù wǒ men shēn gǎn bào qiàn gěi nín tiān má fán le'"
  ],
  // 解决方案：少 àn
  [
    "pinyin: 'jì rán shì qíng yǐ jīng fā shēng le guān jiàn shì rú hé bǔ jiù xī wàng guì fāng néng ná chū yī gè qiè shí kě xíng de jiě jué fāng'",
    "pinyin: 'jì rán shì qíng yǐ jīng fā shēng le guān jiàn shì rú hé bǔ jiù xī wàng guì fāng néng ná chū yī gè qiè shí kě xíng de jiě jué fāng àn'"
  ],
  // 第216行: fāng'àn → fāng àn (去除撇号)
  [
    "pinyin: 'zhè cì de fāng'àn wǒ men yán jiū le hěn jiǔ, jué de háishi yǒu xiē bú tài chéng shú de dì fang.'",
    "pinyin: 'zhè cì de fāng àn wǒ men yán jiū le hěn jiǔ jué de hái shì yǒu xiē bù tài chéng shú de dì fang'"
  ],
]

let changed = 0
exactFixes.forEach(([old, neu]) => {
  if (content.includes(old)) {
    content = content.split(old).join(neu)
    changed++
    console.log(`✅ Fixed`)
  } else {
    console.log(`⚠️  Not found:\n   "${old.substring(0, 100)}"`)
  }
})

fs.writeFileSync(file, content, 'utf8')
console.log(`\nDone: ${changed} fixed`)
