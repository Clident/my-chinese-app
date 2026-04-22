const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'lib', 'hsk-fallback-data.ts')
let content = fs.readFileSync(filePath, 'utf8')

// 新数据格式化函数
function formatDialogue(d) {
  return `  {
    id: "${d.id}",
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

// HSK12 新数据
const newHsk12 = [
  {
    id: "hsk12-016",
    scene: '便利店买东西',
    sceneEmoji: '🏪',
    lines: [
      { speaker: "店员", chinese: "您好，要塑料袋吗？", pinyin: "nín hǎo ， yào sù liào dài ma ？", japanese: "いらっしゃいませ、レジ袋はご利用ですか？" },
      { speaker: "顾客", chinese: "不要，我有袋子。可以扫码吗？", pinyin: "bú yào ， wǒ yǒu dài zi 。 kě yǐ sǎo mǎ ma ？", japanese: "いりません、袋は持っています。QRコード決済はできますか？" },
      { speaker: "店员", chinese: "可以。一共二十块钱。", pinyin: "kě yǐ 。 yí gòng èr shí kuài qián 。", japanese: "はい。合計で20元になります。" }
    ],
    keyVocabulary: [
      { word: "塑料袋", pinyin: "sù liào dài", meaning: "レジ袋" },
      { word: "扫码", pinyin: "sǎo mǎ", meaning: "コードをスキャンする" }
    ]
  },
  {
    id: "hsk12-017",
    scene: '拿快递',
    sceneEmoji: '📦',
    lines: [
      { speaker: "顾客", chinese: "你好，我来取快递。", pinyin: "nǐ hǎo ， wǒ lái qǔ kuài dì 。", japanese: "こんにちは、宅配便を取りに来ました。" },
      { speaker: "员工", chinese: "取件码是多少？", pinyin: "qǔ jiàn mǎ shì duō shǎo ？", japanese: "受取コードは何番ですか？" },
      { speaker: "顾客", chinese: "五零二一。", pinyin: "wǔ líng èr yī 。", japanese: "5021です。" }
    ],
    keyVocabulary: [
      { word: "取", pinyin: "qǔ", meaning: "取る、受け取る" },
      { word: "取件码", pinyin: "qǔ jiàn mǎ", meaning: "受取コード" }
    ]
  }
]

const newHsk34 = [
  {
    id: "hsk34-016",
    scene: '拒绝加班',
    sceneEmoji: '🚫',
    lines: [
      { speaker: "老板", chinese: "小王，这周六来加个班吧？", pinyin: "xiǎo wáng ， zhè zhōu liù lái jiā gè bān ba ？", japanese: "王さん、今週の土曜日、残業に来てくれないか？" },
      { speaker: "小王", chinese: "老板，真不巧，我这周末有事。", pinyin: "lǎo bǎn ， zhēn bù qiǎo ， wǒ zhè zhōu mò yǒu shì 。", japanese: "社長、あいにくですが、今週末は予定があるんです。" },
      { speaker: "老板", chinese: "好吧，那下周再说。", pinyin: "hǎo ba ， nà xià zhōu zài shuō 。", japanese: "そうか、じゃあ来週また話そう。" }
    ],
    keyVocabulary: [
      { word: "不巧", pinyin: "bù qiǎo", meaning: "あいにく、運悪く" },
      { word: "加班", pinyin: "jiā bān", meaning: "残業する" }
    ]
  },
  {
    id: "hsk34-017",
    scene: '网购退货',
    sceneEmoji: '🛍️',
    lines: [
      { speaker: "买家", chinese: "亲，这个衣服色差太大了。", pinyin: "qīn ， zhè gè yī fú sè chā tài dà le 。", japanese: "すみません、この服、色の違いが大きすぎます。" },
      { speaker: "卖家", chinese: "不好意思，您可以申请无理由退货。", pinyin: "bù hǎo yì sī ， nín kě yǐ shēn qǐng wú lǐ yóu tuì huò 。", japanese: "申し訳ありません、無理由返品を申請いただけます。" }
    ],
    keyVocabulary: [
      { word: "色差", pinyin: "sè chā", meaning: "色味の違い" },
      { word: "退货", pinyin: "tuì huò", meaning: "返品する" }
    ]
  }
]

const newHsk56 = [
  {
    id: "hsk56-016",
    scene: '讨论AI与失业',
    sceneEmoji: '🤖',
    lines: [
      { speaker: "A", chinese: "你担心AI会取代你的工作吗？", pinyin: "nǐ dān xīn AI huì qǔ dài nǐ de gōng zuò ma ？", japanese: "AIに仕事を奪われる心配はありますか？" },
      { speaker: "B", chinese: "与其担心，不如学会如何利用它。", pinyin: "yǔ qí dān xīn ， bù rú xué huì rú hé lì yòng tā 。", japanese: "心配するより、それをどう利用するか学ぶべきですよ。" },
      { speaker: "A", chinese: "有道理，工具始终是人类进化的助力。", pinyin: "yǒu dào lǐ ， gōng jù shǐ zhōng shì rén lèi jìn huà de zhù lì 。", japanese: "一理ありますね、道具は常に人類の進化の助けですから。" }
    ],
    keyVocabulary: [
      { word: "取代", pinyin: "qǔ dài", meaning: "取って代わる" },
      { word: "与其...不如...", pinyin: "yǔ qí ... bù rú ...", meaning: "〜よりは〜の方が良い" }
    ]
  }
]

// 插入 HSK12
content = content.replace(
  /,\n\]\n\n\/\/ HSK 3-4/,
  ',\n' + newHsk12.map(formatDialogue).join(',\n') + '\n]\n\n// HSK 3-4'
)

// 插入 HSK34
content = content.replace(
  /,\n\]\n\n\/\/ HSK 5-6/,
  ',\n' + newHsk34.map(formatDialogue).join(',\n') + '\n]\n\n// HSK 5-6'
)

// 插入 HSK56
content = content.replace(
  /,\n\]\n\n\/\/ Helper/,
  ',\n' + newHsk56.map(formatDialogue).join(',\n') + '\n]\n\n// Helper'
)

fs.writeFileSync(filePath, content, 'utf8')
console.log('Appended 5 new dialogues')
