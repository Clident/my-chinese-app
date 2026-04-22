const fs = require('fs')
const path = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let content = fs.readFileSync(path, 'utf8')

// New dialogues for HSK5-6 (追加10条)
const newHsk56Dialogues = [
  {
    scene: '環境保護',
    sceneEmoji: '🌿',
    lines: [
      { speaker: 'A', chinese: '近年来，环境污染问题日益严重，引起了广泛关注。', pinyin: 'Jì n niá n lá i , huá n jì ng wū rǎ n wè n tí rì yì yá n zhòng , yǐ n qǐ le guǎ ng fà n guā n zhù .', japanese: '近年、環境汚染問題がますます深刻化し、広く注目を集めています。' },
      { speaker: 'B', chinese: '确实如此。垃圾分类、节能减排已成为社会共识。', pinyin: 'Què shí rú cǐ . Lā jī fē n lè i , jié né ng jiǎ n pá i yǐ ché ng wé i shè huì gòng shí .', japanese: '確かにそうです。ゴミ分別、省エネ・排出削減はすでに社会の共通認識になっています。' },
      { speaker: 'A', chinese: '作为企业，我们更应该承担起社会责任，推动可持续发展。', pinyin: 'Zuò wé i qǐ yè , wǒ me n gè ng yī ng gā i ché ng dā n qǐ shè huì zé rè n , tuī dòng kě chí xù fā zhǎ n .', japanese: '企業として、私たちは社会的責任を担い、持続可能な発展を推進すべきです。' },
    ],
    keyVocabulary: [
      { word: '日益', pinyin: 'rì yì', meaning: 'ますます/日増しに', usageNote: '「日」+「益」= 日々増える。フォーマルな表現。' },
      { word: '共识', pinyin: 'gòng shí', meaning: '共通認識', writingNote: '「共」+「識」。ビジネス文書で多用。' },
    ],
  },
  {
    scene: 'AI倫理',
    sceneEmoji: '🤖',
    lines: [
      { speaker: 'A', chinese: '人工智能技术的发展给我们带来了便利，但也引发了一些伦理问题。', pinyin: 'Ré n gō ng zhì né ng jì shù de fā zhǎ n gě i wǒ me n dà lá i le bià n lì , dà n yě yǐ n fā le yì xiē lú n lǐ wè n tí .', japanese: 'AI技術の発展は私たちに利便性をもたらしましたが、倫理問題も引き起こしました。' },
      { speaker: 'B', chinese: '您说得对。比如数据隐私、算法偏见等问题都需要认真对待。', pinyin: 'Ní n shuō de duì . Bǐ rú shù jù yǐ n sī , suà n fǎ piā n jià n dě ng wè n tí dō u xū yà o rè n zhē n duì dà i .', japanese: 'おっしゃる通りです。例えばデータプライバシー、アルゴリズムのバイアスなど、真剣に向き合う必要があります。' },
    ],
    keyVocabulary: [
      { word: '伦理', pinyin: 'lú n lǐ', meaning: '倫理', writingNote: '日本語と同じ漢字。' },
      { word: '偏见', pinyin: 'piā n jià n', meaning: 'バイアス/偏見', writingNote: '「偏」は日本語の「偏」と同じ。' },
    ],
  },
  {
    scene: 'キャリア',
    sceneEmoji: '💼',
    lines: [
      { speaker: 'A', chinese: '在这家公司工作了五年，我觉得是时候寻求新的挑战了。', pinyin: 'Zà i zhè jiā gō ng sī gō ng zuò le wǔ niá n , wǒ jué de shì shí hou xú n qiú xī n de tiǎ o zhà n le .', japanese: 'この会社で5年働きましたが、新たな挑戦を求める時が来たと感じています。' },
      { speaker: 'B', chinese: '您有什么打算吗？是考虑转行还是换个环境？', pinyin: 'Ní n yǒ u shé nme dǎ suà n ma ? Shì kǎ o lǜ zhuǎ n há ng há ishì huà n ge huá n jì ng ?', japanese: '何か計画はありますか？業種転換か、環境を変えることか検討されていますか？' },
      { speaker: 'A', chinese: '我想去创业，做自己真正感兴趣的事情。', pinyin: 'Wǒ xiǎ ng qù chuà ng yè , zuò zì jǐ zhē n zhè ng gǎ n xì ng qù de shì qing .', japanese: '起業したいんです。自分が本当に興味のあることをやりたくて。' },
    ],
    keyVocabulary: [
      { word: '寻求', pinyin: 'xú n qiú', meaning: '求める/探す', writingNote: '「寻」= 探す。「求」= 求める。' },
      { word: '创业', pinyin: 'chuà ng yè', meaning: '起業する', writingNote: '「创」= 創る。「业」= 事業。' },
    ],
  },
  {
    scene: '教育改革',
    sceneEmoji: '📖',
    lines: [
      { speaker: 'A', chinese: '当前的教育体制存在诸多弊端，亟需改革。', pinyin: 'Dā ng qiá n de jià o yù tǐ zhì cú n zà i zhū duō bì duā n , jí xū gǎ i gé .', japanese: '現在の教育制度には多くの弊害があり、改革が急務です。' },
      { speaker: 'B', chinese: '我同意您的看法。过于强调分数和升学率，忽视了学生的全面发展。', pinyin: 'Wǒ tóng yì ní n de kà n fǎ . Guò yú qiá ng dià o fē n shù hé shé ng xué lǜ , hū shì le xué shē ng de quá n mià n fā zhǎ n .', japanese: '私も同感です。点数や進学率を重視しすぎて、学生の全面的な発展が軽視されています。' },
    ],
    keyVocabulary: [
      { word: '弊端', pinyin: 'bì duā n', meaning: '弊害/欠点', writingNote: '「弊」= 害。「端」= 端末。' },
      { word: '亟需', pinyin: 'jí xū', meaning: '急務である/切実に必要', usageNote: '「亟」= 切実に。フォーマルな表現。' },
    ],
  },
  {
    scene: '心の健康',
    sceneEmoji: '🧠',
    lines: [
      { speaker: 'A', chinese: '现代社会节奏快，很多人都面临着巨大的心理压力。', pinyin: 'Xià n dà i shè huì jié zò u kuà i , hě n duō ré n dō u mià n lí n zhe jù dà de xī n lǐ yā lì .', japanese: '現代社会はペースが速く、多くの人が大きな心理的プレッシャーに直面しています。' },
      { speaker: 'B', chinese: '确实。焦虑、抑郁已成为普遍问题，我们需要更加关注心理健康。', pinyin: 'Què shí . Jiā o lǜ , yì yù yǐ ché ng wé i pǔ bià n wè n tí , wǒ me n xū yà o gè ng jiā guā n zhù xī n lǐ jià n kā ng .', japanese: '確かに。不安やうつは一般的な問題となっており、メンタルヘルスにより注目する必要があります。' },
    ],
    keyVocabulary: [
      { word: '焦虑', pinyin: 'jiā o lǜ', meaning: '不安/焦燥', writingNote: '「焦」= 焦る。「虑」= 悩み。' },
      { word: '抑郁', pinyin: 'yì yù', meaning: 'うつ/抑うつ', writingNote: '「抑」= 抑える。「郁」= 憂鬱。' },
    ],
  },
  {
    scene: '国際関係',
    sceneEmoji: '🌍',
    lines: [
      { speaker: 'A', chinese: '在全球化背景下，国际合作比以往任何时候都更加重要。', pinyin: 'Zà i quá n qiú huà bè i jǐ ng xià , guó jì hé zuò bǐ yǐ wà n rè n hé shí hou dō u gè ng jiā zhòng yà o .', japanese: 'グローバル化を背景に、国際協力はかつてないほど重要になっています。' },
      { speaker: 'B', chinese: '您说得很有道理。面对气候变化、疫情等全球性挑战，没有哪个国家可以独善其身。', pinyin: 'Ní n shuō de hě n yǒ u dà o lǐ . Mià n duì qì hò u bià n huà , yì qí ng dě ng quá n qiú xì ng tiǎ o zhà n , mé i yǒ u nǎ ge guó jiā kě yǐ dú shà n qí shē n .', japanese: 'もっともです。気候変動、パンデミックなどの地球規模の課題に直面して、どの国も単独では対処できません。' },
    ],
    keyVocabulary: [
      { word: '独善其身', pinyin: 'ú shà n qí shē n', meaning: '独り善がり/自己保全', writingNote: '四字熟語。字義は「独りで自らを善くする」。' },
      { word: '全球性', pinyin: 'quá n qiú xì ng', meaning: '地球規模の/グローバルな', usageNote: '「全球」+「性」= 全地球的性質。' },
    ],
  },
  {
    scene: '技術革新',
    sceneEmoji: '💡',
    lines: [
      { speaker: 'A', chinese: '这项技术一旦成熟，将彻底改变我们的生活方式。', pinyin: 'Zhè xià ng jì shù yí dà n ché ng shú , jiā ng chè dǐ gǎ i bià n wǒ me n de shē ng huó fā ng shì .', japanese: 'この技術が成熟すれば、私たちの生活様式を根本から変えることになるでしょう。' },
      { speaker: 'B', chinese: '您说得对。不过，新技术的推广也需要考虑其潜在风险和社会影响。', pinyin: 'Ní n shuō de duì . Bú guò , xī n jì shù de tuī guǎ ng yě xū yà o kǎ o lǜ qí qiá n zà i fē ng xiǎ n hé shè huì yǐ ng xiǎ ng .', japanese: 'その通りです。ただ、新技術の普及には潜在的リスクと社会的影響も考慮する必要があります。' },
    ],
    keyVocabulary: [
      { word: '彻底', pinyin: 'chè dǐ', meaning: '徹底的に/根本的に', writingNote: '「彻」= 貫く。「底」= 底。' },
      { word: '潜在', pinyin: 'qiá n zà i', meaning: '潜在する/潜在的', writingNote: '日本語と同じ漢字。' },
    ],
  },
  {
    scene: '都市化',
    sceneEmoji: '🏙️',
    lines: [
      { speaker: 'A', chinese: '城市化进程虽然带来了经济增长，但也造成了房价上涨、交通拥堵等问题。', pinyin: 'Ché ng shì huà jì n ché ng suī rá n dà i lá i le jī ng jì zě ng zhǎ ng , dà n yě zà o ché ng le fá ng jià shà ng zhǎ ng , jiā o tō ng yō ng dǔ dě ng wè n tí .', japanese: '都市化のプロセスは経済成長をもたらしましたが、住宅価格の上昇や交通渋滞などの問題も引き起こしました。' },
      { speaker: 'B', chinese: '这是一个复杂的系统工程，需要政府、企业和公众共同参与解决。', pinyin: 'Zhè shì yí ge fù zá de xì tǒ ng gō ng ché ng , xū yà o zhè ng fǔ , qǐ yè hé gō ng zhòng gòng tóng cā n yù jiě jué .', japanese: 'これは複雑なシステム的問題であり、政府、企業、市民が共同で参加して解決する必要があります。' },
    ],
    keyVocabulary: [
      { word: '进程', pinyin: 'jì n ché ng', meaning: 'プロセス/過程', writingNote: '「进」= 進む。「程」= 道程。' },
      { word: '拥堵', pinyin: 'yō ng dǔ', meaning: '混雑する/渋滞', writingNote: '「拥」= 押し合う。「堵」= 塞ぐ。' },
    ],
  },
  {
    scene: '文化遺産',
    sceneEmoji: '🏛️',
    lines: [
      { speaker: 'A', chinese: '保护文化遗产是我们的历史责任，也是对子孙后代的承诺。', pinyin: 'Bǎ o hù wé n huà yí chǎ n shì wǒ me n de lì shǐ zé rè n , yě shì duì zǐ sūn hò u dà i de ché ng nuò .', japanese: '文化遺産の保護は私たちの歴史的責任であり、子孫への約束でもあります。' },
      { speaker: 'B', chinese: '您说得非常好。非物质文化遗产的传承同样重要，需要社会各界的共同努力。', pinyin: 'Ní n shuō de fē i chá ng hǎ o . Fē i wù zhì wé n huà yí chǎ n de chuá n ché ng tóng yà ng zhòng yà o , xū yà o shè huì gè jiè de gòng tóng nǔ lì .', japanese: '素晴らしいお考えです。無形文化遺産の継承も同様に重要で、社会各界の共同の努力が必要です。' },
    ],
    keyVocabulary: [
      { word: '遗产', pinyin: 'í chǎ n', meaning: '遺産', writingNote: '「遗」= 残す。「产」= 財産。' },
      { word: '传承', pinyin: 'chuá n ché ng', meaning: '継承する/伝承する', writingNote: '「传」= 伝える。「承」= 受け継ぐ。' },
    ],
  },
  {
    scene: '金融科技',
    sceneEmoji: '💳',
    lines: [
      { speaker: 'A', chinese: '移动支付的普及极大地改变了我们的消费习惯。', pinyin: 'Yí dòng zhī fù de pǔ jí jí dà de gǎ i bià n le wǒ me n de xiā o fè i xí guà n .', japanese: 'モバイル決済の普及は私たちの消費習慣を大きく変えました。' },
      { speaker: 'B', chinese: '是的。但与此同时，我们也需要关注数据安全和金融稳定问题。', pinyin: 'Shì de . Dà n yǔ cǐ tóng shí , wǒ me n yě xū yà o guā n zhù shù jù ā n quá n hé jī n róng wě n dì ng wè n tí .', japanese: 'そうです。同時に、データセキュリティと金融安定の問題にも注目する必要があります。' },
    ],
    keyVocabulary: [
      { word: '普及', pinyin: 'pǔ jí', meaning: '普及する', writingNote: '「普」= 広い。「及」= 行き渡る。' },
      { word: '稳定', pinyin: 'wě n dì ng', meaning: '安定する', writingNote: '「稳」は日本語では「安定」と言うが、中国語では「稳定」。' },
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

// Find the position to insert: before the closing ] of hsk56Dialogues
const pattern = /\r\n\]\r\n\r\n\/\/ Helper function/
const match = content.match(pattern)
if (!match) {
  console.error('Could not find hsk56Dialogues end pattern')
  process.exit(1)
}

const insertPos = match.index + 2 // After \r\n, before ]

// Format and insert
const formatted = '\r\n' + newHsk56Dialogues.map(formatDialogue).join('\r\n')
content = content.slice(0, insertPos) + formatted + content.slice(insertPos)

fs.writeFileSync(path, content, 'utf8')
console.log(`Added ${newHsk56Dialogues.length} dialogues to HSK5-6`)
console.log('New total:', 5 + newHsk56Dialogues.length, 'dialogues in HSK5-6')
