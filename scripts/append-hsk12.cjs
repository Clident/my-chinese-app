const fs = require('fs')
const path = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let content = fs.readFileSync(path, 'utf8')

// New dialogues for HSK1-2 (追加10条)
const newHsk12Dialogues = [
  {
    scene: '果物屋',
    sceneEmoji: '🍎',
    lines: [
      { speaker: 'A', chinese: '苹果多少钱一斤？', pinyin: 'Pí ng guǒ duō shao qiá n yì jī n ?', japanese: 'りんごは一斤いくらですか？' },
      { speaker: 'B', chinese: '五块钱一斤。', pinyin: 'Wǔ kuà i qiá n yì jī n .', japanese: '一斤5元です。' },
      { speaker: 'A', chinese: '太贵了，能便宜点吗？', pinyin: 'Tà i guì le , né ng piá nyi diǎ n ma ?', japanese: '高すぎます。もう少し安くなりませんか？' },
      { speaker: 'B', chinese: '那就四块吧。', pinyin: 'Nà jiù sì kuà i ba .', japanese: 'じゃあ4元でいいですよ。' },
    ],
    keyVocabulary: [
      { word: '斤', pinyin: 'jī n', meaning: '斤（500g）', usageNote: '中国の重量単位。市場でよく使う。' },
      { word: '贵', pinyin: 'guì', meaning: '高い', writingNote: '日本語の「貴」と同じ漢字。' },
    ],
  },
  {
    scene: '道案内',
    sceneEmoji: '🗺️',
    lines: [
      { speaker: 'A', chinese: '请问，洗手间在哪儿？', pinyin: 'Qǐ ngwè n , xǐ shǒ ujiā n zà i nǎ r ?', japanese: 'すみません、トイレはどこですか？' },
      { speaker: 'B', chinese: '往前走，左边。', pinyin: 'Wǎ ng qiá n zǒ u , zuǒ biā n .', japanese: 'まっすぐ行って、左側です。' },
      { speaker: 'A', chinese: '谢谢！', pinyin: 'Xiè xie !', japanese: 'ありがとう！' },
    ],
    keyVocabulary: [
      { word: '洗手间', pinyin: 'xǐ shǒ ujiā n', meaning: 'トイレ', writingNote: '「洗」「手」「間」。丁寧な言い方。' },
      { word: '往前', pinyin: 'wǎ ng qiá n', meaning: '前に', usageNote: '方向を表す。「往」+ 方向。' },
    ],
  },
  {
    scene: '天気',
    sceneEmoji: '🌤️',
    lines: [
      { speaker: 'A', chinese: '今天天气怎么样？', pinyin: 'Jī n tiā n tiā n qì zě nme yà ng ?', japanese: '今日の天気はどうですか？' },
      { speaker: 'B', chinese: '下雨了，有点冷。', pinyin: 'Xià yǔ le , yǒ u diǎ n lě ng .', japanese: '雨が降って、ちょっと寒いです。' },
      { speaker: 'A', chinese: '那就别出去了。', pinyin: 'Nà jiù bié chū qù le .', japanese: 'じゃあ出かけない方がいいね。' },
    ],
    keyVocabulary: [
      { word: '天气', pinyin: 'tiā n qì', meaning: '天気', writingNote: '日本語と同じ漢字。' },
      { word: '下雨', pinyin: 'xià yǔ', meaning: '雨が降る', usageNote: '「下」+「雨」で動詞句になる。' },
    ],
  },
  {
    scene: 'タクシー',
    sceneEmoji: '🚕',
    lines: [
      { speaker: 'A', chinese: '师傅，去火车站多少钱？', pinyin: 'Shī fu , qù huǒ chē zhà n duō shao qiá n ?', japanese: '運転手さん、駅までいくらですか？' },
      { speaker: 'B', chinese: '大概三十块。', pinyin: 'Dà gā i sā nshí kuà i .', japanese: 'たぶん30元ぐらいです。' },
      { speaker: 'A', chinese: '好的，走吧。', pinyin: 'Hǎ o de , zǒ u ba .', japanese: 'はい、行きましょう。' },
    ],
    keyVocabulary: [
      { word: '师傅', pinyin: 'shī fu', meaning: '親方/運転手さん', usageNote: 'タクシーで運転手を呼ぶ時の敬称。' },
      { word: '火车站', pinyin: 'huǒ chē zhà n', meaning: '駅', writingNote: '日本語の「駅」は中国語では「站」と言う。' },
    ],
  },
  {
    scene: '郵便局',
    sceneEmoji: '📮',
    lines: [
      { speaker: 'A', chinese: '我要寄一封信。', pinyin: 'Wǒ yà o jì yì fē ng xì n .', japanese: '手紙を一通出したいです。' },
      { speaker: 'B', chinese: '寄到哪儿？', pinyin: 'Jì dà o nǎ r ?', japanese: 'どこまでですか？' },
      { speaker: 'A', chinese: '日本。多少钱？', pinyin: 'Rì bě n . Duō shao qiá n ?', japanese: '日本です。いくらですか？' },
      { speaker: 'B', chinese: '五块钱。', pinyin: 'Wǔ kuà i qiá n .', japanese: '5元です。' },
    ],
    keyVocabulary: [
      { word: '寄', pinyin: 'jì', meaning: '送る', usageNote: '手紙を送る時の動詞。「寄信」で手紙を出す。' },
      { word: '信', pinyin: 'xì n', meaning: '手紙', writingNote: '日本語の「信」と同じ字だが、意味が違う。' },
    ],
  },
  {
    scene: '美容院',
    sceneEmoji: '💇',
    lines: [
      { speaker: 'A', chinese: '我想剪头发。', pinyin: 'Wǒ xiǎ ng jiǎ n tó u fa .', japanese: '髪を切りたいです。' },
      { speaker: 'B', chinese: '要多长？', pinyin: 'Yà o duō chá ng ?', japanese: 'どのくらいの長さにしますか？' },
      { speaker: 'A', chinese: '短一点就好。', pinyin: 'Duǎ n yì diǎ n jiù hǎ o .', japanese: '少し短くしてください。' },
    ],
    keyVocabulary: [
      { word: '剪', pinyin: 'jiǎ n', meaning: '切る', usageNote: '髪を切る時は「剪头发」と言う。' },
      { word: '短', pinyin: 'duǎ n', meaning: '短い', writingNote: '日本語と同じ漢字。' },
    ],
  },
  {
    scene: '薬局',
    sceneEmoji: '💊',
    lines: [
      { speaker: 'A', chinese: '我头疼，有药吗？', pinyin: 'Wǒ tó u té ng , yǒ u yà o ma ?', japanese: '頭が痛いです。薬はありますか？' },
      { speaker: 'B', chinese: '有。发烧吗？', pinyin: 'Yǒ u . Fā shā o ma ?', japanese: 'あります。熱はありますか？' },
      { speaker: 'A', chinese: '不发烧。', pinyin: 'Bù fā shā o .', japanese: '熱はありません。' },
    ],
    keyVocabulary: [
      { word: '头疼', pinyin: 'tó u té ng', meaning: '頭痛がする', writingNote: '「頭」が先。「脳頭痛」とは言わない。' },
      { word: '药', pinyin: 'yà o', meaning: '薬', writingNote: '日本語の「薬」と同じ字形。' },
    ],
  },
  {
    scene: 'ジム',
    sceneEmoji: '🏋️',
    lines: [
      { speaker: 'A', chinese: '你常去健身房吗？', pinyin: 'Nǐ chá ng qù jiàn shē n fá ng ma ?', japanese: 'よくジムに行きますか？' },
      { speaker: 'B', chinese: '对，一周去三次。', pinyin: 'Duì , yì zhō u qù sā n cì .', japanese: 'はい、週3回行きます。' },
      { speaker: 'A', chinese: '我也想去，多少钱？', pinyin: 'Wǒ yě xiǎ ng qù , duō shao qiá n ?', japanese: '私も行きたいです。いくらですか？' },
    ],
    keyVocabulary: [
      { word: '健身房', pinyin: 'jiàn shē n fá ng', meaning: 'フィットネスクラブ', writingNote: '「健身」= 健康。「房」= 部屋。' },
      { word: '常', pinyin: 'chá ng', meaning: 'よく', usageNote: '「常去」で「よく行く」となる。' },
    ],
  },
  {
    scene: '図書館',
    sceneEmoji: '📚',
    lines: [
      { speaker: 'A', chinese: '请问可以借书吗？', pinyin: 'Qǐ ngwè n kě yǐ jiè shū ma ?', japanese: '本を借りられますか？' },
      { speaker: 'B', chinese: '可以，带学生证了吗？', pinyin: 'Kě yǐ , dà i xué shē ng zhè ng le ma ?', japanese: 'はい、学生証をお持ちですか？' },
      { speaker: 'A', chinese: '带了，在这儿。', pinyin: 'Dà i le , zà i zhè r .', japanese: '持ってます、ここにあります。' },
    ],
    keyVocabulary: [
      { word: '借', pinyin: 'jiè', meaning: '借りる', usageNote: '借りるは「借」。貸すは「借给」。' },
      { word: '图书馆', pinyin: 'tú shū guǎ n', meaning: '図書館', writingNote: '「图书」= 本。「馆」= 建物。' },
    ],
  },
  {
    scene: '誕生日',
    sceneEmoji: '🎂',
    lines: [
      { speaker: 'A', chinese: '今天是你生日吗？', pinyin: 'Jī n tiā n shì nǐ shē ng rì ma ?', japanese: '今日は誕生日ですか？' },
      { speaker: 'B', chinese: '对，你怎么知道？', pinyin: 'Duì , nǐ zě nme zhī dà o ?', japanese: 'そうなんです。どうして知ってるんですか？' },
      { speaker: 'A', chinese: '生日快乐！这是给你的礼物。', pinyin: 'Shē ng rì kuà i lè ! Zhè shì gě i nǐ de lǐ wù .', japanese: 'お誕生日おめでとう！これはプレゼントです。' },
    ],
    keyVocabulary: [
      { word: '生日', pinyin: 'shē ng rì', meaning: '誕生日', writingNote: '日本語と同じ漢字。' },
      { word: '快乐', pinyin: 'kuà i lè', meaning: '楽しい/ハッピー', writingNote: '「快」= 速い。「乐」= 楽しい。' },
    ],
  },
]

