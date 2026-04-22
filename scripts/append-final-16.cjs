const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'lib', 'hsk-fallback-data.ts')

// 16条深水区场景
const loveData = [
  // HSK 5-6: 恋爱博弈
  {
    scene: '告白',
    sceneEmoji: '💕',
    lines: [
      { speaker: "男生", chinese: "其实我一直想跟你说……我喜欢你很久了。", pinyin: "qí shí wǒ yì zhí xiǎng gēn nǐ shuō … … wǒ xǐ huan nǐ hěn jiǔ le 。", japanese: "実はずっと言いたかったんだ……君のことがずっと好きだった。" },
      { speaker: "女生", chinese: "我……我没想到你会这么说，让我考虑一下好吗？", pinyin: "wǒ … … wǒ méi xiǎng dào nǐ huì zhè me shuō ， ràng wǒ kǎo lǜ yí xià hǎo ma ？", japanese: "私……そんな風に言われるとは思ってなかった。考えさせてくれない？" }
    ],
    keyVocabulary: [
      { word: "其实", pinyin: "qí shí", meaning: "実は" },
      { word: "没想到", pinyin: "méi xiǎng dào", meaning: "思っていなかった" }
    ]
  },
  {
    scene: '吵架',
    sceneEmoji: '😤',
    lines: [
      { speaker: "女朋友", chinese: "你总是这样，从来不把我的话当回事！", pinyin: "nǐ zǒng shì zhè yàng ， cóng lái bù bǎ wǒ de huà dāng huí shì ！", japanese: "いつもこうだよね。私の話を全く聞いてない！" },
      { speaker: "男朋友", chinese: "我没有不当回事，只是你每次都那么敏感！", pinyin: "wǒ méi yǒu bù dāng huí shì ， zhǐ shì nǐ měi cì dōu nà me mǐn gǎn ！", japanese: "聞いてないわけじゃない。ただ君が毎回過剰に反応するんだよ！" }
    ],
    keyVocabulary: [
      { word: "当回事", pinyin: "dāng huí shì", meaning: "真剣に受け止める" },
      { word: "敏感", pinyin: "mǐn gǎn", meaning: "敏感、過剰反応" }
    ]
  },
  {
    scene: '冷战',
    sceneEmoji: '🥶',
    lines: [
      { speaker: "男生", chinese: "你还在生我的气吗？我们谈谈好不好？", pinyin: "nǐ hái zài shēng wǒ de qì ma ？ wǒ men tán tan hǎo bu hǎo ？", japanese: "まだ怒ってる？話そうよ。" },
      { speaker: "女生", chinese: "没什么好谈的，你先冷静几天再说吧。", pinyin: "méi shén me hǎo tán de ， nǐ xiān lěng jìng jǐ tiān zài shuō ba 。", japanese: "話すことなんてない。まずは数日冷静になってからにして。" }
    ],
    keyVocabulary: [
      { word: "冷战", pinyin: "lěng zhàn", meaning: "冷戦（口を利かない状態）" },
      { word: "冷静", pinyin: "lěng jìng", meaning: "落ち着く、冷静になる" }
    ]
  },
  {
    scene: '求婚',
    sceneEmoji: '💍',
    lines: [
      { speaker: "男生", chinese: "这些年和你在一起是我最幸福的时光，你愿意嫁给我吗？", pinyin: "zhè xiē nián hé nǐ zài yì qǐ shì wǒ zuì xìng fú de shí guāng ， nǐ yuàn yì jià gěi wǒ ma ？", japanese: "この数年、君と一緒にいられたのは最高に幸せな時間だった。僕と結婚してくれない？" },
      { speaker: "女生", chinese: "我愿意！我会一直陪在你身边。", pinyin: "wǒ yuàn yì ！ wǒ huì yì zhí péi zài nǐ shēn biān 。", japanese: "いいよ！ずっとあなたのそばにいるね。" }
    ],
    keyVocabulary: [
      { word: "求婚", pinyin: "qiú hūn", meaning: "プロポーズ" },
      { word: "愿意", pinyin: "yuàn yì", meaning: "～したい、喜んで～する" }
    ]
  },
  {
    scene: '见家长',
    sceneEmoji: '👨‍👩‍👧',
    lines: [
      { speaker: "阿姨", chinese: "小伙子，你在哪里工作？收入怎么样？", pinyin: "xiǎo huǒ zi ， nǐ zài nǎ lǐ gōng zuò ？ shōu rù zěn me yàng ？", japanese: "お兄さん、どこで働いてるの？収入はどのくらい？" },
      { speaker: "男生", chinese: "阿姨好，我在一家互联网公司做工程师，收入还算稳定。", pinyin: "ā yí hǎo ， wǒ zài yì jiā hù lián wǎng gōng sī zuò gōng chéng shī ， shōu rù hái suàn wěn dìng 。", japanese: "おばさん、こんにちは。IT企業でエンジニアをしています。収入はまあ安定しています。" }
    ],
    keyVocabulary: [
      { word: "小伙子", pinyin: "xiǎo huǒ zi", meaning: "若者（若い男性への呼び方）" },
      { word: "稳定", pinyin: "wěn dìng", meaning: "安定している" }
    ]
  }
]

