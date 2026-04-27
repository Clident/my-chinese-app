// ============================================================
// 模板 Demo：机场值机（Check-in）
// 旅游生存模板矩阵 · 第一波
//
// 规则：
// 1. A/B 对话字数平衡（±3字以内）
// 2. 每句含 ≥2 个 HSK 核心词汇
// 3. pinyin 用 Unicode 声调符号（ā á ǎ à），字间单空格
// 4. japanese 用标准日本語敬体
// ============================================================

export const airportCheckinDialogue = {
  scene: '机场值机',
  scene_ja: '空港チェックイン',
  sceneEmoji: '✈️',
  lines: [
    {
      speaker: 'A',
      chinese: '你好，我想办理值机，要靠窗的位置。',
      pinyin: 'Nǐ hǎo , wǒ xiǎng bàn lǐ zhí jī , yào kào chuāng de wèi zhi .',
      japanese: 'こんにちは、チェックインしたいです。窓際の席をお願いします。',
    },
    {
      speaker: 'B',
      chinese: '好的，请出示您的护照和身份证。',
      pinyin: 'Hǎo de , qǐng chū shì nín de hù zhào hé shēn fèn zhèng .',
      japanese: 'はい、パスポートと身分証明書を見せていただけますか。',
    },
    {
      speaker: 'A',
      chinese: '给您护照，这是我的身份证。',
      pinyin: 'Gěi nín hù zhào , zhè shì wǒ de shēn fèn zhèng .',
      japanese: 'はい、パスポートと身分証明書です。',
    },
    {
      speaker: 'B',
      chinese: '好的，您坐经济舱，去上海的航班。',
      pinyin: 'Hǎo de , nín zuò jīng jì cāng , qù Shànghǎi de háng bān .',
      japanese: 'はい、エコノミークラス、上海行きですね。',
    },
    {
      speaker: 'A',
      chinese: '是的，请问我的行李超重了吗？',
      pinyin: 'Shì de , qǐng wèn wǒ de xíng li chāo zhòng le ma ?',
      japanese: 'はい、でも恐れ入ります。スーツケースの重量を確認させていただけますか？',
    },
    {
      speaker: 'B',
      chinese: '是的，超重了五公斤，需要付超重费。',
      pinyin: 'Shì de , chāo zhòng le wǔ gōng jīn , xū yào fù chāo zhòng fèi .',
      japanese: 'はい、5キロ超過しています。超過料金のお支払いが必要です。',
    },
    {
      speaker: 'A',
      chinese: '麻烦您，请给我一张靠窗的座位，谢谢。',
      pinyin: 'Má fan nín , qǐng gěi wǒ yì zhāng kào chuāng de zuò wèi , xiè xie .',
      japanese: 'すみません、窓側の席をお願いします。ありがとうございます。',
    },
    {
      speaker: 'B',
      chinese: '好的，已经为您安排了靠窗的座位。',
      pinyin: 'Hǎo de , yǐ jīng wèi nín ān pái le kào chuāng de zuò wèi .',
      japanese: 'はい、窓側の席を手配いたしました。',
    },
    {
      speaker: 'B',
      chinese: '每公斤五十元，一共两百五十元。',
      pinyin: 'Měi gōng jīn wǔ shí yuán , yí gòng liǎng bǎi wǔ shí yuán .',
      japanese: '1キロ50元で、合計250元です。',
    },
    {
      speaker: 'A',
      chinese: '可以，请帮我托运这件行李。',
      pinyin: 'Kě yǐ , qǐng bāng wǒ tuō yùn zhè jiàn xíng li .',
      japanese: '結構です。このスーツケースを預けたいのですが。',
    },
    {
      speaker: 'B',
      chinese: '好的，请在这里签字。您的登机口是A12，登机时间是十点四十五分。',
      pinyin: 'Hǎo de , qǐng zài zhè lǐ qiān zì . Nín de dēng jī kǒu shì A shí èr , dēng jī shí jiān shì shí diǎn sì shí wǔ fēn .',
      japanese: 'はい、ここに署名をお願いします。搭乗ゲートはA12、搭乗時間は10時45分です。',
    },
    {
      speaker: 'A',
      chinese: '好的，请问安检在哪个方向？',
      pinyin: 'Hǎo de , qǐng wèn ān jiǎn zài nǎ ge fāng xiàng ?',
      japanese: 'はい、でも恐れ入ります。安検はどこですか？',
    },
    {
      speaker: 'B',
      chinese: '往前走，左转就到了。请注意，充电宝不能托运，需要随身携带。',
      pinyin: 'Wǎng qián zǒu , zuǒ zhuǎn jiù dào le . Qǐng zhù yì , chōng diàn bǎo bù néng tuō yùn , xū yào suí shēn xié dài .',
      japanese: 'まっすぐ行って、左に曲がると着きます。モバイルバッテリーは預けられないので、機内にお持ちください。',
    },
    {
      speaker: 'A',
      chinese: '明白了，谢谢您！祝您工作顺利。',
      pinyin: 'Míng bái le , xiè xie nín ! Zhù nín gōng zuò shùn lì .',
      japanese: 'わかりました。ありがとうございます。お仕事頑張ってください！',
    },
  ],
  keyVocabulary: [
    {
      word: '值机',
      pinyin: 'zhí jī',
      meaning: 'チェックイン（航空搭乗手続き）',
      usageNote: '中文特有词，日语说"チェックイン"',
    },
    {
      word: '托运',
      pinyin: 'tuō yùn',
      meaning: '（行李を）預ける，托送',
      usageNote: '中国航空では預けた荷物を"托运行李"という',
    },
    {
      word: '超重',
      pinyin: 'chāo zhòng',
      meaning: '重量超過',
      writingNote: '中文"超重"、日文"超過"（注意同形語のニュアンス違い）',
    },
    {
      word: '靠窗',
      pinyin: 'kào chuāng',
      meaning: '窓際（の席）',
      usageNote: 'kào = 寄りかかる、chuāng = 窓。組合わせて「窓側」を意味する',
    },
    {
      word: '经济舱',
      pinyin: 'jīng jì cāng',
      meaning: 'エコノミークラス',
      writingNote: '中文"舱"是日文"倉"的繁体字形',
    },
    {
      word: '登机口',
      pinyin: 'dēng jī kǒu',
      meaning: '搭乗ゲート',
      writingNote: '中文"登机"日文"搭乗"（同義だが字形が違う）',
    },
    {
      word: '护照',
      pinyin: 'hù zhào',
      meaning: 'パスポート',
      writingNote: '中文"护照"、日文"パスポート"（無関係な字）',
    },
    {
      word: '身份证',
      pinyin: 'shēn fèn zhèng',
      meaning: '身分証明書（中国の居民身分証）',
      usageNote: '中国では日常に身分証携帯が義務。日語の「身分証」より具体的',
    },
    {
      word: '充电宝',
      pinyin: 'chōng diàn bǎo',
      meaning: 'モバイルバッテリー（充电宝）',
      usageNote: '中国語で日常的に使う言葉。HSK試験には出ないが、中国滞在では必須。日语没有直接对应词。',
    },
    {
      word: '随身携带',
      pinyin: 'suí shēn xié dài',
      meaning: '身上携带する',
      usageNote: '中国では液体・電子機器の手荷物持込规则が厳しい',
    },
  ],
}