// Format as TypeScript object
function formatDialogue(d) {
  let result = '  {\r\n'
  result += `    scene: '${d.scene}',\r\n`
  result += `    sceneEmoji: '${d.sceneEmoji}',\r\n`
  result += '    lines: [\r\n'
  for (const line of d.lines) {
    result += `      { speaker: '${line.speaker}', chinese: '${line.chinese}', pinyin: '${line.pinyin}', japanese: '${line.japanese}' },\r\n`
  }
  result += '    ],\r\n'
  result += '    keyVocabulary: [\r\n'
  for (const voc of d.keyVocabulary) {
    result += `      { word: '${voc.word}', pinyin: '${voc.pinyin}', meaning: '${voc.meaning}'`
    if (voc.writingNote) result += `, writingNote: '${voc.writingNote}'`
    if (voc.usageNote) result += `, usageNote: '${voc.usageNote}'`
    result += ' },\r\n'
  }
  result += '    ],\r\n'
  result += '  },'
  return result
}

// Find the position to insert: before the closing ] of hsk12Dialogues
// Pattern: \r\n]\r\n\r\n// HSK 3-4
const pattern = /\r\n\]\r\n\r\n\/\/ HSK 3-4/
const match = content.match(pattern)
if (!match) {
  console.error('Could not find hsk12Dialogues end pattern')
  console.log('Trying alternative pattern...')
  // Try without \r
  const altPattern = /\n\]\n\n\/\/ HSK 3-4/
  const altMatch = content.match(altPattern)
  if (altMatch) {
    console.log('Found alternative pattern at position:', altMatch.index)
  } else {
    console.log('Could not find alternative pattern either')
    // Show what's around position 3490
    console.log('Content around 3490:', JSON.stringify(content.substring(3480, 3520)))
  }
  process.exit(1)
}

const insertPos = match.index + 2 // After \r\n, before ]

// Format and insert
const formatted = '\r\n' + newHsk12Dialogues.map(formatDialogue).join('\r\n')
content = content.slice(0, insertPos) + formatted + content.slice(insertPos)

fs.writeFileSync(path, content, 'utf8')
console.log(`Added ${newHsk12Dialogues.length} dialogues to HSK1-2`)
console.log('New total:', 5 + newHsk12Dialogues.length, 'dialogues in HSK1-2')
