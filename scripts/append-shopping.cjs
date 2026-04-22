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

// 购物砍价 + 外卖快递系列
const shoppingHsk12 = [
  {
    scene: '菜市场砍价',
    sceneEmoji: '🥬',
    lines: [
      { speaker: "顾客", chinese: "老板，这苹果怎么卖？", pinyin: "lǎo bǎn ， zhè píng guǒ zěn me mài ？", japanese: "おじさん、このリンゴいくら？" },
      { speaker: "小贩", chinese: "五块一斤，很甜的。", pinyin: "wǔ kuài yì jīn ， hěn tián de 。", japanese: "一斤（500g）で5元だよ、すごく甘いよ。" },
      { speaker: "顾客", chinese: "太贵了，四块卖不卖？", pinyin: "tài guì le ， sì kuài mài bú mài ？", japanese: "高すぎるよ。4元にならない？" }
    ],
    keyVocabulary: [
      { word: "斤", pinyin: "jīn", meaning: "500グラム（中国の重量単位）" },
      { word: "卖不卖", pinyin: "mài bú mài", meaning: "（その値段で）売ってくれる？" }
    ]
  },
  {
    scene: '外卖催单',
    sceneEmoji: '🛵',
    lines: [
      { speaker: "顾客", chinese: "你好，我的外卖还没到。", pinyin: "nǐ hǎo ， wǒ de wài mài hái méi dào 。", japanese: "すみません、デリバリーがまだ届きません。" },
      { speaker: "骑手", chinese: "不好意思，在路上了，五分钟到。", pinyin: "bù hǎo yì sī ， zài lù shàng le ， wǔ fēn zhōng dào 。", japanese: "申し訳ありません、今向かっています。あと5分で着きます。" }
    ],
    keyVocabulary: [
      { word: "外卖", pinyin: "wài mài", meaning: "デリバリー、外食の持ち帰り" },
      { word: "在路上", pinyin: "zài lù shàng", meaning: "（移動中で）向かっているところ" }
    ]
  }
]

const shoppingHsk34 = [
  {
    scene: '要求包邮',
    sceneEmoji: '📦',
    lines: [
      { speaker: "买家", chinese: "亲，买两件能包邮吗？", pinyin: "qīn ， mǎi liǎng jiàn néng bāo yóu ma ？", japanese: "すみません、2点買ったら送料無料になりますか？" },
      { speaker: "卖家", chinese: "满九十九元才包邮哦。", pinyin: "mǎn jiǔ shí jiǔ yuán cái bāo yóu ò 。", japanese: "99元以上で送料無料になります。" },
      { speaker: "买家", chinese: "那算了，我再去看看别的。", pinyin: "nà suàn le ， wǒ zài qù kàn kàn bié de 。", japanese: "じゃあいいです、他を見てみます。" }
    ],
    keyVocabulary: [
      { word: "包邮", pinyin: "bāo yóu", meaning: "送料無料" },
      { word: "满", pinyin: "mǎn", meaning: "〜（の金額）に達する" }
    ]
  },
  {
    scene: '快递放驿站',
    sceneEmoji: '🏪',
    lines: [
      { speaker: "快递员", chinese: "你好，快递给你放菜鸟驿站了。", pinyin: "nǐ hǎo ， kuài dì gěi nǐ fàng cài niǎo yì zhàn le 。", japanese: "もしもし、お荷物は菜鳥駅（宅配ロッカー/取次所）に置いておきました。" },
      { speaker: "顾客", chinese: "能帮我送上楼吗？东西很重。", pinyin: "néng bāng wǒ sòng shàng lóu ma ？ dōng xī hěn zhòng 。", japanese: "部屋まで届けてくれませんか？荷物が重いんです。" },
      { speaker: "快递员", chinese: "行，那你等一下，我待会儿过去。", pinyin: "xíng ， nà nǐ děng yí xià ， wǒ dāi huì r guò qù 。", japanese: "わかりました。少し待ってください、後で行きます。" }
    ],
    keyVocabulary: [
      { word: "驿站", pinyin: "yì zhàn", meaning: "宅配便の取次所" },
      { word: "送上楼", pinyin: "sòng shàng lóu", meaning: "（部屋のある）階上まで届ける" }
    ]
  }
]

const newHsk12 = [...shoppingHsk12]
const newHsk34 = [...shoppingHsk34]

console.log('New HSK12:', newHsk12.length)
console.log('New HSK34:', newHsk34.length)

// 在 hsk12 数组末尾添加
const hsk34Marker = '// HSK 3-4'
const hsk34Idx = content.indexOf(hsk34Marker)
if (hsk34Idx > 0) {
  const beforeHsk34 = content.substring(0, hsk34Idx)
  const lastBracket = beforeHsk34.lastIndexOf('}')
  const arrayEnd = beforeHsk34.lastIndexOf(']')
  
  const before = content.substring(0, lastBracket + 1)
  const middle = ',\n' + newHsk12.map(formatDialogue).join(',\n') + '\n]'
  const after = content.substring(arrayEnd + 1)
  
  content = before + middle + after
  console.log('Added HSK12 shopping dialogues')
}

// 在 hsk34 数组末尾添加
const hsk56Marker = '// HSK 5-6'
const hsk56Idx = content.indexOf(hsk56Marker)
if (hsk56Idx > 0) {
  const beforeHsk56 = content.substring(0, hsk56Idx)
  const lastBracket = beforeHsk56.lastIndexOf('}')
  const arrayEnd = beforeHsk56.lastIndexOf(']')
  
  const before = content.substring(0, lastBracket + 1)
  const middle = ',\n' + newHsk34.map(formatDialogue).join(',\n') + '\n]'
  const after = content.substring(arrayEnd + 1)
  
  content = before + middle + after
  console.log('Added HSK34 shopping dialogues')
}

fs.writeFileSync(filePath, content, 'utf8')
console.log('Done!')