const rentalData = [
  // HSK 4-5: 租房续约/中介
  {
    scene: '房东涨租',
    sceneEmoji: '📈',
    lines: [
      { speaker: "房东", chinese: "今年房租要涨五百，现在物价都涨了。", pinyin: "jīn nián fáng zū yào zhǎng wǔ bǎi ， xiàn zài wù jià dōu zhǎng le 。", japanese: "今年は家賃を500元上げるよ。今は物価が全部上がってるから。" },
      { speaker: "租客", chinese: "房东，五百太多了，能不能少涨一点？", pinyin: "fáng dōng ， wǔ bǎi tài duō le ， néng bu néng shǎo zhǎng yì diǎn ？", japanese: "大家さん、500は多すぎます。もう少し安くしてもらえませんか？" }
    ],
    keyVocabulary: [
      { word: "涨", pinyin: "zhǎng", meaning: "上がる（価格など）" },
      { word: "房租", pinyin: "fáng zū", meaning: "家賃" }
    ]
  },
  {
    scene: '退房押金',
    sceneEmoji: '💰',
    lines: [
      { speaker: "租客", chinese: "我要退房了，押金什么时候能退给我？", pinyin: "wǒ yào tuì fáng le ， yā jīn shén me shí hou néng tuì gěi wǒ ？", japanese: "退去したいんですが、敷金はいつ返してもらえますか？" },
      { speaker: "房东", chinese: "等我看一下房子有没有损坏，没问题的话下周转给你。", pinyin: "děng wǒ kàn yí xià fáng zi yǒu méi yǒu sǔn huài ， méi wèn tí de huà xià zhōu zhuǎn gěi nǐ 。", japanese: "部屋に傷がないか確認してから、問題なければ来週振り込むよ。" }
    ],
    keyVocabulary: [
      { word: "退房", pinyin: "tuì fáng", meaning: "退去する" },
      { word: "押金", pinyin: "yā jīn", meaning: "敷金、保証金" }
    ]
  },
  {
    scene: '房屋维修',
    sceneEmoji: '🔧',
    lines: [
      { speaker: "租客", chinese: "房东，马桶堵了，您能找人来修一下吗？", pinyin: "fáng dōng ， mǎ tǒng dǔ le ， nín néng zhǎo rén lái xiū yí xià ma ？", japanese: "大家さん、トイレが詰まりました。誰か修理に呼んでもらえますか？" },
      { speaker: "房东", chinese: "行，我下午让维修师傅过去看看。", pinyin: "xíng ， wǒ xià wǔ ràng wéi xiū shī fu guò qu kàn kan 。", japanese: "わかった。午後に修理業者に行かせるね。" }
    ],
    keyVocabulary: [
      { word: "堵", pinyin: "dǔ", meaning: "詰まる" },
      { word: "维修", pinyin: "wéi xiū", meaning: "修理、メンテナンス" }
    ]
  },
  {
    scene: '中介看房',
    sceneEmoji: '🏠',
    lines: [
      { speaker: "中介", chinese: "这套房子离地铁站很近，采光也好，您要看看吗？", pinyin: "zhè tào fáng zi lí dì tiě zhàn hěn jìn ， cǎi guāng yě hǎo ， nín yào kàn kan ma ？", japanese: "この部屋は駅から近くて、日当たりも良いですよ。見てみますか？" },
      { speaker: "客户", chinese: "好的，我想先看看卧室和厨房。", pinyin: "hǎo de ， wǒ xiǎng xiān kàn kan wò shì hé chú fáng 。", japanese: "はい、まず寝室とキッチンを見たいです。" }
    ],
    keyVocabulary: [
      { word: "采光", pinyin: "cǎi guāng", meaning: "日当たり" },
      { word: "中介", pinyin: "zhōng jiè", meaning: "仲介業者、不動産屋" }
    ]
  },
  {
    scene: '续签合同',
    sceneEmoji: '📝',
    lines: [
      { speaker: "房东", chinese: "合同快到期了，你要续签吗？", pinyin: "hé tong kuài dào qī le ， nǐ yào xù qiān ma ？", japanese: "契約がもう切れるけど、更新する？" },
      { speaker: "租客", chinese: "续签的话，房租可以不变吗？", pinyin: "xù qiān de huà ， fáng zū kě yǐ bú biàn ma ？", japanese: "更新する場合、家賃はそのままでいいですか？" }
    ],
    keyVocabulary: [
      { word: "到期", pinyin: "dào qī", meaning: "期限が切れる" },
      { word: "续签", pinyin: "xù qiān", meaning: "更新する（契約を）" }
    ]
  }
]

