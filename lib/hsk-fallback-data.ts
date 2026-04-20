// HSK Level Fallback Dialogues - Comprehensive offline data for all levels

export type HSKLevel = 'HSK1-2' | 'HSK3-4' | 'HSK5-6'

export interface KeyVocabulary {
  word: string
  pinyin: string
  meaning: string
  writingNote?: string  // 中日汉字写法区别
  usageNote?: string    // 语感/用法区别
}

export interface DialogueLine {
  speaker: string
  chinese: string
  pinyin: string
  japanese: string
}

export interface FallbackDialogue {
  scene: string
  sceneEmoji: string
  lines: DialogueLine[]
  keyVocabulary: KeyVocabulary[]
}

// HSK 1-2 (初级) - 简单句子，中日同义词多
export const hsk12Dialogues: FallbackDialogue[] = [
  {
    scene: 'コンビニ',
    sceneEmoji: '🏪',
    lines: [
      { speaker: 'A', chinese: '你好！', pinyin: 'Nǐ hǎo!', japanese: 'こんにちは！' },
      { speaker: 'B', chinese: '你好，要什么？', pinyin: 'Nǐ hǎo, yào shénme?', japanese: 'こんにちは、何が要りますか？' },
    ],
    keyVocabulary: [
      { word: '你好', pinyin: 'nǐ hǎo', meaning: 'こんにちは', writingNote: '「你」は日本語の「你」と同じ形ですが、日本語では使いません。', usageNote: '中国語では朝昼夜いつでも使える万能挨拶です。' },
      { word: '什么', pinyin: 'shénme', meaning: '何', writingNote: '「什」は日本語では「じゅう」と読みますが、中国語では「shén」です。', usageNote: '疑問詞として非常によく使います。' },
    ],
  },
  {
    scene: '学校',
    sceneEmoji: '🏫',
    lines: [
      { speaker: 'A', chinese: '你是学生吗？', pinyin: 'Nǐ shì xuéshēng ma?', japanese: 'あなたは学生ですか？' },
      { speaker: 'B', chinese: '是的，我是大学生。', pinyin: 'Shì de, wǒ shì dàxuéshēng.', japanese: 'はい、私は大学生です。' },
    ],
    keyVocabulary: [
      { word: '学生', pinyin: 'xuéshēng', meaning: '学生', writingNote: '日本語と同じ漢字・同じ意味です。', usageNote: '発音は「シュエション」に近いです。' },
      { word: '大学', pinyin: 'dàxué', meaning: '大学', writingNote: '日本語と完全に同じ漢字です。', usageNote: '「大学生」も同様に使えます。' },
    ],
  },
  {
    scene: 'カフェ',
    sceneEmoji: '☕',
    lines: [
      { speaker: 'A', chinese: '我要一杯咖啡。', pinyin: 'Wǒ yào yī bēi kāfēi.', japanese: 'コーヒーを一杯ください。' },
      { speaker: 'B', chinese: '好的，请等一下。', pinyin: 'Hǎo de, qǐng děng yīxià.', japanese: 'はい、少々お待ちください。' },
    ],
    keyVocabulary: [
      { word: '咖啡', pinyin: 'kāfēi', meaning: 'コーヒー', writingNote: '日本語の「珈琲」とは異なる漢字です。', usageNote: '外来語の音訳で、発音が似ています。' },
      { word: '请', pinyin: 'qǐng', meaning: 'どうぞ/ください', writingNote: '日本語の「請」と同じ字ですが、中国語では「お願い」のニュアンスが強いです。', usageNote: '丁寧な依頼に必須の表現です。' },
    ],
  },
  {
    scene: 'レストラン',
    sceneEmoji: '🍜',
    lines: [
      { speaker: 'A', chinese: '这个多少钱？', pinyin: 'Zhège duōshao qián?', japanese: 'これはいくらですか？' },
      { speaker: 'B', chinese: '二十块。', pinyin: 'Èrshí kuài.', japanese: '20元です。' },
    ],
    keyVocabulary: [
      { word: '多少', pinyin: 'duōshao', meaning: 'いくら/どれくらい', writingNote: '「多」「少」は日本語と同じ漢字です。', usageNote: '数量や値段を聞くときに使います。' },
      { word: '钱', pinyin: 'qián', meaning: 'お金', writingNote: '日本語の「銭」とは異なり、「お金」全般を指します。', usageNote: '「块」は口語でよく使う通貨単位です。' },
    ],
  },
  {
    scene: '駅',
    sceneEmoji: '🚉',
    lines: [
      { speaker: 'A', chinese: '地铁站在哪儿？', pinyin: 'Dìtiě zhàn zài nǎr?', japanese: '地下鉄の駅はどこですか？' },
      { speaker: 'B', chinese: '在那边。', pinyin: 'Zài nàbiān.', japanese: 'あちらです。' },
    ],
    keyVocabulary: [
      { word: '地铁', pinyin: 'dìtiě', meaning: '地下鉄', writingNote: '「铁」は日本語の「鉄」の簡体字です。', usageNote: '「地下鉄」は中国語では「地铁」と短く言います。' },
      { word: '哪儿', pinyin: 'nǎr', meaning: 'どこ', writingNote: '「哪」は日本語にない漢字です。', usageNote: '北京では「哪儿」、南方では「哪里」を使います。' },
    ],
  },
]

