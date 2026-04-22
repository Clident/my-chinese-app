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
    id: "hsk12-018",
    scene: '电梯遇到邻居',
    sceneEmoji: '🛗',
    lines: [
      { speaker: "邻居", chinese: "下班了？今天挺早的。", pinyin: "xià bān le ？ jīn tiān tǐng zǎo de 。", japanese: "お帰りなさい。今日は早いですね。" },
      { speaker: "你", chinese: "是啊，今天不加班。", pinyin: "shì ā ， jīn tiān bù jiā bān 。", japanese: "ええ、今日は残業がないんです。" },
      { speaker: "邻居", chinese: "挺好，挺好。", pinyin: "tǐng hǎo ， tǐng hǎo 。", japanese: "それはいい、それはいい。" }
    ],
    keyVocabulary: [
      { word: "挺", pinyin: "tǐng", meaning: "とても、なかなか" },
      { word: "加班", pinyin: "jiā bān", meaning: "残業する" }
    ]
  }
]

const newHsk34 = [
  {
    id: "hsk34-021",
    scene: '被不熟的同学借钱',
    sceneEmoji: '💸',
    lines: [
      { speaker: "同学", chinese: "老同学，最近手头有点紧，能借点钱吗？", pinyin: "lǎo tóng xué ， zuì jìn shǒu tóu yǒu diǎn jǐn ， néng jiè diǎn qián ma ？", japanese: "同級生よ、最近ちょっと手元が苦しくて、お金貸してくれない？" },
      { speaker: "你", chinese: "哎呀，真不好意思，我刚付了房租，也没钱了。", pinyin: "āi yā ， zhēn bù hǎo yì sī ， wǒ gāng fù le fáng zū ， yě méi qián le 。", japanese: "ああ、本当にごめん。家賃を払ったばかりで、僕もお金がないんだ。" },
      { speaker: "同学", chinese: "好吧，那没事了。", pinyin: "hǎo ba ， nà méi shì le 。", japanese: "わかった、じゃあ大丈夫だよ。" }
    ],
    keyVocabulary: [
      { word: "手头紧", pinyin: "shǒu tóu jǐn", meaning: "手元が苦しい、金欠" },
      { word: "付", pinyin: "fù", meaning: "払う" }
    ]
  },
  {
    id: "hsk34-022",
    scene: '相亲尬聊',
    sceneEmoji: '🍵',
    lines: [
      { speaker: "A", chinese: "你平时有什么爱好吗？", pinyin: "nǐ píng shí yǒu shén me ài hào ma ？", japanese: "普段、何か趣味はありますか？" },
      { speaker: "B", chinese: "我喜欢在家里睡觉。", pinyin: "wǒ xǐ huān zài jiā lǐ shuì jiào 。", japanese: "家で寝るのが好きです。" },
      { speaker: "A", chinese: "哦……那挺省钱的。", pinyin: "ò …… nà tǐng shěng qián de 。", japanese: "そうですか……それはお金がかからなくていいですね。" }
    ],
    keyVocabulary: [
      { word: "爱好", pinyin: "ài hào", meaning: "趣味" },
      { word: "省钱", pinyin: "shěng qián", meaning: "節約になる、お金がかからない" }
    ]
  }
]

const newHsk56 = [
  {
    id: "hsk56-020",
    scene: '过年被亲戚催婚',
    sceneEmoji: '🧨',
    lines: [
      { speaker: "亲戚", chinese: "老大不小了，怎么还不谈对象啊？", pinyin: "lǎo dà bù xiǎo le ， zěn me hái bù tán duì xiàng ā ？", japanese: "もういい年なんだから、どうしてまだ恋人を作らないの？" },
      { speaker: "你", chinese: "我不着急，想先以事业为重。", pinyin: "wǒ bù zháo jí ， xiǎng xiān yǐ shì yè wéi zhòng 。", japanese: "急いでないんです、まずは仕事を優先したくて。" },
      { speaker: "亲戚", chinese: "事业要紧，成家也重要啊！", pinyin: "shì yè yào jǐn ， chéng jiā yě zhòng yào ā ！", japanese: "仕事も大事だけど、家庭を持つのも重要だよ！" }
    ],
    keyVocabulary: [
      { word: "老大不小", pinyin: "lǎo dà bù xiǎo", meaning: "もういい年だ、大人だ" },
      { word: "谈对象", pinyin: "tán duì xiàng", meaning: "付き合う、恋人を作る" }
    ]
  },
  {
    id: "hsk56-021",
    scene: '聚餐被劝酒',
    sceneEmoji: '🍶',
    lines: [
      { speaker: "张总", chinese: "小李，这杯必须喝，不喝就是不给我面子。", pinyin: "xiǎo lǐ ， zhè bēi bì xū hē ， bù hē jiù shì bù gěi wǒ miàn zi 。", japanese: "李くん、この一杯は飲まないと。飲まないのは僕の顔を潰すことになるよ。" },
      { speaker: "小李", chinese: "张总您误会了，我真的酒精过敏，实在不能喝。", pinyin: "zhāng zǒng nín wù huì le ， wǒ zhēn de jiǔ jīng guò mǐn ， shí zài bù néng hē 。", japanese: "張社長、誤解ですよ。本当にアルコールアレルギーで、どうしても飲めないんです。" },
      { speaker: "张总", chinese: "行吧，那这次就饶了你。", pinyin: "xíng ba ， nà zhè cì jiù ráo le nǐ 。", japanese: "いいよ、じゃあ今回は勘弁してやる。" }
    ],
    keyVocabulary: [
      { word: "给面子", pinyin: "gěi miàn zi", meaning: "顔を立てる、敬意を払う" },
      { word: "饶", pinyin: "ráo", meaning: "許す、勘弁する" }
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
console.log('Appended 5 social scenario dialogues')
