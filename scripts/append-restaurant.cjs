const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'lib', 'hsk-fallback-data.ts')
let content = fs.readFileSync(filePath, 'utf8')

const restaurantData = [
  // HSK 1-2
  {
    scene: '餐厅点菜',
    sceneEmoji: '🍜',
    lines: [
      { speaker: "顾客", chinese: "请问，这个菜辣不辣？", pinyin: "qǐng wèn ， zhè ge cài là bu là ？", japanese: "すみません、この料理は辛いですか？" },
      { speaker: "服务员", chinese: "有一点儿辣，怕辣的话可以点红烧的。", pinyin: "yǒu yì diǎn er là ， pà là de huà kě yǐ diǎn hóng shāo de 。", japanese: "少し辛いですよ。辛いのが苦手なら紅焼（醤油煮）にできます。" }
    ],
    keyVocabulary: [
      { word: "辣", pinyin: "là", meaning: "辛い" },
      { word: "红烧", pinyin: "hóng shāo", meaning: "醤油煮込み（調理法）" }
    ]
  },
  {
    scene: '餐厅忌口',
    sceneEmoji: '🥗',
    lines: [
      { speaker: "顾客", chinese: "我对花生过敏，这道菜里有花生吗？", pinyin: "wǒ duì huā shēng guò mǐn ， zhè dào cài lǐ yǒu huā shēng ma ？", japanese: "私はピーナッツアレルギーです。この料理にピーナッツは入っていますか？" },
      { speaker: "服务员", chinese: "没有花生，不过里面有芝麻，您能吃吗？", pinyin: "méi yǒu huā shēng ， bú guò lǐ miàn yǒu zhī ma ， nín néng chī ma ？", japanese: "ピーナッツは入っていませんが、中にゴマがあります。召し上がれますか？" }
    ],
    keyVocabulary: [
      { word: "过敏", pinyin: "guò mǐn", meaning: "アレルギー" },
      { word: "芝麻", pinyin: "zhī ma", meaning: "ゴマ" }
    ]
  },
  // HSK 3-4
  {
    scene: '餐厅买单',
    sceneEmoji: '💳',
    lines: [
      { speaker: "顾客", chinese: "服务员，买单！可以刷卡吗？", pinyin: "fú wù yuán ， mǎi dān ！ kě yǐ shuā kǎ ma ？", japanese: "すみません、お会計！カード使えますか？" },
      { speaker: "服务员", chinese: "可以刷卡，也可以扫码支付。", pinyin: "kě yǐ shuā kǎ ， yě kě yǐ sǎo mǎ zhī fù 。", japanese: "カードも使えますし、QRコード決済もできます。" }
    ],
    keyVocabulary: [
      { word: "买单", pinyin: "mǎi dān", meaning: "お会計" },
      { word: "扫码", pinyin: "sǎo mǎ", meaning: "（QRコードを）スキャンする" }
    ]
  },
  {
    scene: '餐厅打包',
    sceneEmoji: '🥡',
    lines: [
      { speaker: "顾客", chinese: "剩下的菜可以帮我打包吗？", pinyin: "shèng xià de cài kě yǐ bāng wǒ dǎ bāo ma ？", japanese: "残った料理、持ち帰りにできますか？" },
      { speaker: "服务员", chinese: "好的，给您拿个打包盒。", pinyin: "hǎo de ， gěi nín ná ge dǎ bāo hé 。", japanese: "承知しました。テイクアウト用の容器をお持ちします。" }
    ],
    keyVocabulary: [
      { word: "打包", pinyin: "dǎ bāo", meaning: "持ち帰りにする" },
      { word: "打包盒", pinyin: "dǎ bāo hé", meaning: "テイクアウト容器" }
    ]
  },
  // HSK 5-6
  {
    scene: '餐厅投诉',
    sceneEmoji: '😤',
    lines: [
      { speaker: "顾客", chinese: "这道菜味道不太对，是不是盐放多了？", pinyin: "zhè dào cài wèi dào bú tài duì ， shì bu shì yán fàng duō le ？", japanese: "この料理、味がおかしいです。塩を入れすぎたんじゃないですか？" },
      { speaker: "经理", chinese: "抱歉，我帮您换一份，或者给您免单。", pinyin: "bào qiàn ， wǒ bāng nín huàn yí fèn ， huò zhě gěi nín miǎn dān 。", japanese: "申し訳ございません。お取り替えします。または無料にさせていただきます。" }
    ],
    keyVocabulary: [
      { word: "味道", pinyin: "wèi dào", meaning: "味/風味" },
      { word: "免单", pinyin: "miǎn dān", meaning: "無料にする、勘弁する" }
    ]
  }
]

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

const hsk12Data = [restaurantData[0], restaurantData[1]]
const hsk34Data = [restaurantData[2], restaurantData[3]]
const hsk56Data = [restaurantData[4]]

// Find the end of hsk12 array (before // HSK 3-4)
const hsk34StartMarker = '\r\n// HSK 3-4'
const hsk34StartIdx = content.indexOf(hsk34StartMarker)
if (hsk34StartIdx > 0) {
  const beforeHsk34 = content.substring(0, hsk34StartIdx)
  const lastBracket = beforeHsk34.lastIndexOf('}')
  const arrayEnd = beforeHsk34.lastIndexOf(']')
  
  const before = content.substring(0, lastBracket + 1)
  const middle = ',\n' + hsk12Data.map(formatDialogue).join(',\n') + '\n]'
  const after = content.substring(arrayEnd + 1)
  
  content = before + middle + after
  console.log('Added HSK12 restaurant dialogues')
}

// Find the end of hsk34 array (before // HSK 5-6)
const hsk56StartMarker = '\r\n// HSK 5-6'
const hsk56StartIdx = content.indexOf(hsk56StartMarker)
if (hsk56StartIdx > 0) {
  const beforeHsk56 = content.substring(0, hsk56StartIdx)
  const lastBracket = beforeHsk56.lastIndexOf('}')
  const arrayEnd = beforeHsk56.lastIndexOf(']')
  
  const before = content.substring(0, lastBracket + 1)
  const middle = ',\n' + hsk34Data.map(formatDialogue).join(',\n') + '\n]'
  const after = content.substring(arrayEnd + 1)
  
  content = before + middle + after
  console.log('Added HSK34 restaurant dialogues')
}

// Find the end of hsk56 array (before // Helper function)
const helperMarker = '\r\n// Helper function'
const helperIdx = content.indexOf(helperMarker)
if (helperIdx > 0) {
  const beforeHelper = content.substring(0, helperIdx)
  const lastBracket = beforeHelper.lastIndexOf('}')
  const arrayEnd = beforeHelper.lastIndexOf(']')
  
  const before = content.substring(0, lastBracket + 1)
  const middle = ',\n' + hsk56Data.map(formatDialogue).join(',\n') + '\n]'
  const after = content.substring(arrayEnd + 1)
  
  content = before + middle + after
  console.log('Added HSK56 restaurant dialogues')
}

fs.writeFileSync(filePath, content, 'utf8')
console.log('Done!')