// HSK 3-4 (中级) - 複雑な文構造、日常会話
export const hsk34Dialogues: FallbackDialogue[] = [
  {
    scene: '会社',
    sceneEmoji: '🏢',
    lines: [
      { speaker: 'A', chinese: '王经理，这份报告我已经准备好了。', pinyin: 'Wáng jīnglǐ, zhè fèn bàogào wǒ yǐjīng zhǔnbèi hǎo le.', japanese: '王マネージャー、この報告書はもう準備できました。' },
      { speaker: 'B', chinese: '很好，放在我桌上吧。下午开会的时候会用到。', pinyin: 'Hěn hǎo, fàng zài wǒ zhuō shang ba. Xiàwǔ kāihuì de shíhou huì yòng dào.', japanese: 'いいね、私の机に置いておいて。午後の会議で使うから。' },
      { speaker: 'A', chinese: '好的，还有什么需要我帮忙的吗？', pinyin: 'Hǎo de, hái yǒu shénme xūyào wǒ bāngmáng de ma?', japanese: 'わかりました。他に何かお手伝いすることはありますか？' },
    ],
    keyVocabulary: [
      { word: '经理', pinyin: 'jīnglǐ', meaning: 'マネージャー', writingNote: '日本語の「経理」は会計担当ですが、中国語では管理職を指します。', usageNote: '部長クラスの役職によく使います。' },
      { word: '报告', pinyin: 'bàogào', meaning: '報告/レポート', writingNote: '日本語と同じ漢字ですが、発音が異なります。', usageNote: 'ビジネスシーンで頻繁に使用します。' },
    ],
  },
  {
    scene: '病院',
    sceneEmoji: '🏥',
    lines: [
      { speaker: 'A', chinese: '医生，我最近经常头疼，晚上也睡不好。', pinyin: 'Yīshēng, wǒ zuìjìn jīngcháng tóu téng, wǎnshang yě shuì bù hǎo.', japanese: '先生、最近よく頭痛がして、夜もよく眠れません。' },
      { speaker: 'B', chinese: '你工作压力大吗？有没有按时吃饭？', pinyin: 'Nǐ gōngzuò yālì dà ma? Yǒu méiyǒu ànshí chīfàn?', japanese: '仕事のストレスは大きいですか？ちゃんと食事していますか？' },
      { speaker: 'A', chinese: '确实最近工作很忙，经常加班。', pinyin: 'Quèshí zuìjìn gōngzuò hěn máng, jīngcháng jiābān.', japanese: '確かに最近仕事が忙しくて、よく残業しています。' },
    ],
    keyVocabulary: [
      { word: '压力', pinyin: 'yālì', meaning: 'プレッシャー/ストレス', writingNote: '「压」は日本語の「圧」の簡体字です。', usageNote: '精神的・肉体的な負担の両方に使えます。' },
      { word: '加班', pinyin: 'jiābān', meaning: '残業する', writingNote: '日本語の「加班」は存在しません。', usageNote: '「残業」は中国語では「加班」と言います。意味の差に注意！' },
    ],
  },
  {
    scene: '銀行',
    sceneEmoji: '🏦',
    lines: [
      { speaker: 'A', chinese: '你好，我想开一个银行账户。', pinyin: 'Nǐ hǎo, wǒ xiǎng kāi yīgè yínháng zhànghù.', japanese: 'こんにちは、銀行口座を開設したいのですが。' },
      { speaker: 'B', chinese: '请出示您的身份证和手机号码。', pinyin: 'Qǐng chūshì nín de shēnfènzhèng hé shǒujī hàomǎ.', japanese: '身分証明書と携帯番号をお見せください。' },
      { speaker: 'A', chinese: '这是我的护照，可以吗？', pinyin: 'Zhè shì wǒ de hùzhào, kěyǐ ma?', japanese: 'これは私のパスポートですが、大丈夫ですか？' },
    ],
    keyVocabulary: [
      { word: '身份证', pinyin: 'shēnfènzhèng', meaning: '身分証明書', writingNote: '「证」は日本語の「証」の簡体字です。', usageNote: '中国では最も重要な本人確認書類です。' },
      { word: '手机', pinyin: 'shǒujī', meaning: '携帯電話', writingNote: '日本語には「手機」という言葉はありません。', usageNote: '「携帯電話」は中国語で「手机」、「スマホ」は「智能手机」です。' },
    ],
  },
  {
    scene: 'ホテル',
    sceneEmoji: '🏨',
    lines: [
      { speaker: 'A', chinese: '请问房间里有免费的Wi-Fi吗？', pinyin: 'Qǐngwèn fángjiān lǐ yǒu miǎnfèi de Wi-Fi ma?', japanese: 'お部屋に無料のWi-Fiはありますか？' },
      { speaker: 'B', chinese: '有的，密码在房卡上面。退房时间是中午十二点。', pinyin: 'Yǒu de, mìmǎ zài fángkǎ shàngmiàn. Tuìfáng shíjiān shì zhōngwǔ shí\'èr diǎn.', japanese: 'はい、パスワードはルームキーに書いてあります。チェックアウトは正午12時です。' },
    ],
    keyVocabulary: [
      { word: '免费', pinyin: 'miǎnfèi', meaning: '無料', writingNote: '「免費」と書きますが、日本語の「無料」とは漢字が異なります。', usageNote: '「免费的」で「無料の」という形容詞になります。' },
      { word: '退房', pinyin: 'tuìfáng', meaning: 'チェックアウト', writingNote: '日本語にはこの表現はありません。', usageNote: 'ホテルでの「退房」は「部屋を出る」という意味です。' },
    ],
  },
  {
    scene: 'デパート',
    sceneEmoji: '🛍️',
    lines: [
      { speaker: 'A', chinese: '这件衣服能不能便宜一点？', pinyin: 'Zhè jiàn yīfu néng bù néng piányi yīdiǎn?', japanese: 'この服、もう少し安くなりませんか？' },
      { speaker: 'B', chinese: '这已经是最低价了，不过如果您办会员卡，可以打九折。', pinyin: 'Zhè yǐjīng shì zuìdī jià le, búguò rúguǒ nín bàn huìyuánkǎ, kěyǐ dǎ jiǔ zhé.', japanese: 'これがもう最安値ですが、会員カードを作れば10%オフになります。' },
    ],
    keyVocabulary: [
      { word: '便宜', pinyin: 'piányi', meaning: '安い', writingNote: '日本語の「便宜」(べんぎ)は「都合の良い」という意味ですが、中国語では「安い」を意味します。', usageNote: '値切るときによく使う表現です。' },
      { word: '打折', pinyin: 'dǎ zhé', meaning: '割引する', writingNote: '「打九折」は「9割の値段にする」＝「10%オフ」です。', usageNote: '日本と計算方法が逆なので注意！' },
    ],
  },
]

