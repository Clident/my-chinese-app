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

const travelData = [
  {
    scene: '打车去机场',
    sceneEmoji: '🚕',
    lines: [
      { speaker: "乘客", chinese: "师傅，去机场要多长时间？", pinyin: "shī fu ， qù jī chǎng yào duō shǎo shí jiān ？", japanese: "運転手さん、空港までどのくらいかかりますか？" },
      { speaker: "司机", chinese: "不堵车的话，四十分钟就能到。", pinyin: "bù dǔ chē de huà ， sì shí fēn zhōng jiù néng dào 。", japanese: "渋滞してなければ、40分で着きますよ。" }
    ],
    keyVocabulary: [
      { word: "堵车", pinyin: "dǔ chē", meaning: "渋滞する" },
      { word: "师傅", pinyin: "shī fu", meaning: "（運転手や職人への）呼びかけ、〜さん" }
    ]
  },
  {
    scene: '询问地铁站',
    sceneEmoji: '🚇',
    lines: [
      { speaker: "游客", chinese: "请问，最近的地铁站在哪儿？", pinyin: "qǐng wèn ， zuì jìn de dì tiě zhàn zài nǎ r ？", japanese: "すみません、一番近い地下鉄の駅はどこですか？" },
      { speaker: "行人", chinese: "往前走，过两个红绿灯就到了。", pinyin: "wǎng qián zǒu ， guò liǎng gè hóng lǜ dēng jiù dào le 。", japanese: "真っ直ぐ行って、信号を二つ過ぎたら着きますよ。" }
    ],
    keyVocabulary: [
      { word: "红绿灯", pinyin: "hóng lǜ dēng", meaning: "信号機" },
      { word: "在哪儿", pinyin: "zài nǎ r", meaning: "どこにありますか" }
    ]
  },
  {
    scene: '酒店办理入住',
    sceneEmoji: '🏨',
    lines: [
      { speaker: "前台", chinese: "您好，请出示您的预订信息。", pinyin: "nín hǎo ， qǐng chū shì nín de yù dìng xìn xī 。", japanese: "いらっしゃいませ、予約情報を提示してください。" },
      { speaker: "客人", chinese: "我姓张，预订了两晚的大床房。", pinyin: "wǒ xìng zhāng ， yù dìng le liǎng wǎn de dà chuáng fáng 。", japanese: "張です。ダブルルームを二泊で予約しています。" }
    ],
    keyVocabulary: [
      { word: "预订", pinyin: "yù dìng", meaning: "予約する" },
      { word: "大床房", pinyin: "dà chuáng fáng", meaning: "ダブルルーム（キングサイズベッドの部屋）" }
    ]
  },
  {
    scene: '航班延误改签',
    sceneEmoji: '✈️',
    lines: [
      { speaker: "旅客", chinese: "我的航班延误了，能帮我改签到下一班吗？", pinyin: "wǒ de háng bān yán wù le ， néng bāng wǒ gǎi qiān dào xià yì bān ma ？", japanese: "私の便が遅延しました。次の便に振り替えてもらえますか？" },
      { speaker: "客服", chinese: "抱歉，由于天气原因，后续航班也都满员了。", pinyin: "bào qiàn ， yóu yú tiān qì yuán yīn ， hòu xù háng bān yě dōu mǎn yuán le 。", japanese: "申し訳ありません、天候の影響で、後続の便もすべて満席です。" }
    ],
    keyVocabulary: [
      { word: "改签", pinyin: "gǎi qiān", meaning: "（チケットを）変更する、振り替える" },
      { word: "延误", pinyin: "yán wù", meaning: "（交通機関が）遅延する" }
    ]
  }
]

// HSK12: 打车去机场、询问地铁站
// HSK34: 酒店入住
// HSK56: 航班改签

const hsk12Data = [travelData[0], travelData[1]]
const hsk34Data = [travelData[2]]
const hsk56Data = [travelData[3]]

// 在 hsk34 数组末尾添加（在 // HSK 5-6 之前）
const hsk56Marker = '\r\n\r\n// HSK 5-6'
const hsk56Idx = content.indexOf(hsk56Marker)
if (hsk56Idx > 0) {
  const beforeHsk56 = content.substring(0, hsk56Idx)
  const lastBracket = beforeHsk56.lastIndexOf('}')
  const arrayEnd = beforeHsk56.lastIndexOf(']')
  
  const before = content.substring(0, lastBracket + 1)
  const middle = ',\n' + hsk34Data.map(formatDialogue).join(',\n') + '\n]'
  const after = content.substring(arrayEnd + 1)
  
  content = before + middle + after
  console.log('Added HSK34 travel dialogues')
}

// 在 hsk56 数组末尾添加（在 export const allDialogues 之前）
const exportMarker = '\r\n\r\nexport const allDialogues'
const exportIdx = content.indexOf(exportMarker)
if (exportIdx > 0) {
  const beforeExport = content.substring(0, exportIdx)
  const lastBracket = beforeExport.lastIndexOf('}')
  const arrayEnd = beforeExport.lastIndexOf(']')
  
  const before = content.substring(0, lastBracket + 1)
  const middle = ',\n' + hsk56Data.map(formatDialogue).join(',\n') + '\n]'
  const after = content.substring(arrayEnd + 1)
  
  content = before + middle + after
  console.log('Added HSK56 travel dialogues')
}

// HSK12 需要找第一个数组结束位置
const hsk34Marker = '\r\n\r\n// HSK 3-4'
const hsk34Idx = content.indexOf(hsk34Marker)
if (hsk34Idx > 0) {
  const beforeHsk34 = content.substring(0, hsk34Idx)
  const lastBracket = beforeHsk34.lastIndexOf('}')
  const arrayEnd = beforeHsk34.lastIndexOf(']')
  
  const before = content.substring(0, lastBracket + 1)
  const middle = ',\n' + hsk12Data.map(formatDialogue).join(',\n') + '\n]'
  const after = content.substring(arrayEnd + 1)
  
  content = before + middle + after
  console.log('Added HSK12 travel dialogues')
}

fs.writeFileSync(filePath, content, 'utf8')
console.log('Done!')
