// ============================================================
// 场景 5：手荷物受取所（行李提取）
// 行李丢失・行李牌对照・海关申报
// ============================================================
export const baggageClaimDialogue = {
  scene: '行李提取',
  scene_ja: '手荷物受取所',
  sceneEmoji: '🧳',
  lines: [
    {
      speaker: 'A',
      chinese: '我的行李没有出来，请问行李转盘是哪个？',
      pinyin: 'Wǒ de xíng li méi yǒu chū lái , qǐng wèn xíng li zhuǎn pán shì nǎ ge ?',
      japanese: '私の荷物が出てこないのですか。ターンテ이블はどこですか？',
    },
    {
      speaker: 'B',
      chinese: '请看屏幕，您的航班行李在七号转盘。',
      pinyin: 'Qǐng kàn píng mù , nín de háng bān xíng li zài qī hào zhuǎn pán .',
      japanese: 'モニターをご確認ください。お便の荷物はターンテーブル7番です。',
    },
    {
      speaker: 'A',
      chinese: '我已经去过了，七号转盘没有我的行李。',
      pinyin: 'Wǒ yǐ jīng qù guò le , qī hào zhuǎn pán méi yǒu wǒ de xíng li .',
      japanese: '行ってきましたが、7番には私の荷物がありませんでした。',
    },
    {
      speaker: 'B',
      chinese: '请问您的行李牌还在吗？让我查一下。',
      pinyin: 'Qǐng wèn nín de xíng li pái hái zài ma ? Ràng wǒ chá yí xià .',
      japanese: 'お手荷物タグはお持ちですか？確認させてください。',
    },
    {
      speaker: 'A',
      chinese: '在这里，是CA1234号。',
      pinyin: 'Zài zhè lǐ , shì CA yī èr sān sì hào .',
      japanese: 'ここです。CA1234です。',
    },
    {
      speaker: 'B',
      chinese: '系统显示您的行李已经上了传送带，请稍等，我去帮您查一下。',
      pinyin: 'Xì tǒng xiǎn shì nín de xíng li yǐ jīng shàng le chuán sòng dài , qǐng shāo děng , wǒ qù bāng nín chá yí xià .',
      japanese: 'システムでは既にベルトに流されていますが、少々お待ちください。確認して参ります。',
    },
    {
      speaker: 'A',
      chinese: '好的，谢谢。我的行李是黑色的大箱子，上面有我的标签。',
      pinyin: 'Hǎo de , xiè xie . Wǒ de xíng li shì hēi sè de dà xiāng zi , shàng miàn yǒu wǒ de biāo qiān .',
      japanese: 'はい、ありがとう。黒い大きなスーツケースで、表にタグがついています。',
    },
    {
      speaker: 'B',
      chinese: '找到了！您的行李被送到了行李分发室。',
      pinyin: 'Zhǎo dào le ! Nín de xíng li bèi sòng dào le xíng li fēn fā shì .',
      japanese: '見つかりました！手荷物は荷物配付室に運ばれていました。',
    },
    {
      speaker: 'A',
      chinese: '太好了，请问需要我一起去取吗？',
      pinyin: 'Tài hǎo le , qǐng wèn xū yào wǒ yì qǐ qù qǔ ma ?',
      japanese: 'よかった。私が一緒に取りに行く必要はありますか？',
    },
    {
      speaker: 'B',
      chinese: '不用，请您在这里签字，我帮您取过来。',
      pinyin: 'Bú yòng , qǐng nín zài zhè lǐ qiān zì , wǒ bāng nín qǔ guò lái .',
      japanese: '結構です。こちらに署名をお願いします。私が取って参ります。',
    },
    {
      speaker: 'A',
      chinese: '非常感谢，请问行李有损坏吗？',
      pinyin: 'Fēi cháng gǎn xiè , qǐng wèn xíng li yǒu sǔn huài ma ?',
      japanese: 'ありがとうございます。荷物は損傷していませんか？',
    },
    {
      speaker: 'B',
      chinese: '看起来完好，没有破损。请您检查一下。',
      pinyin: 'Kàn qǐ lái wán hǎo , méi yǒu pò sǔn . Qǐng nín jiǎn chá yí xià .',
      japanese: '見たところ問題なさそうです。開けてご確認ください。',
    },
  ],
  keyVocabulary: [
    {
      word: '行李转盘',
      pinyin: 'xíng li zhuǎn pán',
      meaning: 'ターンテーブル（手荷物受取）',
      writingNote: '中文「转盘」= rotating platform。日文「ターンテーブル」（英借词）',
    },
    {
      word: '行李牌',
      pinyin: 'xíng li pái',
      meaning: '手荷物タグ',
      writingNote: 'check-in时贴在护照上的luggage tag-stub',
    },
    {
      word: '传送带',
      pinyin: 'chuán sòng dài',
      meaning: 'ベルトコンベア・物流ベルト',
      writingNote: '中文「传送带」= conveyor belt。日文「ベルト」（英借词）',
    },
    {
      word: '标签',
      pinyin: 'biāo qiān',
      meaning: 'タグ',
      writingNote: '中文「标签」= label/tag。日文「ラベル」或「札」',
    },
    {
      word: '行李分发室',
      pinyin: 'xíng li fēn fā shì',
      meaning: '手荷物配付室',
      writingNote: '大型机场专設，负责晚到/错送行李的分拣房间',
    },
    {
      word: '完好',
      pinyin: 'wán hǎo',
      meaning: '无损・完整',
      writingNote: '中文「完好」= 完全无损伤。日文「无损」（同義）',
    },
    {
      word: '破损',
      pinyin: 'pò sǔn',
      meaning: '損傷・破损',
      writingNote: '中文「破损」= 壊れること。日文「損傷」',
    },
    {
      word: '签字',
      pinyin: 'qiān zì',
      meaning: '署名する',
      writingNote: '中文「签字」= sign。日文「署名」（同義）',
    },
  ],
};
