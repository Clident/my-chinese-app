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

const newHsk34 = [
  {
    id: "hsk34-018",
    scene: '同事推卸责任',
    sceneEmoji: '🙄',
    lines: [
      { speaker: "同事", chinese: "这个表格你还没做完吗？", pinyin: "zhè gè biǎo gé nǐ hái méi zuò wán ma ？", japanese: "この表、まだ終わってないの？" },
      { speaker: "你", chinese: "你昨天没给我数据，我没法做啊。", pinyin: "nǐ zuó tiān méi gěi wǒ shù jù ， wǒ méi fǎ zuò ā 。", japanese: "昨日データをもらってないから、やりようがないよ。" },
      { speaker: "同事", chinese: "哎呀，我给忘了，现在发你。", pinyin: "āi yā ， wǒ gěi wàng le ， xiàn zài fā nǐ 。", japanese: "おっと、忘れてた。今送るよ。" }
    ],
    keyVocabulary: [
      { word: "没法", pinyin: "méi fǎ", meaning: "〜のしようがない" },
      { word: "数据", pinyin: "shù jù", meaning: "データ" }
    ]
  },
  {
    id: "hsk34-019",
    scene: '办公室摸鱼被抓',
    sceneEmoji: '💻',
    lines: [
      { speaker: "经理", chinese: "小王，看什么呢，这么认真？", pinyin: "xiǎo wáng ， kàn shén me ne ， zhè me rèn zhēn ？", japanese: "王さん、何をそんなに熱心に見てるの？" },
      { speaker: "小王", chinese: "没，没看什么，我在查资料。", pinyin: "méi ， méi kàn shén me ， wǒ zài chá zī liào 。", japanese: "いえ、別に。資料を調べているところです。" },
      { speaker: "经理", chinese: "记得把方案改好，下班前给我。", pinyin: "jì de bǎ fāng àn gǎi hǎo ， xià bān qián gěi wǒ 。", japanese: "企画案を修正して、退勤前までに出してね。" }
    ],
    keyVocabulary: [
      { word: "认真", pinyin: "rèn zhēn", meaning: "真面目、熱心" },
      { word: "方案", pinyin: "fāng àn", meaning: "案、スキーム" }
    ]
  },
  {
    id: "hsk34-020",
    scene: '吐槽公司食堂',
    sceneEmoji: '🍛',
    lines: [
      { speaker: "A", chinese: "今天食堂又是土豆丝？", pinyin: "jīn tiān shí táng yòu shì tǔ dòu sī ？", japanese: "今日の食堂、またジャガイモの千切り？" },
      { speaker: "B", chinese: "算了，去外面吃吧，我都吃腻了。", pinyin: "suàn le ， qù wài miàn chī ba ， wǒ dōu chī nì le 。", japanese: "もういいよ、外に食べに行こう。食べ飽きちゃった。" }
    ],
    keyVocabulary: [
      { word: "算了", pinyin: "suàn le", meaning: "もういい、切り上げる" },
      { word: "吃腻", pinyin: "chī nì", meaning: "食べ飽きる" }
    ]
  }
]

const newHsk56 = [
  {
    id: "hsk56-018",
    scene: '老板画饼',
    sceneEmoji: '🫓',
    lines: [
      { speaker: "老板", chinese: "大家好好干，明年公司上市发奖金。", pinyin: "dà jiā hǎo hǎo gàn ， míng nián gōng sī shàng shì fā jiǎng jīn 。", japanese: "みんな頑張ろう、来年会社が上場したらボーナスを出すぞ。" },
      { speaker: "员工", chinese: "老板，这句话您去年也说过。", pinyin: "lǎo bǎn ， zhè jù huà nín qù nián yě shuō guò 。", japanese: "社長、その言葉、去年も仰ってましたよ。" },
      { speaker: "老板", chinese: "今年情况不同，要有信心。", pinyin: "jīn nián qíng kuàng bù tóng ， yào yǒu xìn xīn 。", japanese: "今年は状況が違うんだ、自信を持ちなさい。" }
    ],
    keyVocabulary: [
      { word: "上市", pinyin: "shàng shì", meaning: "上場する" },
      { word: "画饼", pinyin: "huà bǐng", meaning: "絵に描いた餅（実現しない約束）" }
    ]
  },
  {
    id: "hsk56-019",
    scene: '委婉拒绝不合理要求',
    sceneEmoji: '🤐',
    lines: [
      { speaker: "甲方", chinese: "这个设计明天早上必须给我。", pinyin: "jiǎ fāng ， zhè gè shè jì míng tiān zǎo shàng bì xū gěi wǒ 。", japanese: "このデザイン、明日の朝までに必ず出してください。" },
      { speaker: "乙方", chinese: "这恐怕有点难度，细节还没对齐。", pinyin: "zhè kǒng pà yǒu diǎn nán dù ， xì jié hái méi duì qí 。", japanese: "それは恐らく難しいです、詳細の調整がまだ終わっていません。" },
      { speaker: "甲方", chinese: "想想办法，老板催得很紧。", pinyin: "xiǎng xiǎng bàn fǎ ， lǎo bǎn cuī de hěn jǐn 。", japanese: "何とかしてください、社長の催促が激しいんです。" }
    ],
    keyVocabulary: [
      { word: "恐怕", pinyin: "kǒng pà", meaning: "恐らく、〜ではないかと思う" },
      { word: "对齐", pinyin: "duì qí", meaning: "（情報を）合わせる、同期する" }
    ]
  }
]

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
console.log('Appended 5 workplace dialogues')
