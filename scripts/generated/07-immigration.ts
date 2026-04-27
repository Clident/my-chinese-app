// ============================================================
// 场景 4：入国審査（海关入境）
// 滞在期間・観光目的・住宿登记
// ============================================================
export const immigrationDialogue = {
  scene: '海关入境',
  scene_ja: '入国審査',
  sceneEmoji: '🏛️',
  lines: [
    {
      speaker: 'A',
      chinese: '你好，请出示您的护照和签证。',
      pinyin: 'Nǐ hǎo , qǐng chū shì nín de hù zhào hé qiān zhèng .',
      japanese: 'パスポートとビザを見せていただけますか。',
    },
    {
      speaker: 'B',
      chinese: '给您，这是我的护照，签证是旅游签证。',
      pinyin: 'Gěi nín , zhè shì wǒ de hù zhào , qiān zhèng shì lǚ yóu qiān zhèng .',
      japanese: 'はい、パスポートです。ビザは観光ビザです。',
    },
    {
      speaker: 'A',
      chinese: '请问您计划在中国停留多长时间？',
      pinyin: 'Qǐng wèn nín jì huà zài Zhōngguó tíng liú duō cháng shí jiān ?',
      japanese: '中国での滞在期間はどのくらいですか？',
    },
    {
      speaker: 'B',
      chinese: '计划停留十五天，住宿已经订好了。',
      pinyin: 'Jì huà tíng liú shí wǔ tiān , zhù sù yǐ jīng dìng hǎo le .',
      japanese: '15日間滞在予定です。宿も予約済みです。',
    },
    {
      speaker: 'A',
      chinese: '请出示您的住宿预订确认单。',
      pinyin: 'Qǐng chū shì nín de zhù sù yù dìng què rèn dān .',
      japanese: '宿泊予約確認書を見せていただけますか？',
    },
    {
      speaker: 'B',
      chinese: '在这里，但是我还没有打印，可以用手机显示吗？',
      pinyin: 'Zài zhè lǐ , dàn shì wǒ hái méi yǒu dǎ yìn , kě yǐ yòng shǒu jī xiǎn shì ma ?',
      japanese: 'ここですが、印刷していません。スマホで表示でもいいですか？',
    },
    {
      speaker: 'A',
      chinese: '可以，请打开手机。请问您的职业是什么？',
      pinyin: 'Kě yǐ , qǐng dǎ kāi shǒu jī . Qǐng wèn nín de zhí yè shì shén me ?',
      japanese: 'はい、スマホを見せてください。お仕事はなんですか？',
    },
    {
      speaker: 'B',
      chinese: '我是公司职员，这次是出差顺便旅游。',
      pinyin: 'Wǒ shì gōng sī zhí yuán , zhè cì shì chū chāi shùn biàn lǚ yóu .',
      japanese: '企業の社員です。出張の合間に観光 тожеします。',
    },
    {
      speaker: 'A',
      chinese: '好的，请录一下指纹，按双手拇指。',
      pinyin: 'Hǎo de , qǐng lù yí xià zhǐ wén , àn shuāng shǒu mǔ zhǐ .',
      japanese: 'はい、指紋を録してください。両手の親指をお願いします。',
    },
    {
      speaker: 'B',
      chinese: '好的，请问我的签证可以延期吗？',
      pinyin: 'Hǎo de , qǐng wèn wǒ de qiān zhèng kě yǐ yán qī ma ?',
      japanese: 'はい、ビザの延長は可能ですか？',
    },
    {
      speaker: 'A',
      chinese: '可以延期，最多三十天，请提前三天去出入境管理局办理。',
      pinyin: 'Kě yǐ yán qī , zuì duō sān shí tiān , qǐng tí qián sān tiān qù chū rù jìng guǎn lǐ jú bàn lǐ .',
      japanese: 'はい、最大30日間延長可能です。3日前に出入国管理局でお手続きください。',
    },
    {
      speaker: 'B',
      chinese: '明白了，谢谢！欢迎来到中国，祝您旅途愉快。',
      pinyin: 'Míng bái le , xiè xie ! Huān yíng lái dào Zhōngguó , zhù nín lǚ tú yú kuài .',
      japanese: 'わかりました。ありがとうございます。中国へようこそ！ご旅行をお楽しみください。',
    },
  ],
  keyVocabulary: [
    {
      word: '签证',
      pinyin: 'qiān zhèng',
      meaning: 'ビザ',
      writingNote: '中文「签证」、日文「VISA」或「査証」。H5旅游签证（L visa）',
    },
    {
      word: '停留',
      pinyin: 'tíng liú',
      meaning: '滞在する',
      writingNote: '中文「停留」= 一時的に留まる。日文「滞在」（同義）',
    },
    {
      word: '住宿预订',
      pinyin: 'zhù sù yù dìng',
      meaning: '宿泊予約',
      writingNote: '中文「预订」= 予約する。日文「予約」',
    },
    {
      word: '职业',
      pinyin: 'zhí yè',
      meaning: '職種・仕事',
      writingNote: '中文「职业」= occupation。日文「職業」（同形語）',
    },
    {
      word: '出差',
      pinyin: 'chū chāi',
      meaning: '出張',
      writingNote: '中文「出差」= 日文「出張」（同義）。ビジネス語でよく使う',
    },
    {
      word: '指纹',
      pinyin: 'zhǐ wén',
      meaning: '指紋',
      writingNote: '中日同形語。左右親指同時錄紋是各国入境标配',
    },
    {
      word: '出入境管理局',
      pinyin: 'chū rù jìng guǎn lǐ jú',
      meaning: '出入国管理局',
      writingNote: '中国出入入境管理局负责签证、居留许可等事务',
    },
    {
      word: '延期',
      pinyin: 'yán qī',
      meaning: '延長する',
      writingNote: '中文「延期」= 日文「延期」（同形同義）',
    },
  ],
};