// HSK 5-6 (高级) - 成語、敬語、委婉表現
export const hsk56Dialogues: FallbackDialogue[] = [
  {
    scene: '商談',
    sceneEmoji: '💼',
    lines: [
      { speaker: 'A', chinese: '感谢贵公司百忙之中抽出时间来洽谈合作事宜。', pinyin: 'Gǎnxiè guì gōngsī bǎimáng zhī zhōng chōuchū shíjiān lái qiàtán hézuò shìyí.', japanese: 'お忙しい中、提携に関するご相談のお時間をいただき、誠にありがとうございます。' },
      { speaker: 'B', chinese: '哪里哪里，我们也非常期待这次合作能够实现双赢。', pinyin: 'Nǎlǐ nǎlǐ, wǒmen yě fēicháng qīdài zhè cì hézuò nénggòu shíxiàn shuāngyíng.', japanese: 'いえいえ、私どもも今回の提携がWin-Winになることを期待しております。' },
      { speaker: 'A', chinese: '不过，关于付款方式，恐怕我们还需要再商量商量。', pinyin: 'Búguò, guānyú fùkuǎn fāngshì, kǒngpà wǒmen hái xūyào zài shāngliang shāngliang.', japanese: 'ただ、支払い方法については、もう少し協議が必要かと存じます。' },
    ],
    keyVocabulary: [
      { word: '百忙之中', pinyin: 'bǎimáng zhī zhōng', meaning: 'お忙しい中', writingNote: '日本語の「ご多忙中」に相当する敬語表現です。', usageNote: 'ビジネスの冒頭挨拶で使う定型表現です。' },
      { word: '双赢', pinyin: 'shuāngyíng', meaning: 'Win-Win', writingNote: '「双」は日本語の「双」と同じ、「赢」は「勝つ」の意味です。', usageNote: 'ビジネスシーンで双方に利益があることを表します。' },
    ],
  },
  {
    scene: '面接',
    sceneEmoji: '👔',
    lines: [
      { speaker: 'A', chinese: '请问您对我们公司有什么了解？', pinyin: 'Qǐngwèn nín duì wǒmen gōngsī yǒu shénme liǎojiě?', japanese: '弊社についてどのようなことをご存知ですか？' },
      { speaker: 'B', chinese: '据我所知，贵公司在行业内颇有口碑，尤其在创新研发方面一直走在前列。', pinyin: 'Jù wǒ suǒ zhī, guì gōngsī zài hángyè nèi pō yǒu kǒubēi, yóuqí zài chuàngxīn yánfā fāngmiàn yīzhí zǒu zài qiánliè.', japanese: '私の知る限り、御社は業界で非常に評判が高く、特にイノベーションと研究開発では常に先頭を走っていらっしゃいます。' },
      { speaker: 'A', chinese: '不错，那您觉得自己能为公司带来什么价值呢？', pinyin: 'Búcuò, nà nín juéde zìjǐ néng wèi gōngsī dàilái shénme jiàzhí ne?', japanese: 'なるほど。では、ご自身が会社にどのような価値をもたらせるとお考えですか？' },
    ],
    keyVocabulary: [
      { word: '口碑', pinyin: 'kǒubēi', meaning: '評判/口コミ', writingNote: '「碑」は日本語の「碑」と同じで、「口碑」は口伝えの評判を指します。', usageNote: '「口碑很好」で「評判がいい」という意味です。' },
      { word: '据我所知', pinyin: 'jù wǒ suǒ zhī', meaning: '私の知る限り', writingNote: '「据」は日本語の「拠」の簡体字です。', usageNote: '丁寧に前置きする定型表現です。' },
    ],
  },
  {
    scene: '謝罪',
    sceneEmoji: '🙇',
    lines: [
      { speaker: 'A', chinese: '关于这次的失误，我们深感抱歉，给您添麻烦了。', pinyin: 'Guānyú zhè cì de shīwù, wǒmen shēn gǎn bàoqiàn, gěi nín tiān máfan le.', japanese: '今回のミスについて、深くお詫び申し上げます。ご迷惑をおかけしました。' },
      { speaker: 'B', chinese: '既然事情已经发生了，关键是如何补救。希望贵方能拿出一个切实可行的解决方案。', pinyin: 'Jìrán shìqing yǐjīng fāshēng le, guānjiàn shì rúhé bǔjiù. Xīwàng guì fāng néng náchū yīgè qièshí kěxíng de jiějué fāng\'àn.', japanese: '起きてしまったことは仕方ありません。重要なのはどう挽回するかです。実現可能な解決策をご提示いただければと思います。' },
      { speaker: 'A', chinese: '我们一定会竭尽全力，争取在最短时间内解决问题。', pinyin: 'Wǒmen yīdìng huì jiéjìn quánlì, zhēngqǔ zài zuì duǎn shíjiān nèi jiějué wèntí.', japanese: '必ず全力を尽くし、できる限り短期間で問題を解決いたします。' },
    ],
    keyVocabulary: [
      { word: '深感抱歉', pinyin: 'shēn gǎn bàoqiàn', meaning: '深くお詫びする', writingNote: '「深感」+「抱歉」で非常に丁寧な謝罪表現になります。', usageNote: 'ビジネスでの重大なミスの謝罪に使います。' },
      { word: '竭尽全力', pinyin: 'jiéjìn quánlì', meaning: '全力を尽くす', writingNote: '「竭」は「尽きる」、四字熟語として使われます。', usageNote: '決意を示す力強い表現です。' },
    ],
  },
  {
    scene: '会食',
    sceneEmoji: '🍷',
    lines: [
      { speaker: 'A', chinese: '张总，敬您一杯，祝咱们合作愉快！', pinyin: 'Zhāng zǒng, jìng nín yī bēi, zhù zánmen hézuò yúkuài!', japanese: '張社長、一杯お注ぎします。私たちの協力が順調でありますように！' },
      { speaker: 'B', chinese: '承蒙关照，我先干为敬！', pinyin: 'Chéngméng guānzhào, wǒ xiān gān wéi jìng!', japanese: 'お世話になっております。まず私から乾杯させていただきます！' },
      { speaker: 'A', chinese: '您太客气了，能跟您合作是我们的荣幸。', pinyin: 'Nín tài kèqi le, néng gēn nín hézuò shì wǒmen de róngxìng.', japanese: 'ご謙遜を。あなたと協力できることは私たちの光栄です。' },
    ],
    keyVocabulary: [
      { word: '敬您一杯', pinyin: 'jìng nín yī bēi', meaning: '一杯お注ぎします', writingNote: '「敬」は「敬う」の意味で、乾杯の挨拶に使います。', usageNote: '中国の宴会文化では重要な礼儀表現です。' },
      { word: '先干为敬', pinyin: 'xiān gān wéi jìng', meaning: 'まず私から飲み干します', writingNote: '「干」は「飲み干す」、「敬」は「敬意を表す」の意味です。', usageNote: '相手への敬意を示す乾杯の定型句です。' },
    ],
  },
  {
    scene: '断り',
    sceneEmoji: '😅',
    lines: [
      { speaker: 'A', chinese: '这次的方案我们研究了很久，觉得还是有些不太成熟的地方。', pinyin: 'Zhè cì de fāng\'àn wǒmen yánjiū le hěn jiǔ, juéde háishi yǒuxiē bú tài chéngshú de dìfang.', japanese: '今回のプランは長い間検討しましたが、まだ成熟していない部分があるように感じます。' },
      { speaker: 'B', chinese: '理解，那不知道贵方有什么具体的建议或者修改意见？', pinyin: 'Lǐjiě, nà bù zhīdào guì fāng yǒu shénme jùtǐ de jiànyì huòzhě xiūgǎi yìjiàn?', japanese: '承知しました。具体的なご提案や修正のご意見はございますか？' },
      { speaker: 'A', chinese: '我们希望能重新评估一下预算部分，看看是否有优化的空间。', pinyin: 'Wǒmen xīwàng néng chóngxīn pínggū yīxià yùsuàn bùfèn, kànkan shìfǒu yǒu yōuhuà de kōngjiān.', japanese: '予算部分を再評価し、最適化の余地があるかどうか確認したいと考えております。' },
    ],
    keyVocabulary: [
      { word: '不太成熟', pinyin: 'bú tài chéngshú', meaning: 'あまり成熟していない', writingNote: '「成熟」は日本語と同じ漢字です。', usageNote: '直接「ダメ」と言わない婉曲な拒否表現です。' },
      { word: '优化', pinyin: 'yōuhuà', meaning: '最適化する', writingNote: '「优」は日本語の「優」の簡体字です。', usageNote: 'ビジネスで「改善」「最適化」を意味します。' },
    ],
  },
]

// Helper function to get dialogues by HSK level
export function getDialoguesByLevel(level: HSKLevel): FallbackDialogue[] {
  switch (level) {
    case 'HSK1-2':
      return hsk12Dialogues
    case 'HSK3-4':
      return hsk34Dialogues
    case 'HSK5-6':
      return hsk56Dialogues
    default:
      return hsk12Dialogues
  }
}

// Get a random dialogue for a specific level
export function getRandomDialogue(level: HSKLevel): FallbackDialogue {
  const dialogues = getDialoguesByLevel(level)
  return dialogues[Math.floor(Math.random() * dialogues.length)]
}
