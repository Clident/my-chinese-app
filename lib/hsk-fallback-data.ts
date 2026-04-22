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

  {
    scene: '果物屋',
    sceneEmoji: '🍎',
    lines: [
      { speaker: 'A', chinese: '苹果多少钱一斤？', pinyin: 'Pí ng guǒ duō shao qiá n yì jī n ?', japanese: 'りんごは一斤いくらですか？' },
      { speaker: 'B', chinese: '五块钱一斤。', pinyin: 'Wǔ kuà i qiá n yì jī n .', japanese: '一斤5元です。' },
      { speaker: 'A', chinese: '太贵了，能便宜点吗？', pinyin: 'Tà i guì le , né ng piá nyi diǎ n ma ?', japanese: '高すぎます。もう少し安くなりませんか？' },
      { speaker: 'B', chinese: '那就四块吧。', pinyin: 'Nà jiù sì kuà i ba .', japanese: 'じゃあ4元でいいですよ。' },
    ],
    keyVocabulary: [
      { word: '斤', pinyin: 'jī n', meaning: '斤（500g）', usageNote: '中国の重量単位。市場でよく使う。' },
      { word: '贵', pinyin: 'guì', meaning: '高い', writingNote: '日本語の「貴」と同じ漢字。' },
    ],
  },
  {
    scene: '道案内',
    sceneEmoji: '🗺️',
    lines: [
      { speaker: 'A', chinese: '请问，洗手间在哪儿？', pinyin: 'Qǐ ngwè n , xǐ shǒ ujiā n zà i nǎ r ?', japanese: 'すみません、トイレはどこですか？' },
      { speaker: 'B', chinese: '往前走，左边。', pinyin: 'Wǎ ng qiá n zǒ u , zuǒ biā n .', japanese: 'まっすぐ行って、左側です。' },
      { speaker: 'A', chinese: '谢谢！', pinyin: 'Xiè xie !', japanese: 'ありがとう！' },
    ],
    keyVocabulary: [
      { word: '洗手间', pinyin: 'xǐ shǒ ujiā n', meaning: 'トイレ', writingNote: '「洗」「手」「間」。丁寧な言い方。' },
      { word: '往前', pinyin: 'wǎ ng qiá n', meaning: '前に', usageNote: '方向を表す。「往」+ 方向。' },
    ],
  },
  {
    scene: '天気',
    sceneEmoji: '🌤️',
    lines: [
      { speaker: 'A', chinese: '今天天气怎么样？', pinyin: 'Jī n tiā n tiā n qì zě nme yà ng ?', japanese: '今日の天気はどうですか？' },
      { speaker: 'B', chinese: '下雨了，有点冷。', pinyin: 'Xià yǔ le , yǒ u diǎ n lě ng .', japanese: '雨が降って、ちょっと寒いです。' },
      { speaker: 'A', chinese: '那就别出去了。', pinyin: 'Nà jiù bié chū qù le .', japanese: 'じゃあ出かけない方がいいね。' },
    ],
    keyVocabulary: [
      { word: '天气', pinyin: 'tiā n qì', meaning: '天気', writingNote: '日本語と同じ漢字。' },
      { word: '下雨', pinyin: 'xià yǔ', meaning: '雨が降る', usageNote: '「下」+「雨」で動詞句になる。' },
    ],
  },
  {
    scene: 'タクシー',
    sceneEmoji: '🚕',
    lines: [
      { speaker: 'A', chinese: '师傅，去火车站多少钱？', pinyin: 'Shī fu , qù huǒ chē zhà n duō shao qiá n ?', japanese: '運転手さん、駅までいくらですか？' },
      { speaker: 'B', chinese: '大概三十块。', pinyin: 'Dà gā i sā nshí kuà i .', japanese: 'たぶん30元ぐらいです。' },
      { speaker: 'A', chinese: '好的，走吧。', pinyin: 'Hǎ o de , zǒ u ba .', japanese: 'はい、行きましょう。' },
    ],
    keyVocabulary: [
      { word: '师傅', pinyin: 'shī fu', meaning: '親方/運転手さん', usageNote: 'タクシーで運転手を呼ぶ時の敬称。' },
      { word: '火车站', pinyin: 'huǒ chē zhà n', meaning: '駅', writingNote: '日本語の「駅」は中国語では「站」と言う。' },
    ],
  },
  {
    scene: '郵便局',
    sceneEmoji: '📮',
    lines: [
      { speaker: 'A', chinese: '我要寄一封信。', pinyin: 'Wǒ yà o jì yì fē ng xì n .', japanese: '手紙を一通出したいです。' },
      { speaker: 'B', chinese: '寄到哪儿？', pinyin: 'Jì dà o nǎ r ?', japanese: 'どこまでですか？' },
      { speaker: 'A', chinese: '日本。多少钱？', pinyin: 'Rì bě n . Duō shao qiá n ?', japanese: '日本です。いくらですか？' },
      { speaker: 'B', chinese: '五块钱。', pinyin: 'Wǔ kuà i qiá n .', japanese: '5元です。' },
    ],
    keyVocabulary: [
      { word: '寄', pinyin: 'jì', meaning: '送る', usageNote: '手紙を送る時の動詞。「寄信」で手紙を出す。' },
      { word: '信', pinyin: 'xì n', meaning: '手紙', writingNote: '日本語の「信」と同じ字だが、意味が違う。' },
    ],
  },
  {
    scene: '美容院',
    sceneEmoji: '💇',
    lines: [
      { speaker: 'A', chinese: '我想剪头发。', pinyin: 'Wǒ xiǎ ng jiǎ n tó u fa .', japanese: '髪を切りたいです。' },
      { speaker: 'B', chinese: '要多长？', pinyin: 'Yà o duō chá ng ?', japanese: 'どのくらいの長さにしますか？' },
      { speaker: 'A', chinese: '短一点就好。', pinyin: 'Duǎ n yì diǎ n jiù hǎ o .', japanese: '少し短くしてください。' },
    ],
    keyVocabulary: [
      { word: '剪', pinyin: 'jiǎ n', meaning: '切る', usageNote: '髪を切る時は「剪头发」と言う。' },
      { word: '短', pinyin: 'duǎ n', meaning: '短い', writingNote: '日本語と同じ漢字。' },
    ],
  },
  {
    scene: '薬局',
    sceneEmoji: '💊',
    lines: [
      { speaker: 'A', chinese: '我头疼，有药吗？', pinyin: 'Wǒ tó u té ng , yǒ u yà o ma ?', japanese: '頭が痛いです。薬はありますか？' },
      { speaker: 'B', chinese: '有。发烧吗？', pinyin: 'Yǒ u . Fā shā o ma ?', japanese: 'あります。熱はありますか？' },
      { speaker: 'A', chinese: '不发烧。', pinyin: 'Bù fā shā o .', japanese: '熱はありません。' },
    ],
    keyVocabulary: [
      { word: '头疼', pinyin: 'tó u té ng', meaning: '頭痛がする', writingNote: '「頭」が先。「脳頭痛」とは言わない。' },
      { word: '药', pinyin: 'yà o', meaning: '薬', writingNote: '日本語の「薬」と同じ字形。' },
    ],
  },
  {
    scene: 'ジム',
    sceneEmoji: '🏋️',
    lines: [
      { speaker: 'A', chinese: '你常去健身房吗？', pinyin: 'Nǐ chá ng qù jiàn shē n fá ng ma ?', japanese: 'よくジムに行きますか？' },
      { speaker: 'B', chinese: '对，一周去三次。', pinyin: 'Duì , yì zhō u qù sā n cì .', japanese: 'はい、週3回行きます。' },
      { speaker: 'A', chinese: '我也想去，多少钱？', pinyin: 'Wǒ yě xiǎ ng qù , duō shao qiá n ?', japanese: '私も行きたいです。いくらですか？' },
    ],
    keyVocabulary: [
      { word: '健身房', pinyin: 'jiàn shē n fá ng', meaning: 'フィットネスクラブ', writingNote: '「健身」= 健康。「房」= 部屋。' },
      { word: '常', pinyin: 'chá ng', meaning: 'よく', usageNote: '「常去」で「よく行く」となる。' },
    ],
  },
  {
    scene: '図書館',
    sceneEmoji: '📚',
    lines: [
      { speaker: 'A', chinese: '请问可以借书吗？', pinyin: 'Qǐ ngwè n kě yǐ jiè shū ma ?', japanese: '本を借りられますか？' },
      { speaker: 'B', chinese: '可以，带学生证了吗？', pinyin: 'Kě yǐ , dà i xué shē ng zhè ng le ma ?', japanese: 'はい、学生証をお持ちですか？' },
      { speaker: 'A', chinese: '带了，在这儿。', pinyin: 'Dà i le , zà i zhè r .', japanese: '持ってます、ここにあります。' },
    ],
    keyVocabulary: [
      { word: '借', pinyin: 'jiè', meaning: '借りる', usageNote: '借りるは「借」。貸すは「借给」。' },
      { word: '图书馆', pinyin: 'tú shū guǎ n', meaning: '図書館', writingNote: '「图书」= 本。「馆」= 建物。' },
    ],
  },
  {
    scene: '誕生日',
    sceneEmoji: '🎂',
    lines: [
      { speaker: 'A', chinese: '今天是你生日吗？', pinyin: 'Jī n tiā n shì nǐ shē ng rì ma ?', japanese: '今日は誕生日ですか？' },
      { speaker: 'B', chinese: '对，你怎么知道？', pinyin: 'Duì , nǐ zě nme zhī dà o ?', japanese: 'そうなんです。どうして知ってるんですか？' },
      { speaker: 'A', chinese: '生日快乐！这是给你的礼物。', pinyin: 'Shē ng rì kuà i lè ! Zhè shì gě i nǐ de lǐ wù .', japanese: 'お誕生日おめでとう！これはプレゼントです。' },
    ],
    keyVocabulary: [
      { word: '生日', pinyin: 'shē ng rì', meaning: '誕生日', writingNote: '日本語と同じ漢字。' },
      { word: '快乐', pinyin: 'kuà i lè', meaning: '楽しい/ハッピー', writingNote: '「快」= 速い。「乐」= 楽しい。' },
    ],
  },]

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

  {
    scene: 'スマホ修理',
    sceneEmoji: '📱',
    lines: [
      { speaker: 'A', chinese: '我的手机屏幕碎了，能修吗？', pinyin: 'Wǒ de shǒu jī pí ng mù suì le , né ng xiū ma ?', japanese: '携帯の画面が割れたんですが、修理できますか？' },
      { speaker: 'B', chinese: '能修，不过要两三天。', pinyin: 'Né ng xiū , bú guò yà o liǎ ng sā n tiā n .', japanese: '修理できますが、2〜3日かかります。' },
      { speaker: 'A', chinese: '多少钱？', pinyin: 'Duō shao qiá n ?', japanese: 'いくらですか？' },
      { speaker: 'B', chinese: '五百左右，看型号。', pinyin: 'Wǔ bǎ i zuǒ yò u , kà n xí ng hà o .', japanese: '500元前後です、機種によります。' },
    ],
    keyVocabulary: [
      { word: '屏幕', pinyin: 'pí ng mù', meaning: '画面/スクリーン', writingNote: '「屏」は「屏風」の屏。' },
      { word: '修', pinyin: 'xiū', meaning: '修理する', usageNote: '「修手机」で携帯を修理する。' },
    ],
  },
  {
    scene: '面接',
    sceneEmoji: '👔',
    lines: [
      { speaker: 'A', chinese: '你为什么想来我们公司工作？', pinyin: 'Nǐ wè i shé nme xiǎ ng lá i wǒ men gō ng sī gō ng zuò ?', japanese: 'なぜ弊社で働きたいのですか？' },
      { speaker: 'B', chinese: '我对贵公司的行业前景很看好。', pinyin: 'Wǒ duì guì gō ng sī de há ng yè qiá n jǐ ng hě n kà n hǎ o .', japanese: '御社の業界の将来性を高く評価しています。' },
      { speaker: 'A', chinese: '你有什么特长或优势？', pinyin: 'Nǐ yǒ u shé nme té chá ng huò yō u shì ?', japanese: '何か特技や強みはありますか？' },
    ],
    keyVocabulary: [
      { word: '前景', pinyin: 'qiá n jǐ ng', meaning: '将来性/見通し', writingNote: '「前」+「景」= 前方の景色→将来。' },
      { word: '优势', pinyin: 'yō u shì', meaning: '優位性/強み', writingNote: '「优」= 優れた。「势」= 勢い。' },
    ],
  },
  {
    scene: '遅刻',
    sceneEmoji: '⏰',
    lines: [
      { speaker: 'A', chinese: '不好意思，我迟到了。', pinyin: 'Bù hǎ o yì si , wǒ chí dà o le .', japanese: 'すみません、遅刻しました。' },
      { speaker: 'B', chinese: '又堵车了吗？', pinyin: 'Yò u dǔ chē le ma ?', japanese: 'また渋滞ですか？' },
      { speaker: 'A', chinese: '对，今天特别严重。', pinyin: 'Duì , jī n tiā n tè bié yá n zhòng .', japanese: 'はい、今日は特にひどいです。' },
      { speaker: 'B', chinese: '下次早点出门吧。', pinyin: 'Xià cì zǎ o diǎ n chū mé n ba .', japanese: '次は早めに出てくださいね。' },
    ],
    keyVocabulary: [
      { word: '迟到', pinyin: 'chí dà o', meaning: '遅刻する', writingNote: '日本語の「遅到」とは言わない。' },
      { word: '严重', pinyin: 'yá n zhòng', meaning: '深刻/重大', writingNote: '日本語と同じ漢字。' },
    ],
  },
  {
    scene: 'ホテル予約',
    sceneEmoji: '🏨',
    lines: [
      { speaker: 'A', chinese: '请问还有房间吗？', pinyin: 'Qǐ ngwè n há i yǒ u fá ng jiā n ma ?', japanese: '部屋は空いていますか？' },
      { speaker: 'B', chinese: '请问您要住几天？', pinyin: 'Qǐ ngwè n ní n yà o zhù jǐ tiā n ?', japanese: '何泊されますか？' },
      { speaker: 'A', chinese: '两晚，标间就行。', pinyin: 'Liǎ ng wǎ n , biā o jiā n jiù xí ng .', japanese: '2泊で、ツインでいいです。' },
      { speaker: 'B', chinese: '好的，一共六百块。', pinyin: 'Hǎ o de , yí gòng liù bǎ i kuà i .', japanese: '承知しました。合計600元です。' },
    ],
    keyVocabulary: [
      { word: '标间', pinyin: 'biā o jiā n', meaning: 'ツインルーム', usageNote: '「标准间」の略。' },
      { word: '住', pinyin: 'zhù', meaning: '泊まる/住む', usageNote: 'ホテルに「住」ではなく「住几天」と言う。' },
    ],
  },
  {
    scene: '家探し',
    sceneEmoji: '🏠',
    lines: [
      { speaker: 'A', chinese: '这个房子离地铁站远吗？', pinyin: 'Zhè ge fá ng zi lí dì tiě zhà n yuǎ n ma ?', japanese: 'この家は地下鉄の駅から遠いですか？' },
      { speaker: 'B', chinese: '不远，走路十分钟。', pinyin: 'Bú yuǎ n , zǒ u lù shí fē n zhō ng .', japanese: '遠くないです。徒歩10分です。' },
      { speaker: 'A', chinese: '房租多少？包含水电费吗？', pinyin: 'Fá ng zū duō shao ? Bā o há n shuǐ dià n fè i ma ?', japanese: '家賃はいくらですか？水道光熱費込みですか？' },
    ],
    keyVocabulary: [
      { word: '房租', pinyin: 'fá ng zū', meaning: '家賃', writingNote: '「房」+「租」= 部屋の貸し賃。' },
      { word: '包含', pinyin: 'bā o há n', meaning: '含む', writingNote: '日本語の「包含」と同じ。' },
    ],
  },
  {
    scene: '引っ越し',
    sceneEmoji: '📦',
    lines: [
      { speaker: 'A', chinese: '你什么时候搬家？需要帮忙吗？', pinyin: 'Nǐ shé nme shí hou bān jiā ? Xū yà o bā ng má ng ma ?', japanese: 'いつ引っ越しですか？手伝いましょうか？' },
      { speaker: 'B', chinese: '下周六，已经找好搬家公司了。', pinyin: 'Xià zhō u liù , yǐ jī ng zhǎ o hǎ o bān jiā gō ng sī le .', japanese: '来週の土曜日、引っ越し業者はもう見つかりました。' },
      { speaker: 'A', chinese: '那我还是来送送你吧。', pinyin: 'Nà wǒ há ishì lá i sòng song nǐ ba .', japanese: 'じゃあ送りに行きますね。' },
    ],
    keyVocabulary: [
      { word: '搬家', pinyin: 'bān jiā', meaning: '引っ越しする', writingNote: '日本語の「引っ越し」は中国語で「搬家」。' },
      { word: '送', pinyin: 'sòng', meaning: '送る/見送る', usageNote: '「送送」で「見送りに行く」の丁寧な表現。' },
    ],
  },
  {
    scene: 'レストラン予約',
    sceneEmoji: '🍽️',
    lines: [
      { speaker: 'A', chinese: '您好，想订一个包间。', pinyin: 'Ní n hǎ o , xiǎ ng dì ng yí ge bā o jiā n .', japanese: 'こんにちは、個室を予約したいです。' },
      { speaker: 'B', chinese: '请问几位？什么时间？', pinyin: 'Qǐ ngwè n jǐ wè i ? Shé nme shí jiā n ?', japanese: '何名様ですか？何時ごろですか？' },
      { speaker: 'A', chinese: '六个人，晚上七点。', pinyin: 'Liù ge ré n , wǎ nshang qī diǎ n .', japanese: '6名で、夜7時です。' },
    ],
    keyVocabulary: [
      { word: '包间', pinyin: 'bā o jiā n', meaning: '個室/プライベートルーム', writingNote: '「包」= 丸ごと。「间」= 部屋。' },
      { word: '订', pinyin: 'dì ng', meaning: '予約する', usageNote: '「订房间」「订包间」で予約。' },
    ],
  },
  {
    scene: '観光案内',
    sceneEmoji: '🏯',
    lines: [
      { speaker: 'A', chinese: '请问故宫怎么走？', pinyin: 'Qǐ ngwè n Gǔ gō ng zě nme zǒ u ?', japanese: 'すみません、故宮へはどう行けばいいですか？' },
      { speaker: 'B', chinese: '坐地铁一号线，天安门东站下车。', pinyin: 'Zuò dì tiě yī hà o xià n , Tiā n ā n mé n Dō ng zhà n xià chē .', japanese: '地下鉄1号線に乗って、天安門東駅で降りてください。' },
      { speaker: 'A', chinese: '谢谢！需要买票吗？', pinyin: 'Xiè xie ! Xū yà o mǎ i pià o ma ?', japanese: 'ありがとうございます！チケットは買えますか？' },
    ],
    keyVocabulary: [
      { word: '故宫', pinyin: 'Gǔ gō ng', meaning: '故宮博物院', writingNote: '「故」= 昔の。「宮」= 宮殿。' },
      { word: '下车', pinyin: 'xià chē', meaning: '降りる（乗り物から）', usageNote: 'バスや電車から降りる時の定型表現。' },
    ],
  },
  {
    scene: '病院',
    sceneEmoji: '🏥',
    lines: [
      { speaker: 'A', chinese: '你好，我挂一个内科。', pinyin: 'Nǐ hǎ o , wǒ guà yí ge nè i kē .', japanese: 'こんにちは、内科の受付をお願いします。' },
      { speaker: 'B', chinese: '带医保卡了吗？', pinyin: 'Dà i yì bǎ o kǎ le ma ?', japanese: '健康保険証はお持ちですか？' },
      { speaker: 'A', chinese: '带了，这是卡和身份证。', pinyin: 'Dà i le , zhè shì kǎ hé shē n fè n zhè ng .', japanese: '持っています、カードと身分証です。' },
    ],
    keyVocabulary: [
      { word: '挂', pinyin: 'guà', meaning: '受付する/予約する', usageNote: '病院で診察を受けることを「挂号」と言う。' },
      { word: '医保卡', pinyin: 'yì bǎ o kǎ', meaning: '健康保険証', writingNote: '「医保」= 医療保険。「卡」= カード。' },
    ],
  },
  {
    scene: '銀行振込',
    sceneEmoji: '🏦',
    lines: [
      { speaker: 'A', chinese: '你好，我想汇款到日本。', pinyin: 'Nǐ hǎ o , wǒ xiǎ ng huì kuǎ n dà o Rì bě n .', japanese: 'こんにちは、日本へ送金したいです。' },
      { speaker: 'B', chinese: '请填写汇款单，需要收款人的银行信息。', pinyin: 'Qǐ ng tiá n xiě huì kuǎ n dā n , xū yà o shō u kuǎ n ré n de yí nhá ng xì n xī .', japanese: '送金用紙にご記入ください。受取人の銀行情報が必要です。' },
      { speaker: 'A', chinese: '手续费多少？', pinyin: 'Shǒ u xù fè i duō shao ?', japanese: '手数料はいくらですか？' },
    ],
    keyVocabulary: [
      { word: '汇款', pinyin: 'huì kuǎ n', meaning: '送金する', writingNote: '「汇」= 集める/送る。「款」= お金。' },
      { word: '手续费', pinyin: 'shǒ u xù fè i', meaning: '手数料', writingNote: '「手続費」の意。' },
    ],
  },]

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

  {
    scene: '環境保護',
    sceneEmoji: '🌿',
    lines: [
      { speaker: 'A', chinese: '近年来，环境污染问题日益严重，引起了广泛关注。', pinyin: 'Jì n niá n lá i , huá n jì ng wū rǎ n wè n tí rì yì yá n zhòng , yǐ n qǐ le guǎ ng fà n guā n zhù .', japanese: '近年、環境汚染問題がますます深刻化し、広く注目を集めています。' },
      { speaker: 'B', chinese: '确实如此。垃圾分类、节能减排已成为社会共识。', pinyin: 'Què shí rú cǐ . Lā jī fē n lè i , jié né ng jiǎ n pá i yǐ ché ng wé i shè huì gòng shí .', japanese: '確かにそうです。ゴミ分別、省エネ・排出削減はすでに社会の共通認識になっています。' },
      { speaker: 'A', chinese: '作为企业，我们更应该承担起社会责任，推动可持续发展。', pinyin: 'Zuò wé i qǐ yè , wǒ me n gè ng yī ng gā i ché ng dā n qǐ shè huì zé rè n , tuī dòng kě chí xù fā zhǎ n .', japanese: '企業として、私たちは社会的責任を担い、持続可能な発展を推進すべきです。' },
    ],
    keyVocabulary: [
      { word: '日益', pinyin: 'rì yì', meaning: 'ますます/日増しに', usageNote: '「日」+「益」= 日々増える。フォーマルな表現。' },
      { word: '共识', pinyin: 'gòng shí', meaning: '共通認識', writingNote: '「共」+「識」。ビジネス文書で多用。' },
    ],
  },
  {
    scene: 'AI倫理',
    sceneEmoji: '🤖',
    lines: [
      { speaker: 'A', chinese: '人工智能技术的发展给我们带来了便利，但也引发了一些伦理问题。', pinyin: 'Ré n gō ng zhì né ng jì shù de fā zhǎ n gě i wǒ me n dà lá i le bià n lì , dà n yě yǐ n fā le yì xiē lú n lǐ wè n tí .', japanese: 'AI技術の発展は私たちに利便性をもたらしましたが、倫理問題も引き起こしました。' },
      { speaker: 'B', chinese: '您说得对。比如数据隐私、算法偏见等问题都需要认真对待。', pinyin: 'Ní n shuō de duì . Bǐ rú shù jù yǐ n sī , suà n fǎ piā n jià n dě ng wè n tí dō u xū yà o rè n zhē n duì dà i .', japanese: 'おっしゃる通りです。例えばデータプライバシー、アルゴリズムのバイアスなど、真剣に向き合う必要があります。' },
    ],
    keyVocabulary: [
      { word: '伦理', pinyin: 'lú n lǐ', meaning: '倫理', writingNote: '日本語と同じ漢字。' },
      { word: '偏见', pinyin: 'piā n jià n', meaning: 'バイアス/偏見', writingNote: '「偏」は日本語の「偏」と同じ。' },
    ],
  },
  {
    scene: 'キャリア',
    sceneEmoji: '💼',
    lines: [
      { speaker: 'A', chinese: '在这家公司工作了五年，我觉得是时候寻求新的挑战了。', pinyin: 'Zà i zhè jiā gō ng sī gō ng zuò le wǔ niá n , wǒ jué de shì shí hou xú n qiú xī n de tiǎ o zhà n le .', japanese: 'この会社で5年働きましたが、新たな挑戦を求める時が来たと感じています。' },
      { speaker: 'B', chinese: '您有什么打算吗？是考虑转行还是换个环境？', pinyin: 'Ní n yǒ u shé nme dǎ suà n ma ? Shì kǎ o lǜ zhuǎ n há ng há ishì huà n ge huá n jì ng ?', japanese: '何か計画はありますか？業種転換か、環境を変えることか検討されていますか？' },
      { speaker: 'A', chinese: '我想去创业，做自己真正感兴趣的事情。', pinyin: 'Wǒ xiǎ ng qù chuà ng yè , zuò zì jǐ zhē n zhè ng gǎ n xì ng qù de shì qing .', japanese: '起業したいんです。自分が本当に興味のあることをやりたくて。' },
    ],
    keyVocabulary: [
      { word: '寻求', pinyin: 'xú n qiú', meaning: '求める/探す', writingNote: '「寻」= 探す。「求」= 求める。' },
      { word: '创业', pinyin: 'chuà ng yè', meaning: '起業する', writingNote: '「创」= 創る。「业」= 事業。' },
    ],
  },
  {
    scene: '教育改革',
    sceneEmoji: '📖',
    lines: [
      { speaker: 'A', chinese: '当前的教育体制存在诸多弊端，亟需改革。', pinyin: 'Dā ng qiá n de jià o yù tǐ zhì cú n zà i zhū duō bì duā n , jí xū gǎ i gé .', japanese: '現在の教育制度には多くの弊害があり、改革が急務です。' },
      { speaker: 'B', chinese: '我同意您的看法。过于强调分数和升学率，忽视了学生的全面发展。', pinyin: 'Wǒ tóng yì ní n de kà n fǎ . Guò yú qiá ng dià o fē n shù hé shé ng xué lǜ , hū shì le xué shē ng de quá n mià n fā zhǎ n .', japanese: '私も同感です。点数や進学率を重視しすぎて、学生の全面的な発展が軽視されています。' },
    ],
    keyVocabulary: [
      { word: '弊端', pinyin: 'bì duā n', meaning: '弊害/欠点', writingNote: '「弊」= 害。「端」= 端末。' },
      { word: '亟需', pinyin: 'jí xū', meaning: '急務である/切実に必要', usageNote: '「亟」= 切実に。フォーマルな表現。' },
    ],
  },
  {
    scene: '心の健康',
    sceneEmoji: '🧠',
    lines: [
      { speaker: 'A', chinese: '现代社会节奏快，很多人都面临着巨大的心理压力。', pinyin: 'Xià n dà i shè huì jié zò u kuà i , hě n duō ré n dō u mià n lí n zhe jù dà de xī n lǐ yā lì .', japanese: '現代社会はペースが速く、多くの人が大きな心理的プレッシャーに直面しています。' },
      { speaker: 'B', chinese: '确实。焦虑、抑郁已成为普遍问题，我们需要更加关注心理健康。', pinyin: 'Què shí . Jiā o lǜ , yì yù yǐ ché ng wé i pǔ bià n wè n tí , wǒ me n xū yà o gè ng jiā guā n zhù xī n lǐ jià n kā ng .', japanese: '確かに。不安やうつは一般的な問題となっており、メンタルヘルスにより注目する必要があります。' },
    ],
    keyVocabulary: [
      { word: '焦虑', pinyin: 'jiā o lǜ', meaning: '不安/焦燥', writingNote: '「焦」= 焦る。「虑」= 悩み。' },
      { word: '抑郁', pinyin: 'yì yù', meaning: 'うつ/抑うつ', writingNote: '「抑」= 抑える。「郁」= 憂鬱。' },
    ],
  },
  {
    scene: '国際関係',
    sceneEmoji: '🌍',
    lines: [
      { speaker: 'A', chinese: '在全球化背景下，国际合作比以往任何时候都更加重要。', pinyin: 'Zà i quá n qiú huà bè i jǐ ng xià , guó jì hé zuò bǐ yǐ wà n rè n hé shí hou dō u gè ng jiā zhòng yà o .', japanese: 'グローバル化を背景に、国際協力はかつてないほど重要になっています。' },
      { speaker: 'B', chinese: '您说得很有道理。面对气候变化、疫情等全球性挑战，没有哪个国家可以独善其身。', pinyin: 'Ní n shuō de hě n yǒ u dà o lǐ . Mià n duì qì hò u bià n huà , yì qí ng dě ng quá n qiú xì ng tiǎ o zhà n , mé i yǒ u nǎ ge guó jiā kě yǐ dú shà n qí shē n .', japanese: 'もっともです。気候変動、パンデミックなどの地球規模の課題に直面して、どの国も単独では対処できません。' },
    ],
    keyVocabulary: [
      { word: '独善其身', pinyin: 'ú shà n qí shē n', meaning: '独り善がり/自己保全', writingNote: '四字熟語。字義は「独りで自らを善くする」。' },
      { word: '全球性', pinyin: 'quá n qiú xì ng', meaning: '地球規模の/グローバルな', usageNote: '「全球」+「性」= 全地球的性質。' },
    ],
  },
  {
    scene: '技術革新',
    sceneEmoji: '💡',
    lines: [
      { speaker: 'A', chinese: '这项技术一旦成熟，将彻底改变我们的生活方式。', pinyin: 'Zhè xià ng jì shù yí dà n ché ng shú , jiā ng chè dǐ gǎ i bià n wǒ me n de shē ng huó fā ng shì .', japanese: 'この技術が成熟すれば、私たちの生活様式を根本から変えることになるでしょう。' },
      { speaker: 'B', chinese: '您说得对。不过，新技术的推广也需要考虑其潜在风险和社会影响。', pinyin: 'Ní n shuō de duì . Bú guò , xī n jì shù de tuī guǎ ng yě xū yà o kǎ o lǜ qí qiá n zà i fē ng xiǎ n hé shè huì yǐ ng xiǎ ng .', japanese: 'その通りです。ただ、新技術の普及には潜在的リスクと社会的影響も考慮する必要があります。' },
    ],
    keyVocabulary: [
      { word: '彻底', pinyin: 'chè dǐ', meaning: '徹底的に/根本的に', writingNote: '「彻」= 貫く。「底」= 底。' },
      { word: '潜在', pinyin: 'qiá n zà i', meaning: '潜在する/潜在的', writingNote: '日本語と同じ漢字。' },
    ],
  },
  {
    scene: '都市化',
    sceneEmoji: '🏙️',
    lines: [
      { speaker: 'A', chinese: '城市化进程虽然带来了经济增长，但也造成了房价上涨、交通拥堵等问题。', pinyin: 'Ché ng shì huà jì n ché ng suī rá n dà i lá i le jī ng jì zě ng zhǎ ng , dà n yě zà o ché ng le fá ng jià shà ng zhǎ ng , jiā o tō ng yō ng dǔ dě ng wè n tí .', japanese: '都市化のプロセスは経済成長をもたらしましたが、住宅価格の上昇や交通渋滞などの問題も引き起こしました。' },
      { speaker: 'B', chinese: '这是一个复杂的系统工程，需要政府、企业和公众共同参与解决。', pinyin: 'Zhè shì yí ge fù zá de xì tǒ ng gō ng ché ng , xū yà o zhè ng fǔ , qǐ yè hé gō ng zhòng gòng tóng cā n yù jiě jué .', japanese: 'これは複雑なシステム的問題であり、政府、企業、市民が共同で参加して解決する必要があります。' },
    ],
    keyVocabulary: [
      { word: '进程', pinyin: 'jì n ché ng', meaning: 'プロセス/過程', writingNote: '「进」= 進む。「程」= 道程。' },
      { word: '拥堵', pinyin: 'yō ng dǔ', meaning: '混雑する/渋滞', writingNote: '「拥」= 押し合う。「堵」= 塞ぐ。' },
    ],
  },
  {
    scene: '文化遺産',
    sceneEmoji: '🏛️',
    lines: [
      { speaker: 'A', chinese: '保护文化遗产是我们的历史责任，也是对子孙后代的承诺。', pinyin: 'Bǎ o hù wé n huà yí chǎ n shì wǒ me n de lì shǐ zé rè n , yě shì duì zǐ sūn hò u dà i de ché ng nuò .', japanese: '文化遺産の保護は私たちの歴史的責任であり、子孫への約束でもあります。' },
      { speaker: 'B', chinese: '您说得非常好。非物质文化遗产的传承同样重要，需要社会各界的共同努力。', pinyin: 'Ní n shuō de fē i chá ng hǎ o . Fē i wù zhì wé n huà yí chǎ n de chuá n ché ng tóng yà ng zhòng yà o , xū yà o shè huì gè jiè de gòng tóng nǔ lì .', japanese: '素晴らしいお考えです。無形文化遺産の継承も同様に重要で、社会各界の共同の努力が必要です。' },
    ],
    keyVocabulary: [
      { word: '遗产', pinyin: 'í chǎ n', meaning: '遺産', writingNote: '「遗」= 残す。「产」= 財産。' },
      { word: '传承', pinyin: 'chuá n ché ng', meaning: '継承する/伝承する', writingNote: '「传」= 伝える。「承」= 受け継ぐ。' },
    ],
  },
  {
    scene: '金融科技',
    sceneEmoji: '💳',
    lines: [
      { speaker: 'A', chinese: '移动支付的普及极大地改变了我们的消费习惯。', pinyin: 'Yí dòng zhī fù de pǔ jí jí dà de gǎ i bià n le wǒ me n de xiā o fè i xí guà n .', japanese: 'モバイル決済の普及は私たちの消費習慣を大きく変えました。' },
      { speaker: 'B', chinese: '是的。但与此同时，我们也需要关注数据安全和金融稳定问题。', pinyin: 'Shì de . Dà n yǔ cǐ tóng shí , wǒ me n yě xū yà o guā n zhù shù jù ā n quá n hé jī n róng wě n dì ng wè n tí .', japanese: 'そうです。同時に、データセキュリティと金融安定の問題にも注目する必要があります。' },
    ],
    keyVocabulary: [
      { word: '普及', pinyin: 'pǔ jí', meaning: '普及する', writingNote: '「普」= 広い。「及」= 行き渡る。' },
      { word: '稳定', pinyin: 'wě n dì ng', meaning: '安定する', writingNote: '「稳」は日本語では「安定」と言うが、中国語では「稳定」。' },
    ],
  },]

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
