// ============================================================
// 场景 6：高速鉄道の切符購入（高铁购票）
// 购票・改签・身份证验证
// ============================================================
export const highSpeedTrainDialogue = {
  scene: '高铁购票',
  scene_ja: '高速鉄道の切符購入',
  sceneEmoji: '🚄',
  lines: [
    {
      speaker: 'A',
      chinese: '你好，我要买两张明天去北京的高铁票，二等座。',
      pinyin: 'Nǐ hǎo , wǒ yào mǎi liǎng zhāng míng tiān qù Běijīng de gāo tiě piào , èr děng zuò .',
      japanese: 'こんにちは、明日の北京行きの新幹線チケットを2枚、二等席をお願いします。',
    },
    {
      speaker: 'B',
      chinese: '好的，请问是早班车还是下午的车？',
      pinyin: 'Hǎo de , qǐng wèn shì zǎo bān chē hái shì xià wǔ de chē ?',
      japanese: 'はい、朝の便と午後便がありますが、どちらがよろしいですか？',
    },
    {
      speaker: 'A',
      chinese: '下午三点的，请问有几等座？价格是多少？',
      pinyin: 'Xià wǔ sān diǎn de , qǐng wèn yǒu jǐ děng zuò ? Jià gé shì duō shǎo ?',
      japanese: '午後3時の便をお願いします。座席の等級はありますか？おいくらですか？',
    },
    {
      speaker: 'B',
      chinese: '有二等座、一等座和商务座。二等座每张五百五十元。',
      pinyin: 'Yǒu èr děng zuò , yī děng zuò hé shāng wù zuò . Èr děng zuò měi zhāng wǔ bǎi wǔ shí yuán .',
      japanese: '二等席、一等席とビジネス席がございます。二等席は1枚550元です。',
    },
    {
      speaker: 'A',
      chinese: '那就买两张二等座，请问可以用护照购票吗？',
      pinyin: 'Nà jiù mǎi liǎng zhāng èr děng zuò , qǐng wèn kě yǐ yòng hù zhào gòu piào ma ?',
      japanese: 'じゃあ2枚二等席でお願いします。パスポートでチケットを買えますか？',
    },
    {
      speaker: 'B',
      chinese: '可以用护照，但是需要输入护照号码。',
      pinyin: 'Kě yǐ yòng hù zhào , dàn shì xū yào shū rù hù zhào hào mǎ .',
      japanese: 'はい、パスポートでお買い求めいただけますが、パスポート番号の入力が必要です。',
    },
    {
      speaker: 'A',
      chinese: '好的，请问可以改签吗？万一赶不上。',
      pinyin: 'Hǎo de , qǐng wèn kě yǐ gǎi qiān ma ? Wàn yī gǎn bù shàng .',
      japanese: 'はい、変更は可能ですか？もしかして間に合わない場合がありまして。',
    },
    {
      speaker: 'B',
      chinese: '开车前可以免费改签一次，需要加手续费每张二十元。',
      pinyin: 'Kāi chē qián kě yǐ miǎn fèi gǎi qiān yí cì , xū yào jiā shǒu xù fèi měi zhāng èr shí yuán .',
      japanese: '出発前であれば1回無料変更できます。手数料として1枚20元の追加が必要です。',
    },
    {
      speaker: 'A',
      chinese: '明白了，请问电子客票怎么进站？',
      pinyin: 'Míng bái le , qǐng wèn diàn zǐ kè piào zěn me jìn zhàn ?',
      japanese: 'わかりました。電子チケットでの入场方法は？',
    },
    {
      speaker: 'B',
      chinese: '刷身份证进站就可以，报一下您的护照号码和手机号。',
      pinyin: 'Shuā shēn fèn zhèng jìn zhàn jiù kě yǐ , bào yí xià nín de hù zhào hào mǎ hé shǒu jī hào .',
      japanese: '身分証明書で改札口をスキャンすれば入場できます。パスポート番号と携帯番号をお知らせください。',
    },
    {
      speaker: 'A',
      chinese: '护照号码是E12345678，手机号是一三九开头的。',
      pinyin: 'Hù zhào hào mǎ shì E yī èr sān sì wǔ liù qī bā , shǒu jī hào shì yī sān jiǔ kāi tóu de .',
      japanese: 'パスポート番号はE12345678、携帯番号は139からです。',
    },
    {
      speaker: 'B',
      chinese: '好的，请付款，一共是一千一百元。',
      pinyin: 'Hǎo de , qǐng fù kuǎn , yí gòng shì yì qiān yì bǎi yuán .',
      japanese: 'はい、お会計は合計1100元です。',
    },
  ],
  keyVocabulary: [
    {
      word: '高铁',
      pinyin: 'gāo tiě',
      meaning: '新幹線（中国高速鉄道）',
      usageNote: '中国高铁CRH系列，最高时速350km/h。相当于日本新幹線',
    },
    {
      word: '二等座',
      pinyin: 'èr děng zuò',
      meaning: '二等席',
      writingNote: '中国高铁座位等级：商务座 > 一等座 > 二等座',
    },
    {
      word: '改签',
      pinyin: 'gǎi qiān',
      meaning: 'チケット変更',
      usageNote: '中国高铁改签规则复杂：开车前可改签/退票，开车后不可退',
    },
    {
      word: '电子客票',
      pinyin: 'diàn zǐ kè piào',
      meaning: '電子チケット（QR不要、身分证刷卡）',
      usageNote: '中国高铁全面电子化，护照+身份证= ticket。无需取票',
    },
    {
      word: '护照号码',
      pinyin: 'hù zhào hào mǎ',
      meaning: 'パスポート番号',
      writingNote: '中国护照E开头8位，外籍护照格式各异',
    },
    {
      word: '手续费',
      pinyin: 'shǒu xù fèi',
      meaning: '手数料',
      writingNote: '中日同形語。改签手续费通常20-50元不等',
    },
    {
      word: '身份证',
      pinyin: 'shēn fèn zhèng',
      meaning: '身分証明書（中国居民身分証）',
      usageNote: '中国公民乘高铁必须使用二代身份证刷卡进站',
    },
    {
      word: '开车',
      pinyin: 'kāi chē',
      meaning: '出発する（列車の）',
      writingNote: '中文「开车」= drive/start car + 开车=列车出发。日文「出発」',
    },
  ],
};
