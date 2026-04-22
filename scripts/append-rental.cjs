const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'lib', 'hsk-fallback-data.ts')
let content = fs.readFileSync(filePath, 'utf8')

function formatDialogue(d) {
  return `  {
    scene: '${d.scene}',
    sceneEmoji: '${d.sceneEmoji}',
    lines: [
${d.lines.map(l => `      { speaker: "${l.speaker}", chinese: "${l.chinese}", pinyin: "${l.pinyin}", japanese: "${l.japanese}" }`).join(',\n')}
    ],
    keyVocabulary: [
${d.keyVocabulary.map(k => `      { word: "${k.word}", pinyin: "${k.pinyin}", meaning: "${k.meaning}" }`).join(',\n')}
    ],
  }`
}

// 租房系列
const rentalHsk34 = [
  {
    scene: '询问房租与押金',
    sceneEmoji: '🏠',
    lines: [
      { speaker: "租客", chinese: "房东，这房子一个月多少钱？押金怎么付？", pinyin: "fáng dōng ， zhè fáng zi yí gè yuè duō shǎo qián ？ yā jīn zěn me fù ？", japanese: "大家さん、この部屋は一ヶ月いくらですか？敷金はどう払いますか？" },
      { speaker: "房东", chinese: "三千块，押一付三，水电费自理。", pinyin: "sān qiān kuài ， yā yī fù sān ， shuǐ diàn fèi zì lǐ 。", japanese: "3000元です。敷金一ヶ月分と家賃三ヶ月分を先払いで、光熱費は自己負担です。" }
    ],
    keyVocabulary: [
      { word: "押一付三", pinyin: "yā yī fù sān", meaning: "一ヶ月分の敷金と三ヶ月分の家賃を先払いする習慣" },
      { word: "自理", pinyin: "zì lǐ", meaning: "自己負担、自分で処理する" }
    ]
  },
  {
    scene: '家里空调坏了',
    sceneEmoji: '🛠️',
    lines: [
      { speaker: "租客", chinese: "房东，空调不制冷了，你能找人修一下吗？", pinyin: "fáng dōng ， kōng tiáo bú zhì lěng le ， nǐ néng zhǎo rén xiū yí xià ma ？", japanese: "大家さん、エアコンが冷えなくなりました。誰か修理を呼んでくれますか？" },
      { speaker: "房东", chinese: "你自己先看看电池有没有电，不行我再过去。", pinyin: "nǐ zì jǐ xiān kàn kàn diàn chí yǒu méi yǒu diàn ， bù xíng wǒ zài guò qù 。", japanese: "まずは電池があるか確認して。ダメなら私が行くから。" }
    ],
    keyVocabulary: [
      { word: "制冷", pinyin: "zhì lěng", meaning: "冷房、冷やす" },
      { word: "不行", pinyin: "bù xíng", meaning: "ダメなら、無理なら" }
    ]
  }
]

const rentalHsk56 = [
  {
    scene: '关于退还押金的争吵',
    sceneEmoji: '😠',
    lines: [
      { speaker: "租客", chinese: "我要退房了，请把押金退给我。", pinyin: "wǒ yào tuì fáng le ， qǐng bǎ yā jīn tuì gěi wǒ 。", japanese: "退去するので、敷金を返してください。" },
      { speaker: "房东", chinese: "墙面弄得这么脏，得扣五百块清洁费。", pinyin: "qiáng miàn nòng de zhè me zàng ， děi kòu wǔ bǎi kuài qīng jié fèi 。", japanese: "壁をこんなに汚して。クリーニング代として500元差し引きますよ。" },
      { speaker: "租客", chinese: "那是正常的磨损，你这是乱收费！", pinyin: "nà shì zhèng cháng de mó sǔn ， nǐ zhè shì luàn shōu fèi ！", japanese: "それは通常の使用による摩耗です。不当な請求だ！" }
    ],
    keyVocabulary: [
      { word: "磨损", pinyin: "mó sǔn", meaning: "摩耗、すり減り" },
      { word: "乱收费", pinyin: "luàn shōu fèi", meaning: "不当な料金請求" }
    ]
  },
  {
    scene: '商量搬家的时间',
    sceneEmoji: '🚚',
    lines: [
      { speaker: "A", chinese: "搬家公司约好了吗？几点能到？", pinyin: "bān jiā gōng sī yuē hǎo le ma ？ jǐ diǎn néng dào ？", japanese: "引っ越し業者の予約は済んだ？何時に着くって？" },
      { speaker: "B", chinese: "约了明天上午十点，他们负责打包和运输。", pinyin: "yuē le míng tiān shàng wǔ shí diǎn ， tā men fù zé dǎ bāo hé yùn shū 。", japanese: "明日午前10時に予約したよ。荷造りと運搬をやってくれるんだ。" }
    ],
    keyVocabulary: [
      { word: "打包", pinyin: "dǎ bāo", meaning: "荷造りする、梱包する" },
      { word: "运输", pinyin: "yùn shū", meaning: "運搬、輸送" }
    ]
  }
]

const newHsk34 = [...rentalHsk34]
const newHsk56 = [...rentalHsk56]

console.log('New HSK34:', newHsk34.length)
console.log('New HSK56:', newHsk56.length)

// 用正则匹配
const pattern1 = /\},\]\r\n\r\n\/\/ HSK 5-6/
const pattern2 = /\},\]\r\n\r\n\/\/ Helper/

const replacement1 = '},\r\n' + newHsk34.map(formatDialogue).join(',\r\n') + '\r\n]\r\n\r\n// HSK 5-6'
const replacement2 = '},\r\n' + newHsk56.map(formatDialogue).join(',\r\n') + '\r\n]\r\n\r\n// Helper'

if (pattern1.test(content)) {
  content = content.replace(pattern1, replacement1)
  console.log('Replaced HSK34')
} else {
  console.log('Pattern1 not matched, trying fallback...')
  // 备用：直接找最后的 },]
  const idx = content.lastIndexOf('},]', content.indexOf('// HSK 5-6'))
  if (idx > 0) {
    const before = content.substring(0, idx + 3)
    const after = content.substring(idx + 3)
    content = before + '\r\n' + newHsk34.map(formatDialogue).join(',\r\n') + '\r\n' + after
    console.log('Fallback replaced HSK34')
  }
}

if (pattern2.test(content)) {
  content = content.replace(pattern2, replacement2)
  console.log('Replaced HSK56')
} else {
  console.log('Pattern2 not matched, trying fallback...')
  const idx = content.lastIndexOf('},]', content.indexOf('// Helper'))
  if (idx > 0) {
    const before = content.substring(0, idx + 3)
    const after = content.substring(idx + 3)
    content = before + '\r\n' + newHsk56.map(formatDialogue).join(',\r\n') + '\r\n' + after
    console.log('Fallback replaced HSK56')
  }
}

fs.writeFileSync(filePath, content, 'utf8')
console.log('Done!')
