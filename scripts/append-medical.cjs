const fs = require('fs')
const path = require('path')

const TARGET_FILE = path.join(__dirname, '..', 'lib', 'hsk-fallback-data.ts')

const NEW_DIALOGUES = [
  // ================= HSK 5-6: 医疗深水区（专业篇） =================
  {
    id: "hsk56-031",
    level: "HSK 5-6",
    scene: "询问是否需要空腹抽血",
    sceneEmoji: "💉",
    lines: [
      { speaker: "患者", chinese: "护士，我明天抽血需要空腹吗？", pinyin: "hù shi ， wǒ míng tiān chōu xuě xū yào kōng fù ma ？", japanese: "看護師さん、明日の採血は空腹（絶食）である必要がありますか？" },
      { speaker: "护士", chinese: "是的，今晚十二点以后不要吃东西，水也要少喝。", pinyin: "shì de ， jīn wǎn shí èr diǎn yǐ hòu bú yào chī dōng xī ， shuǐ yě yào shǎo hē 。", japanese: "はい、今夜12時以降は何も食べないでください。水も控えてください。" }
    ],
    keyVocabulary: [
      { word: "空腹", pinyin: "kōng fù", meaning: "空腹、絶食状態" },
      { word: "抽血", pinyin: "chōu xuě", meaning: "採血する" }
    ]
  },
  {
    id: "hsk56-032",
    level: "HSK 5-6",
    scene: "咨询医疗保险理赔",
    sceneEmoji: "📄",
    lines: [
      { speaker: "患者", chinese: "医生，请帮我开一下诊断证明，我要办保险理赔。", pinyin: "yī shēng ， qǐng bāng wǒ kāi yí xià zhěn duàn zhèng míng ， wǒ yào bàn bǎo xiǎn lǐ péi 。", japanese: "先生、診断書を書いてください。保険金の請求（理賠）をしたいんです。" },
      { speaker: "医生", chinese: "没问题，拿着这个单子去窗口盖章就行。", pinyin: "méi wèn tí ， ná zhe zhè gè dān zi qù chuāng kǒu gài zhāng jiù xíng 。", japanese: "わかりました。この書類を持って窓口で押印してもらってください。" }
    ],
    keyVocabulary: [
      { word: "理赔", pinyin: "lǐ péi", meaning: "（保険などの）請求、支払い手続き" },
      { word: "盖章", pinyin: "gài zhāng", meaning: "押印する、スタンプを押す" }
    ]
  },
  {
    id: "hsk56-033",
    level: "HSK 5-6",
    scene: "护照丢了去领事馆",
    sceneEmoji: "🛂",
    lines: [
      { speaker: "游客", chinese: "我的护照丢了，明天就要回国了，能办紧急旅行证吗？", pinyin: "wǒ de hù zhào diū le ， míng tiān jiù yào huí guó le ， néng bàn jǐn jí lǚ xíng zhèng ma ？", japanese: "パスポートを紛失しました。明日帰国予定なのですが、緊急旅行証を発行できますか？" },
      { speaker: "工作人员", chinese: "你需要先去警察局报案，拿着报案回执再来这里。", pinyin: "nǐ xū yào xiān qù jǐng chá jú bào àn ， ná zhe bào àn huí zhí zài lái zhè lǐ 。", japanese: "まず警察署へ行って届け出てください。その受理証を持ってここに来てください。" }
    ],
    keyVocabulary: [
      { word: "领事馆", pinyin: "lǐng shì guǎn", meaning: "領事館" },
      { word: "回执", pinyin: "huí zhí", meaning: "受領書、控え" }
    ]
  },
  // ================= HSK 3-4: 突发状况（紧急篇） =================
  {
    id: "hsk34-035",
    level: "HSK 3-4",
    scene: "在商场跟孩子走散了",
    sceneEmoji: "📢",
    lines: [
      { speaker: "家长", chinese: "保安你好，我孩子不见了，能不能帮我广播一下？", pinyin: "bǎo ān nǐ hǎo ， wǒ hái zi bú jiàn le ， néng bù néng bāng wǒ guǎng bō yí xià ？", japanese: "警備員さん、子供がいなくなりました。館内放送をしてもらえませんか？" },
      { speaker: "保安", chinese: "别着急，请告诉我孩子的身高和衣服颜色。", pinyin: "bié zháo jí ， qǐng gào sù wǒ hái zi de shēn gāo hé yī fú yán sè 。", japanese: "落ち着いてください。お子さんの身長と服の色を教えてください。" }
    ],
    keyVocabulary: [
      { word: "走散", pinyin: "zǒu sàn", meaning: "はぐれる" },
      { word: "广播", pinyin: "guǎng bō", meaning: "放送する、アナウンス" }
    ]
  }
]

