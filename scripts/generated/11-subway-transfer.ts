// ============================================================
// 场景 8：地下鉄の乗り換え（地铁换乘）
// 换乘路线・交通卡・出口指引
// ============================================================
export const subwayTransferDialogue = {
  scene: '询问地铁站',
  scene_ja: '地下鉄の乗り換え',
  sceneEmoji: '🚇',
  lines: [
    {
      speaker: 'A',
      chinese: '你好，请问去国家博物馆在哪站换乘？',
      pinyin: 'Nǐ hǎo , qǐng wèn qù Guójiā Bówùguǎn zài nǎ zhàn huàn chéng ?',
      japanese: 'すみません、国立博物館に行くにはどこで乗り換えたらいいですか？',
    },
    {
      speaker: 'B',
      chinese: '您需要在一号线换乘二号线，在王府井站下车。',
      pinyin: 'Nín xū yào zài yī hào xiàn huàn chéng èr hào xiàn , zài Wángfǔjǐng zhàn xià chē .',
      japanese: '1号線で2号線に乗り換えて、王府井駅で降りてください。',
    },
    {
      speaker: 'A',
      chinese: '王府井站是几号出口离博物馆最近？',
      pinyin: 'Wángfǔjǐng zhàn shì jǐ hào chū kǒu lí bówùguǎn zuì jìn ?',
      japanese: '王府井駅はどの出口から博物館に一番近いですか？',
    },
    {
      speaker: 'B',
      chinese: '从东出口出去，步行大约十分钟就到了。',
      pinyin: 'Cóng dōng chū kǒu chū qù , bù xíng dà yuē shí fēn zhōng jiù dào le .',
      japanese: '東口から出て、歩いて約10分です。',
    },
    {
      speaker: 'A',
      chinese: '好的，请问地铁票价是多少？',
      pinyin: 'Hǎo de , qǐng wèn dì tiě piào jià shì duō shǎo ?',
      japanese: 'はい、地下鉄の切符代はおいくらですか？',
    },
    {
      speaker: 'B',
      chinese: '按里程计算，三站内三块钱，超过三站加一块。',
      pinyin: 'Àn lí chéng jì suàn , sān zhàn nèi sān kuài qián , chāo guò sān zhàn jiā yí kuài .',
      japanese: '距離制で、3駅までは3元、3駅を超えると1元追加です。',
    },
    {
      speaker: 'A',
      chinese: '请问交通卡可以充值吗？',
      pinyin: 'Qǐng wèn jiāo tōng kǎ kě yǐ chōng zhí ma ?',
      japanese: '交通カードはチャージできますか？',
    },
    {
      speaker: 'B',
      chinese: '可以在自助机上充值，也可以用手机扫码充值。',
      pinyin: 'Kě yǐ zài zì zhù jī shàng chōng zhí , yě kě yǐ yòng shǒu jī sǎo mǎ chōng zhí .',
      japanese: '自動券売機でチャージできる他、スマホでQRコード決済も可能です。',
    },
    {
      speaker: 'A',
      chinese: '好的，请问我要坐的这班车还有多久到？',
      pinyin: 'Hǎo de , qǐng wèn wǒ yào zuò de zhè bān chē hái yǒu duō jiǔ dào ?',
      japanese: 'はい、私が乗るこの電車はあとどのくらいで着きますか？',
    },
    {
      speaker: 'B',
      chinese: '还有三分钟，下一班车马上就到，请抓紧时间。',
      pinyin: 'Hái yǒu sān fēn zhōng , xià yì bān chē mǎ shàng jiù dào , qǐng zhuā jǐn shí jiān .',
      japanese: 'あと3分です。下一本間もなく着きます。お急ぎください。',
    },
    {
      speaker: 'A',
      chinese: '太感谢了！我先去买票，回头见。',
      pinyin: 'Tài gǎn xiè le ! Wǒ xiān qù mǎi piào , huí tóu jiàn .',
      japanese: 'どうもありがとう！先去きましてお会いしましょう。',
    },
    {
      speaker: 'B',
      chinese: '不客气，祝您参观愉快。',
      pinyin: 'Bú kè qi , zhù nín cān guān yú kuài .',
      japanese: 'どういたしまして。博物館をお楽しみください。',
    },
  ],
  keyVocabulary: [
    {
      word: '换乘',
      pinyin: 'huàn chéng',
      meaning: '乗り換える',
      writingNote: '中文「换乘」= transfer。日文「乗換」（同義漢語）',
    },
    {
      word: '交通卡',
      pinyin: 'jiāo tōng kǎ',
      meaning: '交通ICカード（北京一卡通・上海交通卡等）',
      usageNote: '中国各大城市均有自己的交通卡：北京一卡通、上海交通卡、广州岭南通',
    },
    {
      word: '出口',
      pinyin: 'chū kǒu',
      meaning: '出口',
      writingNote: '中日同形語（音読みほぼ同じ chū kǒu）',
    },
    {
      word: '地铁票价',
      pinyin: 'dì tiě piào jià',
      meaning: '地下鉄料金',
      writingNote: '北京地铁：按公里计价，实行计程票制',
    },
    {
      word: '自助机',
      pinyin: 'zì zhù jī',
      meaning: '自動券売機',
      writingNote: '中文「自助」= self-service。日文「セルフ」（英借词）',
    },
    {
      word: '里程',
      pinyin: 'lǐ chéng',
      meaning: '距離・里程',
      writingNote: '中文「里程」= distance traveled。日文「里程」（同形同義）',
    },
    {
      word: '抓紧时间',
      pinyin: 'zhuā jǐn shí jiān',
      meaning: '急ぐ・時間に追われる',
      usageNote: '「抓紧」= がっちり掴む。転じて「急ぐ」',
    },
    {
      word: '下车',
      pinyin: 'xià chē',
      meaning: '降りる',
      writingNote: '中文「下车」= get off。日文「下车」（同形だが音読み）',
    },
  ],
};
