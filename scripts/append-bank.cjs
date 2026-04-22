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

const bankData = [
  {
    scene: '手机没流量了',
    sceneEmoji: '📱',
    lines: [
      { speaker: "租客", chinese: "我的手机没流量了，怎么买叠加包？", pinyin: "wǒ de shǒu jī méi liú liàng le ， zěn me mǎi dié jiā bāo ？", japanese: "スマホのデータ通信量がなくなりました。追加パックはどうやって買いますか？" },
      { speaker: "客服", chinese: "您可以在我们的App里选择流量加油包。", pinyin: "nín kě yǐ zài wǒ men de App lǐ xuǎn zé liú liàng jiā yóu bāo 。", japanese: "弊社のアプリでデータ増量パックを選択いただけます。" }
    ],
    keyVocabulary: [
      { word: "流量", pinyin: "liú liàng", meaning: "データ通信量" },
      { word: "加油包", pinyin: "jiā yóu bāo", meaning: "データ追加パック" }
    ]
  },
  {
    scene: '办理新手机号',
    sceneEmoji: '🆔',
    lines: [
      { speaker: "顾客", chinese: "我想办一张新的电话卡。", pinyin: "wǒ xiǎng bàn yì zhāng xīn de diàn huà kǎ 。", japanese: "新しいSIMカードを作りたいです。" },
      { speaker: "营业员", chinese: "请出示您的护照，并选择一个套餐。", pinyin: "qǐng chū shì nín de hù zhào ， bìng xuǎn zé yí gè tào cān 。", japanese: "パスポートを提示して、プランを選択してください。" }
    ],
    keyVocabulary: [
      { word: "套餐", pinyin: "tào cān", meaning: "セットメニュー、プラン" },
      { word: "出示", pinyin: "chū shì", meaning: "提示する" }
    ]
  },
  {
    scene: '银行卡丢了办挂失',
    sceneEmoji: '💳',
    lines: [
      { speaker: "客户", chinese: "你好，我的银行卡丢了，想办挂失。", pinyin: "nǐ hǎo ， wǒ de yín háng kǎ diū le ， xiǎng bàn guà shī 。", japanese: "すみません、キャッシュカードを失くしたので、利用停止をお願いします。" },
      { speaker: "柜员", chinese: "请先填一下这张表，我们需要核对您的身份信息。", pinyin: "qǐng xiān tián yí xià zhè zhāng biǎo ， wǒ men xū yào hé duì nín de shēn fèn xìn xī 。", japanese: "まずこの用紙に記入してください。ご本人確認をさせていただきます。" }
    ],
    keyVocabulary: [
      { word: "挂失", pinyin: "guà shī", meaning: "紛失届を出す、利用停止する" },
      { word: "核对", pinyin: "hé duì", meaning: "照合する、確認する" }
    ]
  },
  {
    scene: '修改银行卡密码',
    sceneEmoji: '🔢',
    lines: [
      { speaker: "客户", chinese: "我忘记了取款密码，可以重置吗？", pinyin: "wǒ wàng jì le qǔ kuǎn mì mǎ ， kě yǐ chóng zhì ma ？", japanese: "暗証番号を忘れてしまいました。リセットできますか？" },
      { speaker: "柜员", chinese: "可以。请在密码键盘上输入六位新密码。", pinyin: "kě yǐ 。 qǐng zài mì mǎ jiàn pán shàng shū rù liù wèi xīn mì mǎ 。", japanese: "はい。暗証番号キーパッドで6桁の新しい番号を入力してください。" }
    ],
    keyVocabulary: [
      { word: "取款", pinyin: "qǔ kuǎn", meaning: "お金を引き出す" },
      { word: "重置", pinyin: "chóng zhì", meaning: "リセットする、再設定する" }
    ]
  }
]

const newHsk34 = [bankData[0], bankData[1]] // 手机没流量、办理新手机号
const newHsk56 = [bankData[2], bankData[3]] // 银行卡挂失、修改密码

console.log('New HSK34:', newHsk34.length)
console.log('New HSK56:', newHsk56.length)

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
  console.log('Added HSK34 bank/telecom dialogues')
}

// 在 hsk56 数组末尾添加
const exportMarker = 'export const allDialogues'
const exportIdx = content.indexOf(exportMarker)
if (exportIdx > 0) {
  const beforeExport = content.substring(0, exportIdx)
  const lastBracket = beforeExport.lastIndexOf('}')
  const arrayEnd = beforeExport.lastIndexOf(']')
  
  const before = content.substring(0, lastBracket + 1)
  const middle = ',\n' + newHsk56.map(formatDialogue).join(',\n') + '\n]'
  const after = content.substring(arrayEnd + 1)
  
  content = before + middle + after
  console.log('Added HSK56 bank dialogues')
}

fs.writeFileSync(filePath, content, 'utf8')
console.log('Done!')