const emergencyData = [
  // HSK 2-4: 紧急求助
  {
    scene: '手机丢了',
    sceneEmoji: '📱',
    lines: [
      { speaker: "失主", chinese: "你好，我的手机丢了，能不能帮我打一下？", pinyin: "nǐ hǎo ， wǒ de shǒu jī diū le ， néng bu néng bāng wǒ dǎ yí xià ？", japanese: "すみません、携帯を落としたんです。1回鳴らしてもらえませんか？" },
      { speaker: "路人", chinese: "好，你的号码是多少？", pinyin: "hǎo ， nǐ de hào mǎ shì duō shao ？", japanese: "いいですよ。番号は何番ですか？" }
    ],
    keyVocabulary: [
      { word: "丢", pinyin: "diū", meaning: "落とす、なくす" },
      { word: "号码", pinyin: "hào mǎ", meaning: "番号" }
    ]
  },
  {
    scene: '护照丢了',
    sceneEmoji: '🛂',
    lines: [
      { speaker: "游客", chinese: "警察叔叔，我的护照丢了，怎么办？", pinyin: "jǐng chá shū shu ， wǒ de hù zhào diū le ， zěn me bàn ？", japanese: "お巡りさん、パスポートをなくしました。どうすればいいですか？" },
      { speaker: "警察", chinese: "别急，你先去领事馆补办，然后来派出所开证明。", pinyin: "bié jí ， nǐ xiān qù lǐng shì guǎn bǔ bàn ， rán hòu lái pài chū suǒ kāi zhèng míng 。", japanese: "焦らないで。まず領事館で再発行手続きをしてから、交番で証明書をもらってね。" }
    ],
    keyVocabulary: [
      { word: "护照", pinyin: "hù zhào", meaning: "パスポート" },
      { word: "补办", pinyin: "bǔ bàn", meaning: "再発行する" }
    ]
  },
  {
    scene: '商场走散',
    sceneEmoji: '🛒',
    lines: [
      { speaker: "顾客", chinese: "服务员，我和孩子走散了，能帮我广播一下吗？", pinyin: "fú wù yuán ， wǒ hé hái zi zǒu sàn le ， néng bāng wǒ guǎng bō yí xià ma ？", japanese: "すみません、子供とはぐれました。放送してもらえますか？" },
      { speaker: "工作人员", chinese: "您别着急，孩子的特征是什么？穿什么颜色的衣服？", pinyin: "nín bié zháo jí ， hái zi de tè zhēng shì shén me ？ chuān shén me yán sè de yī fu ？", japanese: "落ち着いてください。お子さんの特徴は？何色の服を着ていますか？" }
    ],
    keyVocabulary: [
      { word: "走散", pinyin: "zǒu sàn", meaning: "はぐれる" },
      { word: "广播", pinyin: "guǎng bō", meaning: "放送する" }
    ]
  },
  {
    scene: '车祸处理',
    sceneEmoji: '🚗',
    lines: [
      { speaker: "司机A", chinese: "你开车怎么不看路！我的车被撞了！", pinyin: "nǐ kāi chē zěn me bú kàn lù ！ wǒ de chē bèi zhuàng le ！", japanese: "運転中、前を見てないのか！僕の車がぶつかったじゃないか！" },
      { speaker: "司机B", chinese: "对不起，是我不小心。我们先拍照留证，再报警吧。", pinyin: "duì bu qǐ ， shì wǒ bù xiǎo xīn 。 wǒ men xiān pāi zhào liú zhèng ， zài bào jǐng ba 。", japanese: "すみません、不注意でした。まず写真を撮って証拠を残して、それから警察を呼びましょう。" }
    ],
    keyVocabulary: [
      { word: "撞", pinyin: "zhuàng", meaning: "ぶつかる" },
      { word: "报警", pinyin: "bào jǐng", meaning: "警察に通報する" }
    ]
  },
  {
    scene: '行李延误',
    sceneEmoji: '🧳',
    lines: [
      { speaker: "乘客", chinese: "我的行李没出来，能帮我查一下吗？", pinyin: "wǒ de xíng li méi chū lái ， néng bāng wǒ chá yí xià ma ？", japanese: "荷物が出てこないんですが、調べてもらえますか？" },
      { speaker: "地勤", chinese: "您的行李可能在下一班航班，请您填一下这个单子，送到酒店后我们会通知您。", pinyin: "nín de xíng li kě néng zài xià yì bān háng bān ， qǐng nín tián yí xià zhè ge dān zi ， sòng dào jiǔ diàn hòu wǒ men huì tōng zhī nín 。", japanese: "お客様の荷物は次の便に載っている可能性があります。この用紙に記入してください。ホテルに届いたらお知らせします。" }
    ],
    keyVocabulary: [
      { word: "行李", pinyin: "xíng li", meaning: "荷物" },
      { word: "航班", pinyin: "háng bān", meaning: "便（フライト）" }
    ]
  },
  {
    scene: '钱包被偷',
    sceneEmoji: '💸',
    lines: [
      { speaker: "游客", chinese: "我的钱包被偷了！里面有护照和银行卡！", pinyin: "wǒ de qián bāo bèi tōu le ！ lǐ miàn yǒu hù zhào hé yín háng kǎ ！", japanese: "財布が盗まれました！中にパスポートと銀行のカードが入ってます！" },
      { speaker: "警察", chinese: "别着急，您先去银行挂失，然后来派出所做笔录。", pinyin: "bié zháo jí ， nín xiān qù yín háng guà shī ， rán hòu lái pài chū suǒ zuò bǐ lù 。", japanese: "焦らないで。まず銀行で紛失届を出してから、交番で調書を作りましょう。" }
    ],
    keyVocabulary: [
      { word: "偷", pinyin: "tōu", meaning: "盗む" },
      { word: "挂失", pinyin: "guà shī", meaning: "紛失届を出す" }
    ]
  }
]

