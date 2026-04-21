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
      { speaker: 'A', chinese: '你好！', pinyin: 'Nǐ hǎ o !', japanese: 'こんにちは！' },
      { speaker: 'B', chinese: '你好，要什么？', pinyin: 'Nǐ hǎ o , yà o shé nme ?', japanese: 'こんにちは、何が要りますか？' },
    ],
    keyVocabulary: [
      { word: '你好', pinyin: 'nǐ hǎ o', meaning: 'こんにちは', writingNote: '「你」は日本語の「你」と同じ形ですが、日本語では使いません。', usageNote: '中国語では朝昼夜いつでも使える万能挨拶です。' },
      { word: '什么', pinyin: 'shé nme', meaning: '何', writingNote: '「什」は日本語では「じゅう」と読みますが、中国語では「shén」です。', usageNote: '疑問詞として非常によく使います。' },
    ],
  },
  {
    scene: '学校',
    sceneEmoji: '🏫',
    lines: [
      { speaker: 'A', chinese: '你是学生吗？', pinyin: 'Nǐ shì xué shē ng ma ?', japanese: 'あなたは学生ですか？' },
      { speaker: 'B', chinese: '是的，我是大学生。', pinyin: 'Shì de , wǒ shì dà xué shē ng .', japanese: 'はい、私は大学生です。' },
    ],
    keyVocabulary: [
      { word: '学生', pinyin: 'xué shē ng', meaning: '学生', writingNote: '日本語と同じ漢字・同じ意味です。', usageNote: '発音は「シュエション」に近いです。' },
      { word: '大学', pinyin: 'dà xué', meaning: '大学', writingNote: '日本語と完全に同じ漢字です。', usageNote: '「大学生」も同様に使えます。' },
    ],
  },
  {
    scene: 'カフェ',
    sceneEmoji: '☕',
    lines: [
      { speaker: 'A', chinese: '我要一杯咖啡。', pinyin: 'Wǒ yà o yī bē i kā fē i .', japanese: 'コーヒーを一杯ください。' },
      { speaker: 'B', chinese: '好的，请等一下。', pinyin: 'Hǎ o de , qǐ ng dě ng yī xià.', japanese: 'はい、少々お待ちください。' },
    ],
    keyVocabulary: [
      { word: '咖啡', pinyin: 'kā fē i', meaning: 'コーヒー', writingNote: '日本語の「珈琲」とは異なる漢字です。', usageNote: '外来語の音訳で、発音が似ています。' },
      { word: '请', pinyin: 'qǐ ng', meaning: 'どうぞ/ください', writingNote: '日本語の「請」と同じ字ですが、中国語では「お願い」のニュアンスが強いです。', usageNote: '丁寧な依頼に必須の表現です。' },
    ],
  },
  {
    scene: 'レストラン',
    sceneEmoji: '🍜',
    lines: [
      { speaker: 'A', chinese: '这个多少钱？', pinyin: 'Zhè ge duō shao qiá n ?', japanese: 'これはいくらですか？' },
      { speaker: 'B', chinese: '二十块。', pinyin: 'Èrshí kuà i .', japanese: '20元です。' },
    ],
    keyVocabulary: [
      { word: '多少', pinyin: 'duō shao', meaning: 'いくら/どれくらい', writingNote: '「多」「少」は日本語と同じ漢字です。', usageNote: '数量や値段を聞くときに使います。' },
      { word: '钱', pinyin: 'qiá n', meaning: 'お金', writingNote: '日本語の「銭」とは異なり、「お金」全般を指します。', usageNote: '「块」は口語でよく使う通貨単位です。' },
    ],
  },
  {
    scene: '駅',
    sceneEmoji: '🚉',
    lines: [
      { speaker: 'A', chinese: '地铁站在哪儿？', pinyin: 'Dì tiě zhà n zà i nǎ r ?', japanese: '地下鉄の駅はどこですか？' },
      { speaker: 'B', chinese: '在那边。', pinyin: 'Zà i nà biā n .', japanese: 'あちらです。' },
    ],
    keyVocabulary: [
      { word: '地铁', pinyin: 'dì tiě', meaning: '地下鉄', writingNote: '「铁」は日本語の「鉄」の簡体字です。', usageNote: '「地下鉄」は中国語では「地铁」と短く言います。' },
      { word: '哪儿', pinyin: 'nǎ r', meaning: 'どこ', writingNote: '「哪」は日本語にない漢字です。', usageNote: '北京では「哪儿」、南方では「哪里」を使います。' },
    ],
  },
]

