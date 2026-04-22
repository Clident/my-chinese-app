const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'lib', 'hsk-fallback-data.ts')
let content = fs.readFileSync(filePath, 'utf8')

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

const newHsk12 = [
  {
    id: "hsk12-019",
    scene: '医院挂号',
    sceneEmoji: '🏥',
    lines: [
      { speaker: "患者", chinese: "你好，我想挂内科。", pinyin: "nǐ hǎo ， wǒ xiǎng guà nèi kē 。", japanese: "すみません、内科の受診をお願いします。" },
      { speaker: "护士", chinese: "请给我你的护照，挂号费十块。", pinyin: "qǐng gěi wǒ nǐ de hù zhào ， guà hào fèi shí kuài 。", japanese: "パスポートをください。受付料は10元です。" },
      { speaker: "患者", chinese: "给你。是在二楼吗？", pinyin: "gěi nǐ 。 shì zài èr lóu ma ？", japanese: "はい。二階ですか？" }
    ],
    keyVocabulary: [
      { word: "挂号", pinyin: "guà hào", meaning: "受診の手続きをする、登録する" },
      { word: "内科", pinyin: "nèi kē", meaning: "内科" }
    ]
  },
  {
    id: "hsk12-020",
    scene: '药店买感冒药',
    sceneEmoji: '💊',
    lines: [
      { speaker: "顾客", chinese: "我感冒了，嗓子疼。", pinyin: "wǒ gǎn mào le ， sǎng zi téng 。", japanese: "風邪を引いて、喉が痛いです。" },
      { speaker: "店员", chinese: "发烧吗？吃过药了吗？", pinyin: "fā shāo ma ？ chī guò yào le ma ？", japanese: "熱はありますか？薬は飲みましたか？" },
      { speaker: "顾客", chinese: "没发烧，还没吃药。", pinyin: "méi fā shāo ， hái méi chī yào 。", japanese: "熱はありません。まだ薬は飲んでいません。" }
    ],
    keyVocabulary: [
      { word: "嗓子", pinyin: "sǎng zi", meaning: "喉" },
      { word: "感冒", pinyin: "gǎn mào", meaning: "風邪を引く" }
    ]
  }
]

const newHsk34 = [
  {
    id: "hsk34-023",
    scene: '向医生描述症状',
    sceneEmoji: '👨‍⚕️',
    lines: [
      { speaker: "医生", chinese: "哪里不舒服？", pinyin: "nǎ lǐ bù shū fú ？", japanese: "どこが具合悪いですか？" },
      { speaker: "患者", chinese: "我肚子疼得厉害，还一直恶心。", pinyin: "wǒ dù zi téng de lì hài ， hái yì zhí ě xīn 。", japanese: "お腹がひどく痛くて、ずっと吐き気がします。" },
      { speaker: "医生", chinese: "躺下，我给你检查一下。", pinyin: "tǎng xià ， wǒ gěi nǐ jiǎn chá yí xià 。", japanese: "横になって、検査しましょう。" }
    ],
    keyVocabulary: [
      { word: "厉害", pinyin: "lì hài", meaning: "ひどい、激しい" },
      { word: "恶心", pinyin: "ě xīn", meaning: "吐き気がする、ムカムカする" }
    ]
  },
  {
    id: "hsk34-024",
    scene: '确认过敏史（救命句）',
    sceneEmoji: '⚠️',
    lines: [
      { speaker: "医生", chinese: "你有过敏药物吗？", pinyin: "nǐ yǒu guò mǐn yào wù ma ？", japanese: "アレルギーのある薬はありますか？" },
      { speaker: "患者", chinese: "我对青霉素过敏。", pinyin: "wǒ duì qīng méi sù guò mǐn 。", japanese: "ペニシリンにアレルギーがあります。" },
      { speaker: "医生", chinese: "好，那我给你开别的药。", pinyin: "hǎo ， nà wǒ gěi nǐ kāi bié de yào 。", japanese: "わかりました、では別の薬を処方します。" }
    ],
    keyVocabulary: [
      { word: "过敏", pinyin: "guò mǐn", meaning: "アレルギーがある" },
      { word: "青霉素", pinyin: "qīng méi sù", meaning: "ペニシリン" }
    ]
  }
]

const newHsk56 = [
  {
    id: "hsk56-022",
    scene: '询问药效与副作用',
    sceneEmoji: '📝',
    lines: [
      { speaker: "患者", chinese: "这药会有副作用吗？", pinyin: "zhè yào huì yǒu fù zuò yòng ma ？", japanese: "この薬に副作用はありますか？" },
      { speaker: "医生", chinese: "可能会引起嗜睡，服药后不要开车。", pinyin: "kě néng huì yǐn qǐ shì shuì ， fú yào hòu bú yào kāi chē 。", japanese: "眠気を引き起こす可能性があるので、服用後の運転は避けてください。" },
      { speaker: "患者", chinese: "明白了，那一天吃几次？", pinyin: "míng bái le ， nà yì tiān chī jǐ cì ？", japanese: "わかりました。一日何回飲みますか？" }
    ],
    keyVocabulary: [
      { word: "副作用", pinyin: "fù zuò yòng", meaning: "副作用" },
      { word: "嗜睡", pinyin: "shì shuì", meaning: "嗜睡、ひどい眠気" }
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
console.log('Appended 5 medical dialogues')