function main() {
  let content = fs.readFileSync(TARGET_FILE, 'utf-8')
  
  // 找到 hskFallbackData 对象的结尾（最后的 }）
  // 在最后一个 } 之前插入新数据
  
  // 找到 HSK56 数组的结尾
  const hsk56Match = content.match(/HSK56:\s*\[([\s\S]*?)\n\s*\],/)
  const hsk34Match = content.match(/HSK34:\s*\[([\s\S]*?)\n\s*\],/)
  
  if (!hsk56Match || !hsk34Match) {
    console.error('Could not find HSK arrays')
    process.exit(1)
  }
  
  // 分离 HSK56 和 HSK34 的新数据
  const newHSK56 = NEW_DIALOGUES.filter(d => d.level === 'HSK 5-6')
  const newHSK34 = NEW_DIALOGUES.filter(d => d.level === 'HSK 3-4')
  
  // 在 HSK56 数组末尾插入新数据
  const hsk56EndMarker = 'HSK56: ['
  const hsk56StartIdx = content.indexOf(hsk56EndMarker)
  if (hsk56StartIdx === -1) {
    console.error('Could not find HSK56 marker')
    process.exit(1)
  }
  
  // 找到 HSK56 数组的结束 ]），需要小心处理
  let depth = 0
  let hsk56EndIdx = hsk56StartIdx + hsk56EndMarker.length
  let foundStart = false
  while (hsk56EndIdx < content.length) {
    if (content[hsk56EndIdx] === '[') {
      foundStart = true
      depth++
    } else if (content[hsk56EndIdx] === ']') {
      depth--
      if (foundStart && depth === 0) {
        break
      }
    }
    hsk56EndIdx++
  }
  
  // 在 HSK56 的 ] 之前插入新数据
  const hsk56InsertPos = hsk56EndIdx
  
  // 类似处理 HSK34
  const hsk34EndMarker = 'HSK34: ['
  const hsk34StartIdx = content.indexOf(hsk34EndMarker)
  let hsk34EndIdx = hsk34StartIdx + hsk34EndMarker.length
  depth = 0
  foundStart = false
  while (hsk34EndIdx < content.length) {
    if (content[hsk34EndIdx] === '[') {
      foundStart = true
      depth++
    } else if (content[hsk34EndIdx] === ']') {
      depth--
      if (foundStart && depth === 0) {
        break
      }
    }
    hsk34EndIdx++
  }
  
  // 构建新数据字符串
  const formatDialogue = (d) => {
    const lines = d.lines.map(l => 
      `      { speaker: "${l.speaker}", chinese: "${l.chinese}", pinyin: "${l.pinyin}", japanese: "${l.japanese}" }`
    ).join(',\n')
    
    const vocab = d.keyVocabulary.map(v =>
      `      { word: "${v.word}", pinyin: "${v.pinyin}", meaning: "${v.meaning}" }`
    ).join(',\n')
    
    return `    {
      id: "${d.id}",
      level: "${d.level}",
      scene: "${d.scene}",
      sceneEmoji: "${d.sceneEmoji}",
      lines: [
${lines}
      ],
      keyVocabulary: [
${vocab}
      ]
    }`
  }
  
  const newHSK56Str = newHSK56.map(formatDialogue).join(',\n')
  const newHSK34Str = newHSK34.map(formatDialogue).join(',\n')
  
  // 先处理 HSK56（因为它在前面）
  if (newHSK56.length > 0) {
    content = content.slice(0, hsk56InsertPos) + ',\n' + newHSK56Str + content.slice(hsk56InsertPos)
  }
  
  // 重新计算 HSK34 的位置（因为内容变了）
  const newHsk34StartIdx = content.indexOf(hsk34EndMarker)
  let newHsk34EndIdx = newHsk34StartIdx + hsk34EndMarker.length
  depth = 0
  foundStart = false
  while (newHsk34EndIdx < content.length) {
    if (content[newHsk34EndIdx] === '[') {
      foundStart = true
      depth++
    } else if (content[newHsk34EndIdx] === ']') {
      depth--
      if (foundStart && depth === 0) {
        break
      }
    }
    newHsk34EndIdx++
  }
  
  if (newHSK34.length > 0) {
    content = content.slice(0, newHsk34EndIdx) + ',\n' + newHSK34Str + content.slice(newHsk34EndIdx)
  }
  
  fs.writeFileSync(TARGET_FILE, content, 'utf-8')
  console.log(`Added ${newHSK56.length} HSK56 dialogues and ${newHSK34.length} HSK34 dialogues`)
}

main()
