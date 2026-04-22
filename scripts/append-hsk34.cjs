const fs = require('fs')
const path = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let content = fs.readFileSync(path, 'utf8')

// New dialogues for HSK3-4 (追加10条)
const newHsk34Dialogues = [
  {
    scene: 'スマホ修理',
    sceneEmoji: '📱',
    lines: [
      { speaker: 'A', chinese: '我的手机屏幕碎了，能修吗？', pinyin: 'Wǒ de shǒu jī pí ng mù suì le , né ng xiū ma ?', japanese: '携帯の画面が割れたんですが、修理できますか？' },
      { speaker: 'B', chinese: '能修，不过要两三天。', pinyin: 'Né ng xiū , bú guò yà o liǎ ng sā n tiā n .', japanese: '修理できますが、2〜3日かかります。' },
      { speaker: 'A', chinese: '多少钱？', pinyin: 'Duō shao qiá n ?', japanese: 'いくらですか？' },
      { speaker: 'B', chinese: '五百左右，看型号。', pinyin: 'Wǔ bǎ i zuǒ yò u , kà n xí ng hà o .', japanese: '500元前後です、機種によります。' },
    ],
    keyVocabulary: [
      { word: '屏幕', pinyin: 'pí ng mù', meaning: '画面/スクリーン', writingNote: '「屏」は「屏風」の屏。' },
      { word: '修', pinyin: 'xiū', meaning: '修理する', usageNote: '「修手机」で携帯を修理する。' },
    ],
  },
  {
    scene: '面接',
    sceneEmoji: '👔',
    lines: [
      { speaker: 'A', chinese: '你为什么想来我们公司工作？', pinyin: 'Nǐ wè i shé nme xiǎ ng lá i wǒ men gō ng sī gō ng zuò ?', japanese: 'なぜ弊社で働きたいのですか？' },
      { speaker: 'B', chinese: '我对贵公司的行业前景很看好。', pinyin: 'Wǒ duì guì gō ng sī de há ng yè qiá n jǐ ng hě n kà n hǎ o .', japanese: '御社の業界の将来性を高く評価しています。' },
      { speaker: 'A', chinese: '你有什么特长或优势？', pinyin: 'Nǐ yǒ u shé nme té chá ng huò yō u shì ?', japanese: '何か特技や強みはありますか？' },
    ],
    keyVocabulary: [
      { word: '前景', pinyin: 'qiá n jǐ ng', meaning: '将来性/見通し', writingNote: '「前」+「景」= 前方の景色→将来。' },
      { word: '优势', pinyin: 'yō u shì', meaning: '優位性/強み', writingNote: '「优」= 優れた。「势」= 勢い。' },
    ],
  },
  {
    scene: '遅刻',
    sceneEmoji: '⏰',
    lines: [
      { speaker: 'A', chinese: '不好意思，我迟到了。', pinyin: 'Bù hǎ o yì si , wǒ chí dà o le .', japanese: 'すみません、遅刻しました。' },
      { speaker: 'B', chinese: '又堵车了吗？', pinyin: 'Yò u dǔ chē le ma ?', japanese: 'また渋滞ですか？' },
      { speaker: 'A', chinese: '对，今天特别严重。', pinyin: 'Duì , jī n tiā n tè bié yá n zhòng .', japanese: 'はい、今日は特にひどいです。' },
      { speaker: 'B', chinese: '下次早点出门吧。', pinyin: 'Xià cì zǎ o diǎ n chū mé n ba .', japanese: '次は早めに出てくださいね。' },
    ],
    keyVocabulary: [
      { word: '迟到', pinyin: 'chí dà o', meaning: '遅刻する', writingNote: '日本語の「遅到」とは言わない。' },
      { word: '严重', pinyin: 'yá n zhòng', meaning: '深刻/重大', writingNote: '日本語と同じ漢字。' },
    ],
  },
  {
    scene: 'ホテル予約',
    sceneEmoji: '🏨',
    lines: [
      { speaker: 'A', chinese: '请问还有房间吗？', pinyin: 'Qǐ ngwè n há i yǒ u fá ng jiā n ma ?', japanese: '部屋は空いていますか？' },
      { speaker: 'B', chinese: '请问您要住几天？', pinyin: 'Qǐ ngwè n ní n yà o zhù jǐ tiā n ?', japanese: '何泊されますか？' },
      { speaker: 'A', chinese: '两晚，标间就行。', pinyin: 'Liǎ ng wǎ n , biā o jiā n jiù xí ng .', japanese: '2泊で、ツインでいいです。' },
      { speaker: 'B', chinese: '好的，一共六百块。', pinyin: 'Hǎ o de , yí gòng liù bǎ i kuà i .', japanese: '承知しました。合計600元です。' },
    ],
    keyVocabulary: [
      { word: '标间', pinyin: 'biā o jiā n', meaning: 'ツインルーム', usageNote: '「标准间」の略。' },
      { word: '住', pinyin: 'zhù', meaning: '泊まる/住む', usageNote: 'ホテルに「住」ではなく「住几天」と言う。' },
    ],
  },
  {
    scene: '家探し',
    sceneEmoji: '🏠',
    lines: [
      { speaker: 'A', chinese: '这个房子离地铁站远吗？', pinyin: 'Zhè ge fá ng zi lí dì tiě zhà n yuǎ n ma ?', japanese: 'この家は地下鉄の駅から遠いですか？' },
      { speaker: 'B', chinese: '不远，走路十分钟。', pinyin: 'Bú yuǎ n , zǒ u lù shí fē n zhō ng .', japanese: '遠くないです。徒歩10分です。' },
      { speaker: 'A', chinese: '房租多少？包含水电费吗？', pinyin: 'Fá ng zū duō shao ? Bā o há n shuǐ dià n fè i ma ?', japanese: '家賃はいくらですか？水道光熱費込みですか？' },
    ],
    keyVocabulary: [
      { word: '房租', pinyin: 'fá ng zū', meaning: '家賃', writingNote: '「房」+「租」= 部屋の貸し賃。' },
      { word: '包含', pinyin: 'bā o há n', meaning: '含む', writingNote: '日本語の「包含」と同じ。' },
    ],
  },
  {
    scene: '引っ越し',
    sceneEmoji: '📦',
    lines: [
      { speaker: 'A', chinese: '你什么时候搬家？需要帮忙吗？', pinyin: 'Nǐ shé nme shí hou bān jiā ? Xū yà o bā ng má ng ma ?', japanese: 'いつ引っ越しですか？手伝いましょうか？' },
      { speaker: 'B', chinese: '下周六，已经找好搬家公司了。', pinyin: 'Xià zhō u liù , yǐ jī ng zhǎ o hǎ o bān jiā gō ng sī le .', japanese: '来週の土曜日、引っ越し業者はもう見つかりました。' },
      { speaker: 'A', chinese: '那我还是来送送你吧。', pinyin: 'Nà wǒ há ishì lá i sòng song nǐ ba .', japanese: 'じゃあ送りに行きますね。' },
    ],
    keyVocabulary: [
      { word: '搬家', pinyin: 'bān jiā', meaning: '引っ越しする', writingNote: '日本語の「引っ越し」は中国語で「搬家」。' },
      { word: '送', pinyin: 'sòng', meaning: '送る/見送る', usageNote: '「送送」で「見送りに行く」の丁寧な表現。' },
    ],
  },
  {
    scene: 'レストラン予約',
    sceneEmoji: '🍽️',
    lines: [
      { speaker: 'A', chinese: '您好，想订一个包间。', pinyin: 'Ní n hǎ o , xiǎ ng dì ng yí ge bā o jiā n .', japanese: 'こんにちは、個室を予約したいです。' },
      { speaker: 'B', chinese: '请问几位？什么时间？', pinyin: 'Qǐ ngwè n jǐ wè i ? Shé nme shí jiā n ?', japanese: '何名様ですか？何時ごろですか？' },
      { speaker: 'A', chinese: '六个人，晚上七点。', pinyin: 'Liù ge ré n , wǎ nshang qī diǎ n .', japanese: '6名で、夜7時です。' },
    ],
    keyVocabulary: [
      { word: '包间', pinyin: 'bā o jiā n', meaning: '個室/プライベートルーム', writingNote: '「包」= 丸ごと。「间」= 部屋。' },
      { word: '订', pinyin: 'dì ng', meaning: '予約する', usageNote: '「订房间」「订包间」で予約。' },
    ],
  },
  {
    scene: '観光案内',
    sceneEmoji: '🏯',
    lines: [
      { speaker: 'A', chinese: '请问故宫怎么走？', pinyin: 'Qǐ ngwè n Gǔ gō ng zě nme zǒ u ?', japanese: 'すみません、故宮へはどう行けばいいですか？' },
      { speaker: 'B', chinese: '坐地铁一号线，天安门东站下车。', pinyin: 'Zuò dì tiě yī hà o xià n , Tiā n ā n mé n Dō ng zhà n xià chē .', japanese: '地下鉄1号線に乗って、天安門東駅で降りてください。' },
      { speaker: 'A', chinese: '谢谢！需要买票吗？', pinyin: 'Xiè xie ! Xū yà o mǎ i pià o ma ?', japanese: 'ありがとうございます！チケットは買えますか？' },
    ],
    keyVocabulary: [
      { word: '故宫', pinyin: 'Gǔ gō ng', meaning: '故宮博物院', writingNote: '「故」= 昔の。「宮」= 宮殿。' },
      { word: '下车', pinyin: 'xià chē', meaning: '降りる（乗り物から）', usageNote: 'バスや電車から降りる時の定型表現。' },
    ],
  },
  {
    scene: '病院',
    sceneEmoji: '🏥',
    lines: [
      { speaker: 'A', chinese: '你好，我挂一个内科。', pinyin: 'Nǐ hǎ o , wǒ guà yí ge nè i kē .', japanese: 'こんにちは、内科の受付をお願いします。' },
      { speaker: 'B', chinese: '带医保卡了吗？', pinyin: 'Dà i yì bǎ o kǎ le ma ?', japanese: '健康保険証はお持ちですか？' },
      { speaker: 'A', chinese: '带了，这是卡和身份证。', pinyin: 'Dà i le , zhè shì kǎ hé shē n fè n zhè ng .', japanese: '持っています、カードと身分証です。' },
    ],
    keyVocabulary: [
      { word: '挂', pinyin: 'guà', meaning: '受付する/予約する', usageNote: '病院で診察を受けることを「挂号」と言う。' },
      { word: '医保卡', pinyin: 'yì bǎ o kǎ', meaning: '健康保険証', writingNote: '「医保」= 医療保険。「卡」= カード。' },
    ],
  },
  {
    scene: '銀行振込',
    sceneEmoji: '🏦',
    lines: [
      { speaker: 'A', chinese: '你好，我想汇款到日本。', pinyin: 'Nǐ hǎ o , wǒ xiǎ ng huì kuǎ n dà o Rì bě n .', japanese: 'こんにちは、日本へ送金したいです。' },
      { speaker: 'B', chinese: '请填写汇款单，需要收款人的银行信息。', pinyin: 'Qǐ ng tiá n xiě huì kuǎ n dā n , xū yà o shō u kuǎ n ré n de yí nhá ng xì n xī .', japanese: '送金用紙にご記入ください。受取人の銀行情報が必要です。' },
      { speaker: 'A', chinese: '手续费多少？', pinyin: 'Shǒ u xù fè i duō shao ?', japanese: '手数料はいくらですか？' },
    ],
    keyVocabulary: [
      { word: '汇款', pinyin: 'huì kuǎ n', meaning: '送金する', writingNote: '「汇」= 集める/送る。「款」= お金。' },
      { word: '手续费', pinyin: 'shǒ u xù fè i', meaning: '手数料', writingNote: '「手続費」の意。' },
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

// Find the position to insert: before the closing ] of hsk34Dialogues
const pattern = /\r\n\]\r\n\r\n\/\/ HSK 5-6/
const match = content.match(pattern)
if (!match) {
  console.error('Could not find hsk34Dialogues end pattern')
  process.exit(1)
}

const insertPos = match.index + 2 // After \r\n, before ]

// Format and insert
const formatted = '\r\n' + newHsk34Dialogues.map(formatDialogue).join('\r\n')
content = content.slice(0, insertPos) + formatted + content.slice(insertPos)

fs.writeFileSync(path, content, 'utf8')
console.log(`Added ${newHsk34Dialogues.length} dialogues to HSK3-4`)
console.log('New total:', 5 + newHsk34Dialogues.length, 'dialogues in HSK3-4')
