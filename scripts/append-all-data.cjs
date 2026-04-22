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

// ========== 职场系列 ==========
const workplaceHsk34 = [
  {
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

const workplaceHsk56 = [
  {
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

// ========== 社交系列 ==========
const socialHsk12 = [
  {
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

const socialHsk34 = [
  {
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

const socialHsk56 = [
  {
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

// ========== 医疗系列 ==========
const medicalHsk12 = [
  {
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

const medicalHsk34 = [
  {
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

const medicalHsk56 = [
  {
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

// ========== 理发店系列 ==========
const salonHsk12 = [
  {
    scene: '只是修一下',
    sceneEmoji: '💇‍♂️',
    lines: [
      { speaker: "理发师", chinese: "你想怎么剪？", pinyin: "nǐ xiǎng zěn me jiǎn ？", japanese: "どうされますか？" },
      { speaker: "顾客", chinese: "不想要太短，只是修一下。", pinyin: "bù xiǎng yào tài duǎn ， zhǐ shì xiū yí xià 。", japanese: "短くしたくないです。整えるだけにしてください。" },
      { speaker: "理发师", chinese: "好的，耳朵这里要剪吗？", pinyin: "hǎo de ， ěr duo zhè lǐ yào jiǎn ma ？", japanese: "わかりました。耳の周りは切りますか？" }
    ],
    keyVocabulary: [
      { word: "修", pinyin: "xiū", meaning: "整える、整えカットする" },
      { word: "太短", pinyin: "tài duǎn", meaning: "短すぎる" }
    ]
  }
]

const salonHsk34 = [
  {
    scene: '染发颜色咨询',
    sceneEmoji: '🎨',
    lines: [
      { speaker: "顾客", chinese: "我想染个颜色，不要太夸张的。", pinyin: "wǒ xiǎng rǎn gè yán sè ， bú yào tài kuā zhāng de 。", japanese: "カラーをしたいのですが、派手すぎない感じで。" },
      { speaker: "发型师", chinese: "这个深棕色怎么样？很显皮肤白。", pinyin: "zhè gè shēn zōng sè zěn me yàng ？ hěn xiǎn pí fū bái 。", japanese: "このダークブラウンはどうですか？肌が白く見えますよ。" },
      { speaker: "顾客", chinese: "行，听你的。", pinyin: "xíng ， tīng nǐ de 。", japanese: "いいですね、お任せします。" }
    ],
    keyVocabulary: [
      { word: "染", pinyin: "rǎn", meaning: "染める" },
      { word: "夸张", pinyin: "kuā zhāng", meaning: "派手、大げさ" }
    ]
  },
  {
    scene: '洗头时的水温',
    sceneEmoji: '💆',
    lines: [
      { speaker: "店员", chinese: "水温可以吗？烫不烫？", pinyin: "shuǐ wēn kě yǐ ma ？ tàng bú tàng ？", japanese: "お湯加減はいかがですか？熱くないですか？" },
      { speaker: "顾客", chinese: "有一点烫，请调凉一点。", pinyin: "yǒu yì diǎn tàng ， qǐng tiáo liáng yì diǎn 。", japanese: "少し熱いです。もう少しぬるくしてください。" }
    ],
    keyVocabulary: [
      { word: "水温", pinyin: "shuǐ wēn", meaning: "水温、お湯加減" },
      { word: "烫", pinyin: "tàng", meaning: "（熱すぎて）熱い" }
    ]
  }
]

const salonHsk56 = [
  {
    scene: '抗议剪得太短了',
    sceneEmoji: '😱',
    lines: [
      { speaker: "顾客", chinese: "哎呀！你怎么剪了这么多？太短了！", pinyin: "āi yā ！ nǐ zěn me jiǎn le zhè me duō ？ tài duǎn le ！", japanese: "ちょっと！あんなに切ってって言ったのに！短すぎます！" },
      { speaker: "理发师", chinese: "这样显得精神。而且发质受损严重，必须剪掉。", pinyin: "zhè yàng xiǎn de jīng shén 。 ér qiě fà zhì shòu sǔn yán zhòng ， bì xū jiǎn diào 。", japanese: "この方がスッキリ見えますよ。それに毛先が傷んでいたので、切る必要がありました。" },
      { speaker: "顾客", chinese: "可这跟我想要的发型完全不一样！", pinyin: "kě zhè gēn wǒ xiǎng yào de fā xíng wán quán bù yī yàng ！", japanese: "でも、私の希望してたスタイルと全然違います！" }
    ],
    keyVocabulary: [
      { word: "显精神", pinyin: "xiǎn jīng shén", meaning: "（髪型などで）元気に見える、ハツラツとする" },
      { word: "发质", pinyin: "fà zhì", meaning: "髪質" }
    ]
  }
]

// 合并每个级别的新数据
const newHsk12 = [...socialHsk12, ...medicalHsk12, ...salonHsk12]
const newHsk34 = [...workplaceHsk34, ...socialHsk34, ...medicalHsk34, ...salonHsk34]
const newHsk56 = [...workplaceHsk56, ...socialHsk56, ...medicalHsk56, ...salonHsk56]

console.log('New HSK12:', newHsk12.length)
console.log('New HSK34:', newHsk34.length)
console.log('New HSK56:', newHsk56.length)
console.log('Total new:', newHsk12.length + newHsk34.length + newHsk56.length)

// Windows 换行符
const CRLF = '\r\n'

// 正确的模式：},] 后面直接换行
const pattern1 = /\},\]\r\n\r\n\/\/ HSK 3-4/
const pattern2 = /\},\]\r\n\r\n\/\/ HSK 5-6/
const pattern3 = /\},\]\r\n\r\n\/\/ Helper/

const replacement1 = '},\r\n' + newHsk12.map(formatDialogue).join(',\r\n') + '\r\n]\r\n\r\n// HSK 3-4'
const replacement2 = '},\r\n' + newHsk34.map(formatDialogue).join(',\r\n') + '\r\n]\r\n\r\n// HSK 5-6'
const replacement3 = '},\r\n' + newHsk56.map(formatDialogue).join(',\r\n') + '\r\n]\r\n\r\n// Helper'

if (pattern1.test(content)) {
  content = content.replace(pattern1, replacement1)
  console.log('Replaced HSK12')
} else {
  console.log('Pattern1 not matched')
}

if (pattern2.test(content)) {
  content = content.replace(pattern2, replacement2)
  console.log('Replaced HSK34')
} else {
  console.log('Pattern2 not matched')
}

if (pattern3.test(content)) {
  content = content.replace(pattern3, replacement3)
  console.log('Replaced HSK56')
} else {
  console.log('Pattern3 not matched')
}

fs.writeFileSync(filePath, content, 'utf8')
console.log('Done!')