// 格式化函数
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

// 读取文件
let content = fs.readFileSync(filePath, 'utf8')

// 分组追加
const hsk56Data = [...loveData]
const hsk45Data = [...rentalData]
const hsk234Data = [...emergencyData]

// 追加到 hsk12 (emergency中的简单场景)
const hsk12Emergency = emergencyData.filter((_, i) => i < 2) // 手机丢了、护照丢了
const hsk34Emergency = emergencyData.filter((_, i) => i >= 2 && i < 4) // 商场走散、车祸处理
const hsk56Emergency = emergencyData.filter((_, i) => i >= 4) // 行李延误、钱包被偷

// 找到 hsk12 数组结尾（// HSK 3-4 之前）
const hsk34Marker = '\r\n// HSK 3-4'
const hsk34Idx = content.indexOf(hsk34Marker)
if (hsk34Idx > 0) {
  const beforeHsk34 = content.substring(0, hsk34Idx)
  const lastBracket = beforeHsk34.lastIndexOf('}')
  const arrayEnd = beforeHsk34.lastIndexOf(']')
  
  const before = content.substring(0, lastBracket + 1)
  const middle = ',\n' + hsk12Emergency.map(formatDialogue).join(',\n') + '\n]'
  const after = content.substring(arrayEnd + 1)
  
  content = before + middle + after
  console.log('Added HSK12 emergency dialogues')
}

// 找到 hsk34 数组结尾（// HSK 5-6 之前）
const hsk56Marker = '\r\n// HSK 5-6'
const hsk56Idx = content.indexOf(hsk56Marker)
if (hsk56Idx > 0) {
  const beforeHsk56 = content.substring(0, hsk56Idx)
  const lastBracket = beforeHsk56.lastIndexOf('}')
  const arrayEnd = beforeHsk56.lastIndexOf(']')
  
  const before = content.substring(0, lastBracket + 1)
  const middle = ',\n' + [...rentalData, ...hsk34Emergency].map(formatDialogue).join(',\n') + '\n]'
  const after = content.substring(arrayEnd + 1)
  
  content = before + middle + after
  console.log('Added HSK34 rental + emergency dialogues')
}

// 找到 hsk56 数组结尾（// Helper function 之前）
const helperMarker = '\r\n// Helper function'
const helperIdx = content.indexOf(helperMarker)
if (helperIdx > 0) {
  const beforeHelper = content.substring(0, helperIdx)
  const lastBracket = beforeHelper.lastIndexOf('}')
  const arrayEnd = beforeHelper.lastIndexOf(']')
  
  const before = content.substring(0, lastBracket + 1)
  const middle = ',\n' + [...loveData, ...hsk56Emergency].map(formatDialogue).join(',\n') + '\n]'
  const after = content.substring(arrayEnd + 1)
  
  content = before + middle + after
  console.log('Added HSK56 love + emergency dialogues')
}

// 写回文件
fs.writeFileSync(filePath, content, 'utf8')
console.log('Done! Total: 84 + 16 = 100 dialogues')