// HSK 3-4 (中级) - 複雑な文構造、日常会話
export const hsk34Dialogues: FallbackDialogue[] = [
  {
    scene: '会社',
    sceneEmoji: '🏢',
    lines: [
      { speaker: 'A', chinese: '王经理，这份报告我已经准备好了。', pinyin: 'Wá ng jī nglǐ, zhè fè n bà ogà o wǒ yǐ jī ng zhǔ nbè i hǎ o le .', japanese: '王マネージャー、この報告書はもう準備できました。' },
      { speaker: 'B', chinese: '很好，放在我桌上吧。下午开会的时候会用到。', pinyin: 'Hě n hǎ o , fà ng zà i wǒ zhuō shang ba . Xià wǔ kā ihuì de shí hou huì yò ng dà o .', japanese: 'いいね、私の机に置いておいて。午後の会議で使うから。' },
      { speaker: 'A', chinese: '好的，还有什么需要我帮忙的吗？', pinyin: 'Hǎ o de , há i yǒ u shé nme xū yà o wǒ bā ngmá ng de ma ?', japanese: 'わかりました。他に何かお手伝いすることはありますか？' },
    ],
    keyVocabulary: [
      { word: '经理', pinyin: 'jī nglǐ', meaning: 'マネージャー', writingNote: '日本語の「経理」は会計担当ですが、中国語では管理職を指します。', usageNote: '部長クラスの役職によく使います。' },
      { word: '报告', pinyin: 'bà ogà o', meaning: '報告/レポート', writingNote: '日本語と同じ漢字ですが、発音が異なります。', usageNote: 'ビジネスシーンで頻繁に使用します。' },
    ],
  },
  {
    scene: '病院',
    sceneEmoji: '🏥',
    lines: [
      { speaker: 'A', chinese: '医生，我最近经常头疼，晚上也睡不好。', pinyin: 'Yī shē ng , wǒ zuì jì n jī ngchá ng tó u té ng , wǎ nshang yě shuì bù hǎ o .', japanese: '先生、最近よく頭痛がして、夜もよく眠れません。' },
      { speaker: 'B', chinese: '你工作压力大吗？有没有按时吃饭？', pinyin: 'Nǐ gō ngzuò yā lì dà ma ? Yǒ u mé iyǒ u à nshí chī fà n ?', japanese: '仕事のストレスは大きいですか？ちゃんと食事していますか？' },
      { speaker: 'A', chinese: '确实最近工作很忙，经常加班。', pinyin: 'Què shí zuì jì n gō ngzuò hě n má ng , jī ngchá ng jiā bā n .', japanese: '確かに最近仕事が忙しくて、よく残業しています。' },
    ],
    keyVocabulary: [
      { word: '压力', pinyin: 'yā lì', meaning: 'プレッシャー/ストレス', writingNote: '「压」は日本語の「圧」の簡体字です。', usageNote: '精神的・肉体的な負担の両方に使えます。' },
      { word: '加班', pinyin: 'jiā bā n', meaning: '残業する', writingNote: '日本語の「加班」は存在しません。', usageNote: '「残業」は中国語では「加班」と言います。意味の差に注意！' },
    ],
  },
  {
    scene: '銀行',
    sceneEmoji: '🏦',
    lines: [
      { speaker: 'A', chinese: '你好，我想开一个银行账户。', pinyin: 'Nǐ hǎ o , wǒ xiǎ ng kā i yī gè yí nhá ng zhà nghù.', japanese: 'こんにちは、銀行口座を開設したいのですが。' },
      { speaker: 'B', chinese: '请出示您的身份证和手机号码。', pinyin: 'Qǐ ng chū shì ní n de shē nfè nzhè ng hé shǒ ujī hà omǎ.', japanese: '身分証明書と携帯番号をお見せください。' },
      { speaker: 'A', chinese: '这是我的护照，可以吗？', pinyin: 'Zhè shì wǒ de hù zhà o , kě yǐ ma ?', japanese: 'これは私のパスポートですが、大丈夫ですか？' },
    ],
    keyVocabulary: [
      { word: '身份证', pinyin: 'shē nfè nzhè ng', meaning: '身分証明書', writingNote: '「证」は日本語の「証」の簡体字です。', usageNote: '中国では最も重要な本人確認書類です。' },
      { word: '手机', pinyin: 'shǒ ujī', meaning: '携帯電話', writingNote: '日本語には「手機」という言葉はありません。', usageNote: '「携帯電話」は中国語で「手机」、「スマホ」は「智能手机」です。' },
    ],
  },
  {
    scene: 'ホテル',
    sceneEmoji: '🏨',
    lines: [
      { speaker: 'A', chinese: '请问房间里有免费的Wi-Fi吗？', pinyin: 'Qǐ ngwè n fá ngjiā n lǐ yǒ u miǎ nfè i de Wi-Fi ma ?', japanese: 'お部屋に無料のWi-Fiはありますか？' },
      { speaker: 'B', chinese: '有的，密码在房卡上面。退房时间是中午十二点。', pinyin: 'Yǒ u de , mì mǎ zà i fá ngkǎ shà ngmià n . Tuì fá ng shí jiā n shì zhō ngwǔ shí è r diǎ n .', japanese: 'はい、パスワードはルームキーに書いてあります。チェックアウトは正午12時です。' },
    ],
    keyVocabulary: [
      { word: '免费', pinyin: 'miǎ nfè i', meaning: '無料', writingNote: '「免費」と書きますが、日本語の「無料」とは漢字が異なります。', usageNote: '「免费的」で「無料の」という形容詞になります。' },
      { word: '退房', pinyin: 'tuì fá ng', meaning: 'チェックアウト', writingNote: '日本語にはこの表現はありません。', usageNote: 'ホテルでの「退房」は「部屋を出る」という意味です。' },
    ],
  },
  {
    scene: 'デパート',
    sceneEmoji: '🛍️',
    lines: [
      { speaker: 'A', chinese: '这件衣服能不能便宜一点？', pinyin: 'Zhè jià n yī fu né ng bù né ng piá nyi yī diǎ n ?', japanese: 'この服、もう少し安くなりませんか？' },
      { speaker: 'B', chinese: '这已经是最低价了，不过如果您办会员卡，可以打九折。', pinyin: 'Zhè yǐ jī ng shì zuì dī jià le , bú guò rú guǒ ní n bà n huì yuá nkǎ, kě yǐ dǎ jiǔ zhé.', japanese: 'これがもう最安値ですが、会員カードを作れば10%オフになります。' },
    ],
    keyVocabulary: [
      { word: '便宜', pinyin: 'piá nyi', meaning: '安い', writingNote: '日本語の「便宜」(べんぎ)は「都合の良い」という意味ですが、中国語では「安い」を意味します。', usageNote: '値切るときによく使う表現です。' },
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
      { speaker: 'A', chinese: '感谢贵公司百忙之中抽出时间来洽谈合作事宜。', pinyin: 'Gǎ nxiè guì gō ngsī bǎ imá ng zhī zhō ng chō uchū shí jiā n lá i qià tá n hé zuò shì yí.', japanese: 'お忙しい中、提携に関するご相談のお時間をいただき、誠にありがとうございます。' },
      { speaker: 'B', chinese: '哪里哪里，我们也非常期待这次合作能够实现双赢。', pinyin: 'Nǎ lǐ nǎ lǐ, wǒ me n yě fē ichá ng qī dà i zhè cì hé zuò né nggò u shí xià n shuā ngyí ng .', japanese: 'いえいえ、私どもも今回の提携がWin-Winになることを期待しております。' },
      { speaker: 'A', chinese: '不过，关于付款方式，恐怕我们还需要再商量商量。', pinyin: 'Bú guò, guā nyú fù kuǎ n fā ngshì, kǒ ngpà wǒ me n há i xū yà o zà i shā ngliang shā ngliang .', japanese: 'ただ、支払い方法については、もう少し協議が必要かと存じます。' },
    ],
    keyVocabulary: [
      { word: '百忙之中', pinyin: 'bǎ imá ng zhī zhō ng', meaning: 'お忙しい中', writingNote: '日本語の「ご多忙中」に相当する敬語表現です。', usageNote: 'ビジネスの冒頭挨拶で使う定型表現です。' },
      { word: '双赢', pinyin: 'shuā ngyí ng', meaning: 'Win-Win', writingNote: '「双」は日本語の「双」と同じ、「赢」は「勝つ」の意味です。', usageNote: 'ビジネスシーンで双方に利益があることを表します。' },
    ],
  },
  {
    scene: '面接',
    sceneEmoji: '👔',
    lines: [
      { speaker: 'A', chinese: '请问您对我们公司有什么了解？', pinyin: 'Qǐ ngwè n ní n duì wǒ me n gō ngsī yǒ u shé nme liǎ ojiě?', japanese: '弊社についてどのようなことをご存知ですか？' },
      { speaker: 'B', chinese: '据我所知，贵公司在行业内颇有口碑，尤其在创新研发方面一直走在前列。', pinyin: 'Jù wǒ suǒ zhī, guì gō ngsī zà i há ngyè nè i pō yǒ u kǒ ubē i , yó uqí zà i chuà ngxī n yá nfā fā ngmià n yī zhí zǒ u zà i qiá nliè.', japanese: '私の知る限り、御社は業界で非常に評判が高く、特にイノベーションと研究開発では常に先頭を走っていらっしゃいます。' },
      { speaker: 'A', chinese: '不错，那您觉得自己能为公司带来什么价值呢？', pinyin: 'Bú cuò, nà ní n jué de zì jǐ né ng wè i gō ngsī dà ilá i shé nme jià zhí ne ?', japanese: 'なるほど。では、ご自身が会社にどのような価値をもたらせるとお考えですか？' },
    ],
    keyVocabulary: [
      { word: '口碑', pinyin: 'kǒ ubē i', meaning: '評判/口コミ', writingNote: '「碑」は日本語の「碑」と同じで、「口碑」は口伝えの評判を指します。', usageNote: '「口碑很好」で「評判がいい」という意味です。' },
      { word: '据我所知', pinyin: 'jù wǒ suǒ zhī', meaning: '私の知る限り', writingNote: '「据」は日本語の「拠」の簡体字です。', usageNote: '丁寧に前置きする定型表現です。' },
    ],
  },
  {
    scene: '謝罪',
    sceneEmoji: '🙇',
    lines: [
      { speaker: 'A', chinese: '关于这次的失误，我们深感抱歉，给您添麻烦了。', pinyin: 'Guā nyú zhè cì de shī wù, wǒ me n shē n gǎ n bà oqià n , gě i ní n tiā n má fan le .', japanese: '今回のミスについて、深くお詫び申し上げます。ご迷惑をおかけしました。' },
      { speaker: 'B', chinese: '既然事情已经发生了，关键是如何补救。希望贵方能拿出一个切实可行的解决方案。', pinyin: 'Jì rá n shì qing yǐ jī ng fā shē ng le , guā njià n shì rú hé bǔ jiù. Xī wà ng guì fā ng né ng ná chū yī gè qiè shí kě xí ng de jiě jué fā ng à n .', japanese: '起きてしまったことは仕方ありません。重要なのはどう挽回するかです。実現可能な解決策をご提示いただければと思います。' },
      { speaker: 'A', chinese: '我们一定会竭尽全力，争取在最短时间内解决问题。', pinyin: 'Wǒ me n yī dì ng huì jié jì n quá nlì, zhē ngqǔ zà i zuì duǎ n shí jiā n nè i jiě jué wè ntí.', japanese: '必ず全力を尽くし、できる限り短期間で問題を解決いたします。' },
    ],
    keyVocabulary: [
      { word: '深感抱歉', pinyin: 'shē n gǎ n bà oqià n', meaning: '深くお詫びする', writingNote: '「深感」+「抱歉」で非常に丁寧な謝罪表現になります。', usageNote: 'ビジネスでの重大なミスの謝罪に使います。' },
      { word: '竭尽全力', pinyin: 'jié jì n quá nlì', meaning: '全力を尽くす', writingNote: '「竭」は「尽きる」、四字熟語として使われます。', usageNote: '決意を示す力強い表現です。' },
    ],
  },
  {
    scene: '会食',
    sceneEmoji: '🍷',
    lines: [
      { speaker: 'A', chinese: '张总，敬您一杯，祝咱们合作愉快！', pinyin: 'Zhā ng zǒ ng , jì ng ní n yī bē i , zhù zá nme n hé zuò yú kuà i !', japanese: '張社長、一杯お注ぎします。私たちの協力が順調でありますように！' },
      { speaker: 'B', chinese: '承蒙关照，我先干为敬！', pinyin: 'Ché ngmé ng guā nzhà o , wǒ xiā n gā n wé i jì ng !', japanese: 'お世話になっております。まず私から乾杯させていただきます！' },
      { speaker: 'A', chinese: '您太客气了，能跟您合作是我们的荣幸。', pinyin: 'Ní n tà i kè qi le , né ng gē n ní n hé zuò shì wǒ me n de ró ngxì ng .', japanese: 'ご謙遜を。あなたと協力できることは私たちの光栄です。' },
    ],
    keyVocabulary: [
      { word: '敬您一杯', pinyin: 'jì ng ní n yī bē i', meaning: '一杯お注ぎします', writingNote: '「敬」は「敬う」の意味で、乾杯の挨拶に使います。', usageNote: '中国の宴会文化では重要な礼儀表現です。' },
      { word: '先干为敬', pinyin: 'xiā n gā n wé i jì ng', meaning: 'まず私から飲み干します', writingNote: '「干」は「飲み干す」、「敬」は「敬意を表す」の意味です。', usageNote: '相手への敬意を示す乾杯の定型句です。' },
    ],
  },
  {
    scene: '断り',
    sceneEmoji: '😅',
    lines: [
      { speaker: 'A', chinese: '这次的方案我们研究了很久，觉得还是有些不太成熟的地方。', pinyin: 'Zhè cì de fā ng à n wǒ me n yá njiū le hě n jiǔ, jué de há ishi yǒ uxiē bú tà i ché ngshú de dì fang .', japanese: '今回のプランは長い間検討しましたが、まだ成熟していない部分があるように感じます。' },
      { speaker: 'B', chinese: '理解，那不知道贵方有什么具体的建议或者修改意见？', pinyin: 'Lǐ jiě, nà bù zhī dà o guì fā ng yǒ u shé nme jù tǐ de jià nyì huò zhě xiū gǎ i yì jià n ?', japanese: '承知しました。具体的なご提案や修正のご意見はございますか？' },
      { speaker: 'A', chinese: '我们希望能重新评估一下预算部分，看看是否有优化的空间。', pinyin: 'Wǒ me n xī wà ng né ng chó ngxī n pí nggū yī xià yù suà n bù fè n , kà nkan shì fǒ u yǒ u yō uhuà de kō ngjiā n .', japanese: '予算部分を再評価し、最適化の余地があるかどうか確認したいと考えております。' },
    ],
    keyVocabulary: [
      { word: '不太成熟', pinyin: 'bú tà i ché ngshú', meaning: 'あまり成熟していない', writingNote: '「成熟」は日本語と同じ漢字です。', usageNote: '直接「ダメ」と言わない婉曲な拒否表現です。' },
      { word: '优化', pinyin: 'yō uhuà', meaning: '最適化する', writingNote: '「优」は日本語の「優」の簡体字です。', usageNote: 'ビジネスで「改善」「最適化」を意味します。' },
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
  const dialogues = getDialoguesByLevel(level); // 确保拿到了对应等级的数组
  // 核心：使用 Math.random() 随机抽取
  const randomIndex = Math.floor(Math.random() * dialogues.length);
  return dialogues[randomIndex];
}
