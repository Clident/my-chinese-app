// ============================================================
// 场景 7：タクシーの配車（打车/网约车）
// 目的地设定・行李放置・路线确认
// ============================================================
export const taxiRideDialogue = {
  scene: '打车去机场',
  scene_ja: 'タクシーの配車',
  sceneEmoji: '🚕',
  lines: [
    {
      speaker: 'A',
      chinese: '师傅，我去首都机场，三号航站楼，麻烦快一点。',
      pinyin: 'Shī fu , wǒ qù Shǒu dū Jī chǎng , sān hào háng zhàn lóu , má fan kuài yì diǎn .',
      japanese: 'ドライバーさん、首都空港の第3ターミナルまで行きたいです。急いでください。',
    },
    {
      speaker: 'B',
      chinese: '好的，现在是早高峰，有点堵，我尽量绕一下。',
      pinyin: 'Hǎo de , xiàn zài shì zǎo gāo fēng , yǒu diǎn dǔ , wǒ jǐn liàng rào yí xià .',
      japanese: 'はい、今は朝のピークで少し込んでいます。できる限り遠回りします。',
    },
    {
      speaker: 'A',
      chinese: '好的，请问大概多久能到？',
      pinyin: 'Hǎo de , qǐng wèn dà gài duō jiǔ néng dào ?',
      japanese: 'はい、どれくらいかかりそうですか？',
    },
    {
      speaker: 'B',
      chinese: '大概五十分钟，如果不堵车的话可以快十分钟。',
      pinyin: 'Dà gài wǔ shí fēn zhōng , rú guǒ bù dǔ chē de huà kě yǐ kuài shí fēn zhōng .',
      japanese: 'おそらく50分程度です。込まなければ10分早いです。',
    },
    {
      speaker: 'A',
      chinese: '好的，我有行李，麻烦开一下后备箱。',
      pinyin: 'Hǎo de , wǒ yǒu xíng li , má fan kāi yí xià hòu bèi xiāng .',
      japanese: 'はい、荷物があります。トランクを開けてもらえますか？',
    },
    {
      speaker: 'B',
      chinese: '没问题，您有几个箱子？',
      pinyin: 'Méi wèn tí , nín yǒu jǐ gè xiāng zi ?',
      japanese: '問題ありませんが、スーツケースはいくつですか？',
    },
    {
      speaker: 'A',
      chinese: '两个箱子，后备箱应该够放。',
      pinyin: 'Liǎng gè xiāng zi , hòu bèi xiāng yīng gāi gòu fàng .',
      japanese: '2個ありますが、トランクに入りますか？',
    },
    {
      speaker: 'B',
      chinese: '够的，您系好安全带，我们准备出发了。',
      pinyin: 'Gòu de , nín jì hǎo ān quán dài , wǒ men zhǔn bèi chū fā le .',
      japanese: 'はい、Vベルトを締めてください。出発します。',
    },
    {
      speaker: 'A',
      chinese: '好的，请问走机场高速还是普通路？',
      pinyin: 'Hǎo de , qǐng wèn zǒu jī chǎng gāo sù hái shì pǔ tōng lù ?',
      japanese: 'はい、空港高速道路と一般道、どちらを行きますか？',
    },
    {
      speaker: 'B',
      chinese: '走高速快一些，但是要收十块钱高速费。',
      pinyin: 'Zǒu gāo sù kuài yì xiē , dàn shì yào shōu shí kuài qián gāo sù fèi .',
      japanese: '高速道路の方が速いですが、高速料金として10元必要です。',
    },
    {
      speaker: 'A',
      chinese: '走高速吧，时间更重要。',
      pinyin: 'Zǒu gāo sù ba , shí jiān gèng zhòng yào .',
      japanese: '高速道路で行ってください。時間の方が重要です。',
    },
    {
      speaker: 'B',
      chinese: '好的，到了，我会停在国际出发口。',
      pinyin: 'Hǎo de , dào le , wǒ huì tíng zài guó jì chū fā kǒu .',
      japanese: 'はい、ついてきました。国際線出発口に停めます。',
    },
  ],
  keyVocabulary: [
    {
      word: '师傅',
      pinyin: 'shī fu',
      meaning: '運転手さん（タクシー・配車の呼称）',
      usageNote: '「师傅」是对司机/工匠的尊称，不是师父的师傅',
    },
    {
      word: '后备箱',
      pinyin: 'hòu bèi xiāng',
      meaning: 'トランク（車の後部荷物スペース）',
      writingNote: '中文「后备箱」= trunk。日文「トランク」（英借词）',
    },
    {
      word: '安全带',
      pinyin: 'ān quán dài',
      meaning: 'シートベルト',
      writingNote: '中文「安全带」= seat belt。日文「シートベルト」',
    },
    {
      word: '高峰',
      pinyin: 'gāo fēng',
      meaning: 'ピーク時',
      writingNote: '早高峰/晚高峰 = 朝のピーク/夕方のピーク',
    },
    {
      word: '高速费',
      pinyin: 'gāo sù fèi',
      meaning: '高速道路料金',
      writingNote: '中国高速は距離制ではなく一定料金制',
    },
    {
      word: '出发口',
      pinyin: 'chū fā kǒu',
      meaning: '出発口',
      writingNote: '国際線出国＝International Departures',
    },
    {
      word: '堵车',
      pinyin: 'dǔ chē',
      meaning: '込む・渋滞',
      usageNote: '「堵」= 詰まる。堵车是中国大城市日常',
    },
    {
      word: '系好',
      pinyin: 'jì hǎo',
      meaning: '締める',
      writingNote: '系好安全带 = シートベルトを締める（着実に締める）',
    },
  ],
};
