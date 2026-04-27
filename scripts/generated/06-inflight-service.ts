// ============================================================
// 场景 3：機内サービス（机上服务）
// 毛布・饮品・娱乐设施
// ============================================================
export const inflightServiceDialogue = {
  scene: '机上服务',
  scene_ja: '機内サービス',
  sceneEmoji: '🛋️',
  lines: [
    {
      speaker: 'A',
      chinese: '你好，请给我一条毛毯，有点冷。',
      pinyin: 'Nǐ hǎo , qǐng gěi wǒ yì tiáo máo tǎn , yǒu diǎn lěng .',
      japanese: 'すみません、毛布をいただけますか？少し寒いです。',
    },
    {
      speaker: 'B',
      chinese: '好的，请稍等，请问您要喝点什么？',
      pinyin: 'Hǎo de , qǐng shāo děng , qǐng wèn nín yào hē diǎn shén me ?',
      japanese: 'はい、少々お待ちください。お飲み物は何にしますか？',
    },
    {
      speaker: 'A',
      chinese: '请给我一杯橙汁，谢谢。',
      pinyin: 'Qǐng gěi wǒ yì bēi chéng zhī , xiè xie .',
      japanese: 'オレンジジュースをお願いします。',
    },
    {
      speaker: 'B',
      chinese: '好的，橙汁没有了，只有苹果汁和矿泉水。',
      pinyin: 'Hǎo de , chéng zhī méi yǒu le , zhǐ yǒu píng guǒ zhī hé kuàng quán shuǐ .',
      japanese: 'はい、オレンジジュースは切れしております。りんごジュースとお水ですが。',
    },
    {
      speaker: 'A',
      chinese: '那就苹果汁吧，请问有耳机吗？',
      pinyin: 'Nà jiù píng guǒ zhī ba , qǐng wèn yǒu ěr jī ma ?',
      japanese: 'じゃあ、りんごジュースでお願いします。ヘッドホンはありますか？',
    },
    {
      speaker: 'B',
      chinese: '有，请插在扶手上的耳机孔里，娱乐系统是免费的。',
      pinyin: 'Yǒu , qǐng chā zài fú shǒu shàng de ěr jī kǒng lǐ , yú lè xì tǒng shì miǎn fèi de .',
      japanese: 'はい、アームレストのジャックに差し込んでください。エンターテイメントは 무료입니다。',
    },
    {
      speaker: 'A',
      chinese: '请问怎么填写入境卡？',
      pinyin: 'Qǐng wèn zěn me tián xiě rù jìng kǎ ?',
      japanese: '入国カードはどのように記入すればいいですか？',
    },
    {
      speaker: 'B',
      chinese: '请写好您的姓名、护照号码和住宿地址。',
      pinyin: 'Qǐng xiě hǎo nín de xìng míng , hù zhào hào mǎ hé zhù sù dì zhǐ .',
      japanese: 'お名前、パスポート番号、現地の宿泊先をご記入ください。',
    },
    {
      speaker: 'A',
      chinese: '住宿地址写酒店名称可以吗？',
      pinyin: 'Zhù sù dì zhǐ xiě jiǔ diàn míng chēng kě yǐ ma ?',
      japanese: '宿泊先はホテルの名前でよろしいですか？',
    },
    {
      speaker: 'B',
      chinese: '可以，入境卡会在降落前收走，请保管好护照。',
      pinyin: 'Kě yǐ , rù jìng kǎ huì zài jiàng luò qián shōu zǒu , qǐng bǎo guǎn hǎo hù zhào .',
      japanese: 'はい、着陸前に回収いたします。パスポートは大切に保管してください。',
    },
    {
      speaker: 'A',
      chinese: '好的，谢谢！请问还有多久到达？',
      pinyin: 'Hǎo de , xiè xie ! Qǐng wèn hái yǒu duō jiǔ dào dá ?',
      japanese: 'ありがとうございます。あとどのくらいで着きますか？',
    },
    {
      speaker: 'B',
      chinese: '还有两个小时，预计当地时间下午三点落地。',
      pinyin: 'Hái yǒu liǎng gè xiǎo shí , yù jì dāng dì shí jiān xià wǔ sān diǎn luò dì .',
      japanese: 'あと2時間で、現地の午後3時に着く見込みです。',
    },
  ],
  keyVocabulary: [
    {
      word: '毛毯',
      pinyin: 'máo tǎn',
      meaning: '毛布',
      writingNote: '中文「毯」= 日文「毯」。毛毯/地毯/床毯区别使用',
    },
    {
      word: '耳机孔',
      pinyin: 'ěr jī kǒng',
      meaning: 'ヘッドホンジャック',
      writingNote: '中文「孔」= 穴・差し込み口。日文「ジャック」',
    },
    {
      word: '娱乐系统',
      pinyin: 'yú lè xì tǒng',
      meaning: '機内エンターテイメント',
      usageNote: '中国航班多为IFE（In-Flight Entertainment）触控屏',
    },
    {
      word: '入境卡',
      pinyin: 'rù jìng kǎ',
      meaning: '入国カード',
      writingNote: '中文「入境」= entering a country。日文「入国」（同義）',
    },
    {
      word: '护照号码',
      pinyin: 'hù zhào hào mǎ',
      meaning: 'パスポート番号',
      writingNote: '中国护照E开头8位。日本护照AB开头7位',
    },
    {
      word: '住宿地址',
      pinyin: 'zhù sù dì zhǐ',
      meaning: '宿泊先',
      writingNote: '中文「住宿」= 滞在する。日文「宿泊」（同義漢語）',
    },
    {
      word: '降落',
      pinyin: 'jiàng luò',
      meaning: '着陸する',
      writingNote: '中文「降落」= 日文「着陸」（同義）。「落」字に注意',
    },
    {
      word: '当地时间',
      pinyin: 'dāng dì shí jiān',
      meaning: '現地時間',
      writingNote: '中日同形語。国際線では時差計算が重要',
    },
  ],
};
