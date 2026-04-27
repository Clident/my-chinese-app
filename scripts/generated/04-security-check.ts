// ============================================================
// 场景 1：空港の保安検査（安检）
// 液体・電子機器・手荷物検査
// ============================================================
export const securityCheckDialogue = {
  scene: '安检',
  scene_ja: '空港の保安検査',
  sceneEmoji: '🔒',
  lines: [
    {
      speaker: 'A',
      chinese: '请把行李放上去，请把外套脱掉。',
      pinyin: 'Qǐng bǎ xíng li fàng shàng qu , qǐng bǎ wài tào tuō diào .',
      japanese: '荷物はベルトの上に乗せてください。上着も脱いでください。',
    },
    {
      speaker: 'B',
      chinese: '好的，请问雨伞也要单独检查吗？',
      pinyin: 'Hǎo de , qǐng wèn yǔ sǎn yě yào dān dú jiǎn chá ma ?',
      japanese: 'はい、傘も一人で検査する必要がありますか？',
    },
    {
      speaker: 'A',
      chinese: '对，雨伞和电脑都要单独过机器。',
      pinyin: 'Duì , yǔ sǎn hé diàn nǎo dōu yào dān dú guò jī qì .',
      japanese: 'はい、傘もパソコンも一台ずつ機械に通してください。',
    },
    {
      speaker: 'B',
      chinese: '好的，我的充电宝是一万毫安的。',
      pinyin: 'Hǎo de , wǒ de chōng diàn bǎo shì yí wàn háo ān de .',
      japanese: 'はい、私のモバイルバッテリーは10000ミリアンペアです。',
    },
    {
      speaker: 'A',
      chinese: '一万毫安可以带上去，但是不能托运。',
      pinyin: 'Yí wàn háo ān kě yǐ dài shàng qu , dàn shì bù néng tuō yùn .',
      japanese: '10000ミリアンペアなら機内持込は可能です。ただし預けられません。',
    },
    {
      speaker: 'B',
      chinese: '我知道了。请问液体有限制吗？',
      pinyin: 'Wǒ zhī dào le . Qǐng wèn yè tǐ yǒu xiàn zhì ma ?',
      japanese: 'わかりました。液体には制限がありますか？',
    },
    {
      speaker: 'A',
      chinese: '每位乘客只能带一件不超过一百毫升的液体。',
      pinyin: 'Měi wèi chéng kè zhǐ néng dài yí jiàn bù chāo guò yì bǎi háo shēng de yè tǐ .',
      japanese: '乗客お一人様、一容器100ミリリットル以内の液体のみ持込可能です。',
    },
    {
      speaker: 'B',
      chinese: '请问这瓶香水可以带吗？',
      pinyin: 'Qǐng wèn zhè píng xiāng shuǐ kě yǐ dài ma ?',
      japanese: 'この香水は持込めますか？',
    },
    {
      speaker: 'A',
      chinese: '一百毫升以上需要托运，请配合。',
      pinyin: 'Yì bǎi háo shēng yǐ shàng xū yào tuō yùn , qǐng pèi hé .',
      japanese: '100ミリリットル以上の場合は預けが必要です。ご協力をお願いします。',
    },
    {
      speaker: 'B',
      chinese: '好的，我现在去托运，谢谢提醒。',
      pinyin: 'Hǎo de , wǒ xiàn zài qù tuō yùn , xiè xie tí xǐng .',
      japanese: 'わかりました。今預けに行きます。ありがとうごございます。',
    },
  ],
  keyVocabulary: [
    {
      word: '安检',
      pinyin: 'ān jiǎn',
      meaning: '保安検査（Security Check）',
      usageNote: '「安全検査」の略。入国審査（税関）とは別物',
    },
    {
      word: '充电宝',
      pinyin: 'chōng diàn bǎo',
      meaning: 'モバイルバッテリー（便携式充电器）',
      usageNote: '中国民航局规定：100Wh以下可随身携带，100-160Wh需航空公司批准',
    },
    {
      word: '托运',
      pinyin: 'tuō yùn',
      meaning: '預ける（受託手荷物）',
      writingNote: '中文说「托运」「办托运」，日语说「預ける」「受託手荷物」',
    },
    {
      word: '液体',
      pinyin: 'yè tǐ',
      meaning: '液体',
      writingNote: '中日同形語（異音同形）、意味も同じ',
    },
    {
      word: '毫升',
      pinyin: 'háo shēng',
      meaning: 'ミリリットル（ml）',
      usageNote: '中国ではccではなく毫升。航空液体制限は100ml容器×1L袋',
    },
    {
      word: '毫安',
      pinyin: 'háo ān',
      meaning: 'ミリアンペア（mAh）',
      usageNote: 'バッテリー容量単位。航空規則はWh（ワット時）で計算される',
    },
    {
      word: '雨伞',
      pinyin: 'yǔ sǎn',
      meaning: '傘（傘を指す）',
      writingNote: '中文「伞」= 日本語「傘」。形状により折傘・長傘区別なし',
    },
    {
      word: '机器',
      pinyin: 'jī qì',
      meaning: '機械・装置',
      writingNote: '「机器」= machine。日语「機械」に近いがより日常的',
    },
  ],
};
