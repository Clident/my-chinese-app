// ============================================================
// 场景 9：ホテルのチェックイン（酒店入住）
// 预约确认・早餐券・Wi-Fi密码・押金
// ============================================================
export const hotelCheckinDialogue = {
  scene: '酒店入住',
  scene_ja: 'ホテルのチェックイン',
  sceneEmoji: '🏨',
  lines: [
    {
      speaker: 'A',
      chinese: '你好，我预订了今晚的房间，请帮我办理入住。',
      pinyin: 'Nǐ hǎo , wǒ yù dìng le jīn wǎn de fáng jiān , qǐng bāng wǒ bàn lǐ rù zhù .',
      japanese: 'こんばんは、今晚の部屋を予約してあるのですが、チェックインをお願いします。',
    },
    {
      speaker: 'B',
      chinese: '好的，请问您贵姓？请问出示护照。',
      pinyin: 'Hǎo de , qǐng wèn nín guì xìng ? Qǐng wèn chū shì hù zhào .',
      japanese: 'はい、お名前をお聞かせいただけますか？パスポートも見せていただけますか？',
    },
    {
      speaker: 'A',
      chinese: '我姓山本，护照给您，这是预订确认单。',
      pinyin: 'Wǒ xìng Shān běn , hù zhào gěi nín , zhè shì yù dìng què rèn dān .',
      japanese: '山本です。パスポートと予約確認書です。',
    },
    {
      speaker: 'B',
      chinese: '找到了，您订的是豪华双人房，住两晚。',
      pinyin: 'Zhǎo dào le , nín dìng de shì háo huá shuāng rén fáng , zhù liǎng wǎn .',
      japanese: '確認できました。デラックスツイン、お二泊ですね。',
    },
    {
      speaker: 'A',
      chinese: '是的，请问早餐包含在房费里吗？',
      pinyin: 'Shì de , qǐng wèn zǎo cān bāo hán zài fáng fèi lǐ ma ?',
      japanese: 'はい、朝食は部屋に含まれていますか？',
    },
    {
      speaker: 'B',
      chinese: '包含的，早餐时间是早上七点到十点，这是早餐券。',
      pinyin: 'Bāo hán de , zǎo cān shí jiān shì zǎo shàng qī diǎn dào shí diǎn , zhè shì zǎo cān quàn .',
      japanese: '含まれています。朝食時間は朝7時から10時までです。これが朝食券です。',
    },
    {
      speaker: 'A',
      chinese: '好的，请问Wi-Fi密码是多少？',
      pinyin: 'Hǎo de , qǐng wèn Wi-Fi mì mǎ shì duō shǎo ?',
      japanese: 'はい、Wi-Fiのパスワードを教えてください。',
    },
    {
      speaker: 'B',
      chinese: '密码在房卡套上，房间无线网络是Hotel-Free，无需密码。',
      pinyin: 'Mì mǎ zài fáng kǎ tào shàng , fáng jiān wú xiàn wǎng luò shì Hotel-Free , wú xū mì mǎ .',
      japanese: 'パスワードはカードスリーブに記載されています。客室のWi-Fiは「Hotel-Free」、パスワード不要です。',
    },
    {
      speaker: 'A',
      chinese: '好的，请问需要交押金吗？',
      pinyin: 'Hǎo de , qǐng wèn xū yào jiāo yā jīn ma ?',
      japanese: 'はい、デポジット（押金）は必要ですか？',
    },
    {
      speaker: 'B',
      chinese: '需要，刷一下信用卡作为押金，退房时会退还。',
      pinyin: 'Xū yào , shuā yí xià xìn yòng kǎ zuò wéi yā jīn , tuì fáng shí huì tuì huán .',
      japanese: '必要です。クレジットカードでデポジットを押さえていただきます。退去時に返金いたします。',
    },
    {
      speaker: 'A',
      chinese: '没问题，请问退房时间是几点？',
      pinyin: 'Méi wèn tí , qǐng wèn tuì fáng shí jiān shì jǐ diǎn ?',
      japanese: '問題ありません。チェックアウトは何時ですか？',
    },
    {
      speaker: 'B',
      chinese: '下午两点前退房都行，如果需要延迟请提前通知前台。',
      pinyin: 'Xià wǔ liǎng diǎn qián tuì fáng dōu xíng , rú guǒ xū yào yán chí qǐng tí qián tōng zhī qián tái .',
      japanese: '午後2時までにチェックアウトしていただければ結構です。延長の場合は前台にご通知ください。',
    },
  ],
  keyVocabulary: [
    {
      word: '入住',
      pinyin: 'rù zhù',
      meaning: 'チェックイン',
      writingNote: '中文「入住」= 客室に入る。日文「チェックイン」',
    },
    {
      word: '预订确认单',
      pinyin: 'yù dìng què rèn dān',
      meaning: '予約確認書',
      writingNote: '中文「确认单」= confirmation。日文「確認書」',
    },
    {
      word: '早餐券',
      pinyin: 'zǎo cān quàn',
      meaning: '朝食券',
      writingNote: '中国星级酒店多以实体早餐券为主，部分为自助餐式',
    },
    {
      word: 'Wi-Fi密码',
      pinyin: 'Wi-Fi mì mǎ',
      meaning: 'Wi-Fiパスワード',
      writingNote: '中国酒店Wi-Fi名多为酒店名拼音或英文，多需验证码',
    },
    {
      word: '押金',
      pinyin: 'yā jīn',
      meaning: 'デポジット（ 보증금 ）',
      usageNote: '中国酒店押金通常用信用卡预授权，退房即解冻',
    },
    {
      word: '信用卡',
      pinyin: 'xìn yòng kǎ',
      meaning: 'クレジットカード',
      writingNote: '中文「信用卡」= credit card。日文「クレジットカード」',
    },
    {
      word: '退房',
      pinyin: 'tuì fáng',
      meaning: 'チェックアウト',
      writingNote: '中文「退房」= 客室を退出する。日文「チェックアウト」',
    },
    {
      word: '前台',
      pinyin: 'qián tái',
      meaning: '前台・フロント',
      writingNote: '中国酒店「前台」= reception。日文「フロント」',
    },
  ],
};
