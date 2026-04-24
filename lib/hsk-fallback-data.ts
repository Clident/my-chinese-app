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
  scene_ja: string
  sceneEmoji: string
  lines: DialogueLine[]
  keyVocabulary: KeyVocabulary[]
}

// HSK 1-2 (初级) - 简单句子，中日同义词多
export const hsk12Dialogues: FallbackDialogue[] = [
  {
    scene: 'コンビニ',
    scene_ja: 'コンビニ',
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
    scene_ja: '学校',
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
    scene_ja: 'カフェ',
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
    scene_ja: 'レストラン',
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
    scene_ja: '駅',
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
    scene_ja: '果物屋',
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
    scene_ja: '道案内',
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
    scene_ja: '天気について',
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
    scene_ja: 'タクシー',
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
    scene_ja: '郵便局',
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
    scene_ja: '美容院',
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
    scene_ja: '薬局',
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
    scene_ja: 'ジム',
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
    scene_ja: '図書館',
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
    scene_ja: '誕生日',
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
  },
  {
    scene: 'エレベーターで隣人',
    scene_ja: 'エレベーターで隣人',
    sceneEmoji: '🛗',
    lines: [
      { speaker: "邻居", chinese: "下班了？今天挺早的。", pinyin: "xià bān le ？ jīn tiān tǐng zǎo de 。", japanese: "お帰りなさい。今日は早いですね。" },
      { speaker: "你", chinese: "是啊，今天不加班。", pinyin: "shì ā ， jīn tiān bù jiā bān 。", japanese: "ええ、今日は残業がないんです。" },
      { speaker: "邻居", chinese: "挺好，挺好。", pinyin: "tǐng hǎo ， tǐng hǎo 。", japanese: "それはいい、それはいい。" }
    ],
    keyVocabulary: [
      { word: "挺", pinyin: "tǐng", meaning: "とても、なかなか" },
      { word: "加班", pinyin: "jiā bān", meaning: "残業する" }
    ],
  },
  {
    scene: '医院挂号',
    scene_ja: '医院挂号',
    sceneEmoji: '🏥',
    lines: [
      { speaker: "患者", chinese: "你好，我想挂内科。", pinyin: "nǐ hǎo ， wǒ xiǎng guà nèi kē 。", japanese: "すみません、内科の受診をお願いします。" },
      { speaker: "护士", chinese: "请给我你的护照，挂号费十块。", pinyin: "qǐng gěi wǒ nǐ de hù zhào ， guà hào fèi shí kuài 。", japanese: "パスポートをください。受付料は10元です。" },
      { speaker: "患者", chinese: "给你。是在二楼吗？", pinyin: "gěi nǐ 。 shì zài èr lóu ma ？", japanese: "はい。二階ですか？" }
    ],
    keyVocabulary: [
      { word: "挂号", pinyin: "guà hào", meaning: "受診の手続きをする、登録する" },
      { word: "内科", pinyin: "nèi kē", meaning: "内科" }
    ],
  },
  {
    scene: '药店买感冒药',
    scene_ja: '药店买感冒药',
    sceneEmoji: '💊',
    lines: [
      { speaker: "顾客", chinese: "我感冒了，嗓子疼。", pinyin: "wǒ gǎn mào le ， sǎng zi téng 。", japanese: "風邪を引いて、喉が痛いです。" },
      { speaker: "店员", chinese: "发烧吗？吃过药了吗？", pinyin: "fā shāo ma ？ chī guò yào le ma ？", japanese: "熱はありますか？薬は飲みましたか？" },
      { speaker: "顾客", chinese: "没发烧，还没吃药。", pinyin: "méi fā shāo ， hái méi chī yào 。", japanese: "熱はありません。まだ薬は飲んでいません。" }
    ],
    keyVocabulary: [
      { word: "嗓子", pinyin: "sǎng zi", meaning: "喉" },
      { word: "感冒", pinyin: "gǎn mào", meaning: "風邪を引く" }
    ],
  },
  {
    scene: '只是修一下',
    scene_ja: '只是修一下',
    sceneEmoji: '💇‍♂️',
    lines: [
      { speaker: "理发师", chinese: "你想怎么剪？", pinyin: "nǐ xiǎng zěn me jiǎn ？", japanese: "どうされますか？" },
      { speaker: "顾客", chinese: "不想要太短，只是修一下。", pinyin: "bù xiǎng yào tài duǎn ， zhǐ shì xiū yí xià 。", japanese: "短くしたくないです。整えるだけにしてください。" },
      { speaker: "理发师", chinese: "好的，耳朵这里要剪吗？", pinyin: "hǎo de ， ěr duo zhè lǐ yào jiǎn ma ？", japanese: "わかりました。耳の周りは切りますか？" }
    ],
    keyVocabulary: [
      { word: "修", pinyin: "xiū", meaning: "整える、整えカットする" },
      { word: "太短", pinyin: "tài duǎn", meaning: "短すぎる" }
    ],
  },
  {
    scene: '菜市场砍价',
    scene_ja: '菜市场砍价',
    sceneEmoji: '🥬',
    lines: [
      { speaker: "顾客", chinese: "老板，这苹果怎么卖？", pinyin: "lǎo bǎn ， zhè píng guǒ zěn me mài ？", japanese: "おじさん、このリンゴいくら？" },
      { speaker: "小贩", chinese: "五块一斤，很甜的。", pinyin: "wǔ kuài yì jīn ， hěn tián de 。", japanese: "一斤（500g）で5元だよ、すごく甘いよ。" },
      { speaker: "顾客", chinese: "太贵了，四块卖不卖？", pinyin: "tài guì le ， sì kuài mài bú mài ？", japanese: "高すぎるよ。4元にならない？" }
    ],
    keyVocabulary: [
      { word: "斤", pinyin: "jīn", meaning: "500グラム（中国の重量単位）" },
      { word: "卖不卖", pinyin: "mài bú mài", meaning: "（その値段で）売ってくれる？" }
    ],
  },
  {
    scene: 'デリバリー催促',
    scene_ja: 'デリバリー催促',
    sceneEmoji: '🛵',
    lines: [
      { speaker: "顾客", chinese: "你好，我的外卖还没到。", pinyin: "nǐ hǎo ， wǒ de wài mài hái méi dào 。", japanese: "すみません、デリバリーがまだ届きません。" },
      { speaker: "骑手", chinese: "不好意思，在路上了，五分钟到。", pinyin: "bù hǎo yì sī ， zài lù shàng le ， wǔ fēn zhōng dào 。", japanese: "申し訳ありません、今向かっています。あと5分で着きます。" }
    ],
    keyVocabulary: [
      { word: "外卖", pinyin: "wài mài", meaning: "デリバリー、外食の持ち帰り" },
      { word: "在路上", pinyin: "zài lù shàng", meaning: "（移動中で）向かっているところ" }
    ],
  },
  {
    scene: '打车去机场',
    scene_ja: '打车去机场',
    sceneEmoji: '🚕',
    lines: [
      { speaker: "乘客", chinese: "师傅，去机场要多长时间？", pinyin: "shī fu ， qù jī chǎng yào duō shǎo shí jiān ？", japanese: "運転手さん、空港までどのくらいかかりますか？" },
      { speaker: "司机", chinese: "不堵车的话，四十分钟就能到。", pinyin: "bù dǔ chē de huà ， sì shí fēn zhōng jiù néng dào 。", japanese: "渋滞してなければ、40分で着きますよ。" }
    ],
    keyVocabulary: [
      { word: "堵车", pinyin: "dǔ chē", meaning: "渋滞する" },
      { word: "师傅", pinyin: "shī fu", meaning: "（運転手や職人への）呼びかけ、〜さん" }
    ],
  },
  {
    scene: '询问地铁站',
    scene_ja: '询问地铁站',
    sceneEmoji: '🚇',
    lines: [
      { speaker: "游客", chinese: "请问，最近的地铁站在哪儿？", pinyin: "qǐng wèn ， zuì jìn de dì tiě zhàn zài nǎ r ？", japanese: "すみません、一番近い地下鉄の駅はどこですか？" },
      { speaker: "行人", chinese: "往前走，过两个红绿灯就到了。", pinyin: "wǎng qián zǒu ， guò liǎng gè hóng lǜ dēng jiù dào le 。", japanese: "真っ直ぐ行って、信号を二つ過ぎたら着きますよ。" }
    ],
    keyVocabulary: [
      { word: "红绿灯", pinyin: "hóng lǜ dēng", meaning: "信号機" },
      { word: "在哪儿", pinyin: "zài nǎ r", meaning: "どこにありますか" }
    ],
  },
  {
    scene: '餐厅点菜',
    scene_ja: '餐厅点菜',
    sceneEmoji: '🍜',
    lines: [
      { speaker: "顾客", chinese: "请问，这个菜辣不辣？", pinyin: "qǐng wèn ， zhè ge cài là bu là ？", japanese: "すみません、この料理は辛いですか？" },
      { speaker: "服务员", chinese: "有一点儿辣，怕辣的话可以点红烧的。", pinyin: "yǒu yì diǎn er là ， pà là de huà kě yǐ diǎn hóng shāo de 。", japanese: "少し辛いですよ。辛いのが苦手なら紅焼（醤油煮）にできます。" }
    ],
    keyVocabulary: [
      { word: "辣", pinyin: "là", meaning: "辛い" },
      { word: "红烧", pinyin: "hóng shāo", meaning: "醤油煮込み（調理法）" }
    ],
  },
  {
    scene: '餐厅忌口',
    scene_ja: '餐厅忌口',
    sceneEmoji: '🥗',
    lines: [
      { speaker: "顾客", chinese: "我对花生过敏，这道菜里有花生吗？", pinyin: "wǒ duì huā shēng guò mǐn ， zhè dào cài lǐ yǒu huā shēng ma ？", japanese: "私はピーナッツアレルギーです。この料理にピーナッツは入っていますか？" },
      { speaker: "服务员", chinese: "没有花生，不过里面有芝麻，您能吃吗？", pinyin: "méi yǒu huā shēng ， bú guò lǐ miàn yǒu zhī ma ， nín néng chī ma ？", japanese: "ピーナッツは入っていませんが、中にゴマがあります。召し上がれますか？" }
    ],
    keyVocabulary: [
      { word: "过敏", pinyin: "guò mǐn", meaning: "アレルギー" },
      { word: "芝麻", pinyin: "zhī ma", meaning: "ゴマ" }
    ],
  },
  {
    scene: '手机丢了',
    scene_ja: '手机丢了',
    sceneEmoji: '📱',
    lines: [
      { speaker: "失主", chinese: "你好，我的手机丢了，能不能帮我打一下？", pinyin: "nǐ hǎo ， wǒ de shǒu jī diū le ， néng bu néng bāng wǒ dǎ yí xià ？", japanese: "すみません、携帯を落としたんです。1回鳴らしてもらえませんか？" },
      { speaker: "路人", chinese: "好，你的号码是多少？", pinyin: "hǎo ， nǐ de hào mǎ shì duō shao ？", japanese: "いいですよ。番号は何番ですか？" }
    ],
    keyVocabulary: [
      { word: "丢", pinyin: "diū", meaning: "落とす、なくす" },
      { word: "号码", pinyin: "hào mǎ", meaning: "番号" }
    ],
  },
  {
    scene: '护照丢了',
    scene_ja: '护照丢了',
    sceneEmoji: '🛂',
    lines: [
      { speaker: "游客", chinese: "警察叔叔，我的护照丢了，怎么办？", pinyin: "jǐng chá shū shu ， wǒ de hù zhào diū le ， zěn me bàn ？", japanese: "お巡りさん、パスポートをなくしました。どうすればいいですか？" },
      { speaker: "警察", chinese: "别急，你先去领事馆补办，然后来派出所开证明。", pinyin: "bié jí ， nǐ xiān qù lǐng shì guǎn bǔ bàn ， rán hòu lái pài chū suǒ kāi zhèng míng 。", japanese: "焦らないで。まず領事館で再発行手続きをしてから、交番で証明書をもらってね。" }
    ],
    keyVocabulary: [
      { word: "护照", pinyin: "hù zhào", meaning: "パスポート" },
      { word: "补办", pinyin: "bǔ bàn", meaning: "再発行する" }
    ],
  }
]

// HSK 3-4 (中级) - 複雑な文構造、日常会話
export const hsk34Dialogues: FallbackDialogue[] = [
  {
    scene: '会社',
    scene_ja: '会社',
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
    scene_ja: '病院',
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
    scene_ja: '銀行',
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
    scene_ja: 'ホテル',
    sceneEmoji: '🏨',
    lines: [
      { speaker: 'A', chinese: '请问房间里有免费的网络吗？', pinyin: 'qǐng wèn fáng jiān lǐ yǒu miǎn fèi de wǎng luò ma ？', japanese: 'お部屋に無料のネットはありますか？' },
      { speaker: 'B', chinese: '有的，密码在房卡上面。退房时间是中午十二点。', pinyin: 'Yǒ u de , mì mǎ zà i fá ngkǎ shà ngmià n . Tuì fá ng shí jiā n shì zhō ngwǔ shí è r diǎ n .', japanese: 'はい、パスワードはルームキーに書いてあります。チェックアウトは正午12時です。' },
    ],
    keyVocabulary: [
      { word: '免费', pinyin: 'miǎ nfè i', meaning: '無料', writingNote: '「免費」と書きますが、日本語の「無料」とは漢字が異なります。', usageNote: '「免费的」で「無料の」という形容詞になります。' },
      { word: '退房', pinyin: 'tuì fá ng', meaning: 'チェックアウト', writingNote: '日本語にはこの表現はありません。', usageNote: 'ホテルでの「退房」は「部屋を出る」という意味です。' },
    ],
  },
  {
    scene: 'デパート',
    scene_ja: 'デパート',
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
    scene_ja: 'スマホ修理',
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
    scene_ja: '面接',
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
    scene_ja: '遅刻',
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
    scene_ja: 'ホテル予約',
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
    scene_ja: '家探し',
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
    scene_ja: '引っ越し',
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
    scene_ja: 'レストラン予約',
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
    scene_ja: '観光案内',
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
    scene_ja: '病院',
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
    scene_ja: '銀行振込',
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
  },
  {
    scene: '同事推卸责任',
    scene_ja: '同事推卸责任',
    sceneEmoji: '🙄',
    lines: [
      { speaker: "同事", chinese: "这个表格你还没做完吗？", pinyin: "zhè gè biǎo gé nǐ hái méi zuò wán ma ？", japanese: "この表、まだ終わってないの？" },
      { speaker: "你", chinese: "你昨天没给我数据，我没法做啊。", pinyin: "nǐ zuó tiān méi gěi wǒ shù jù ， wǒ méi fǎ zuò ā 。", japanese: "昨日データをもらってないから、やりようがないよ。" },
      { speaker: "同事", chinese: "哎呀，我给忘了，现在发你。", pinyin: "āi yā ， wǒ gěi wàng le ， xiàn zài fā nǐ 。", japanese: "おっと、忘れてた。今送るよ。" }
    ],
    keyVocabulary: [
      { word: "没法", pinyin: "méi fǎ", meaning: "〜のしようがない" },
      { word: "数据", pinyin: "shù jù", meaning: "データ" }
    ],
  },
  {
    scene: '办公室摸鱼被抓',
    scene_ja: '办公室摸鱼被抓',
    sceneEmoji: '💻',
    lines: [
      { speaker: "经理", chinese: "小王，看什么呢，这么认真？", pinyin: "xiǎo wáng ， kàn shén me ne ， zhè me rèn zhēn ？", japanese: "王さん、何をそんなに熱心に見てるの？" },
      { speaker: "小王", chinese: "没，没看什么，我在查资料。", pinyin: "méi ， méi kàn shén me ， wǒ zài chá zī liào 。", japanese: "いえ、別に。資料を調べているところです。" },
      { speaker: "经理", chinese: "记得把方案改好，下班前给我。", pinyin: "jì de bǎ fāng àn gǎi hǎo ， xià bān qián gěi wǒ 。", japanese: "企画案を修正して、退勤前までに出してね。" }
    ],
    keyVocabulary: [
      { word: "认真", pinyin: "rèn zhēn", meaning: "真面目、熱心" },
      { word: "方案", pinyin: "fāng àn", meaning: "案、スキーム" }
    ],
  },
  {
    scene: '吐槽公司食堂',
    scene_ja: '吐槽公司食堂',
    sceneEmoji: '🍛',
    lines: [
      { speaker: "A", chinese: "今天食堂又是土豆丝？", pinyin: "jīn tiān shí táng yòu shì tǔ dòu sī ？", japanese: "今日の食堂、またジャガイモの千切り？" },
      { speaker: "B", chinese: "算了，去外面吃吧，我都吃腻了。", pinyin: "suàn le ， qù wài miàn chī ba ， wǒ dōu chī nì le 。", japanese: "もういいよ、外に食べに行こう。食べ飽きちゃった。" }
    ],
    keyVocabulary: [
      { word: "算了", pinyin: "suàn le", meaning: "もういい、切り上げる" },
      { word: "吃腻", pinyin: "chī nì", meaning: "食べ飽きる" }
    ],
  },
  {
    scene: '被不熟的同学借钱',
    scene_ja: '被不熟的同学借钱',
    sceneEmoji: '💸',
    lines: [
      { speaker: "同学", chinese: "老同学，最近手头有点紧，能借点钱吗？", pinyin: "lǎo tóng xué ， zuì jìn shǒu tóu yǒu diǎn jǐn ， néng jiè diǎn qián ma ？", japanese: "同級生よ、最近ちょっと手元が苦しくて、お金貸してくれない？" },
      { speaker: "你", chinese: "哎呀，真不好意思，我刚付了房租，也没钱了。", pinyin: "āi yā ， zhēn bù hǎo yì sī ， wǒ gāng fù le fáng zū ， yě méi qián le 。", japanese: "ああ、本当にごめん。家賃を払ったばかりで、僕もお金がないんだ。" },
      { speaker: "同学", chinese: "好吧，那没事了。", pinyin: "hǎo ba ， nà méi shì le 。", japanese: "わかった、じゃあ大丈夫だよ。" }
    ],
    keyVocabulary: [
      { word: "手头紧", pinyin: "shǒu tóu jǐn", meaning: "手元が苦しい、金欠" },
      { word: "付", pinyin: "fù", meaning: "払う" }
    ],
  },
  {
    scene: '相亲尬聊',
    scene_ja: '相亲尬聊',
    sceneEmoji: '🍵',
    lines: [
      { speaker: "A", chinese: "你平时有什么爱好吗？", pinyin: "nǐ píng shí yǒu shén me ài hào ma ？", japanese: "普段、何か趣味はありますか？" },
      { speaker: "B", chinese: "我喜欢在家里睡觉。", pinyin: "wǒ xǐ huān zài jiā lǐ shuì jiào 。", japanese: "家で寝るのが好きです。" },
      { speaker: "A", chinese: "哦……那挺省钱的。", pinyin: "ò …… nà tǐng shěng qián de 。", japanese: "そうですか……それはお金がかからなくていいですね。" }
    ],
    keyVocabulary: [
      { word: "爱好", pinyin: "ài hào", meaning: "趣味" },
      { word: "省钱", pinyin: "shěng qián", meaning: "節約になる、お金がかからない" }
    ],
  },
  {
    scene: '向医生描述症状',
    scene_ja: '向医生描述症状',
    sceneEmoji: '👨‍⚕️',
    lines: [
      { speaker: "医生", chinese: "哪里不舒服？", pinyin: "nǎ lǐ bù shū fú ？", japanese: "どこが具合悪いですか？" },
      { speaker: "患者", chinese: "我肚子疼得厉害，还一直恶心。", pinyin: "wǒ dù zi téng de lì hài ， hái yì zhí ě xīn 。", japanese: "お腹がひどく痛くて、ずっと吐き気がします。" },
      { speaker: "医生", chinese: "躺下，我给你检查一下。", pinyin: "tǎng xià ， wǒ gěi nǐ jiǎn chá yí xià 。", japanese: "横になって、検査しましょう。" }
    ],
    keyVocabulary: [
      { word: "厉害", pinyin: "lì hài", meaning: "ひどい、激しい" },
      { word: "恶心", pinyin: "ě xīn", meaning: "吐き気がする、ムカムカする" }
    ],
  },
  {
    scene: '确认过敏史（救命句）',
    scene_ja: '确认过敏史（救命句）',
    sceneEmoji: '⚠️',
    lines: [
      { speaker: "医生", chinese: "你有过敏药物吗？", pinyin: "nǐ yǒu guò mǐn yào wù ma ？", japanese: "アレルギーのある薬はありますか？" },
      { speaker: "患者", chinese: "我对青霉素过敏。", pinyin: "wǒ duì qīng méi sù guò mǐn 。", japanese: "ペニシリンにアレルギーがあります。" },
      { speaker: "医生", chinese: "好，那我给你开别的药。", pinyin: "hǎo ， nà wǒ gěi nǐ kāi bié de yào 。", japanese: "わかりました、では別の薬を処方します。" }
    ],
    keyVocabulary: [
      { word: "过敏", pinyin: "guò mǐn", meaning: "アレルギーがある" },
      { word: "青霉素", pinyin: "qīng méi sù", meaning: "ペニシリン" }
    ],
  },
  {
    scene: '染发颜色咨询',
    scene_ja: '染发颜色咨询',
    sceneEmoji: '🎨',
    lines: [
      { speaker: "顾客", chinese: "我想染个颜色，不要太夸张的。", pinyin: "wǒ xiǎng rǎn gè yán sè ， bú yào tài kuā zhāng de 。", japanese: "カラーをしたいのですが、派手すぎない感じで。" },
      { speaker: "发型师", chinese: "这个深棕色怎么样？很显皮肤白。", pinyin: "zhè gè shēn zōng sè zěn me yàng ？ hěn xiǎn pí fū bái 。", japanese: "このダークブラウンはどうですか？肌が白く見えますよ。" },
      { speaker: "顾客", chinese: "行，听你的。", pinyin: "xíng ， tīng nǐ de 。", japanese: "いいですね、お任せします。" }
    ],
    keyVocabulary: [
      { word: "染", pinyin: "rǎn", meaning: "染める" },
      { word: "夸张", pinyin: "kuā zhāng", meaning: "派手、大げさ" }
    ],
  },
  {
    scene: '洗头时的水温',
    scene_ja: '洗头时的水温',
    sceneEmoji: '💆',
    lines: [
      { speaker: "店员", chinese: "水温可以吗？烫不烫？", pinyin: "shuǐ wēn kě yǐ ma ？ tàng bú tàng ？", japanese: "お湯加減はいかがですか？熱くないですか？" },
      { speaker: "顾客", chinese: "有一点烫，请调凉一点。", pinyin: "yǒu yì diǎn tàng ， qǐng tiáo liáng yì diǎn 。", japanese: "少し熱いです。もう少しぬるくしてください。" }
    ],
    keyVocabulary: [
      { word: "水温", pinyin: "shuǐ wēn", meaning: "水温、お湯加減" },
      { word: "烫", pinyin: "tàng", meaning: "（熱すぎて）熱い" }
    ],
  },
  {
    scene: '询问房租与押金',
    scene_ja: '询问房租与押金',
    sceneEmoji: '🏠',
    lines: [
      { speaker: "租客", chinese: "房东，这房子一个月多少钱？押金怎么付？", pinyin: "fáng dōng ， zhè fáng zi yí gè yuè duō shǎo qián ？ yā jīn zěn me fù ？", japanese: "大家さん、この部屋は一ヶ月いくらですか？敷金はどう払いますか？" },
      { speaker: "房东", chinese: "三千块，押一付三，水电费自理。", pinyin: "sān qiān kuài ， yā yī fù sān ， shuǐ diàn fèi zì lǐ 。", japanese: "3000元です。敷金一ヶ月分と家賃三ヶ月分を先払いで、光熱費は自己負担です。" }
    ],
    keyVocabulary: [
      { word: "押一付三", pinyin: "yā yī fù sān", meaning: "一ヶ月分の敷金と三ヶ月分の家賃を先払いする習慣" },
      { word: "自理", pinyin: "zì lǐ", meaning: "自己負担、自分で処理する" }
    ],
  },
  {
    scene: '家里空调坏了',
    scene_ja: '家里空调坏了',
    sceneEmoji: '🛠️',
    lines: [
      { speaker: "租客", chinese: "房东，空调不制冷了，你能找人修一下吗？", pinyin: "fáng dōng ， kōng tiáo bú zhì lěng le ， nǐ néng zhǎo rén xiū yí xià ma ？", japanese: "大家さん、エアコンが冷えなくなりました。誰か修理を呼んでくれますか？" },
      { speaker: "房东", chinese: "你自己先看看电池有没有电，不行我再过去。", pinyin: "nǐ zì jǐ xiān kàn kàn diàn chí yǒu méi yǒu diàn ， bù xíng wǒ zài guò qù 。", japanese: "まずは電池があるか確認して。ダメなら私が行くから。" }
    ],
    keyVocabulary: [
      { word: "制冷", pinyin: "zhì lěng", meaning: "冷房、冷やす" },
      { word: "不行", pinyin: "bù xíng", meaning: "ダメなら、無理なら" }
    ],
  },
  {
    scene: '要求包邮',
    scene_ja: '要求包邮',
    sceneEmoji: '📦',
    lines: [
      { speaker: "买家", chinese: "亲，买两件能包邮吗？", pinyin: "qīn ， mǎi liǎng jiàn néng bāo yóu ma ？", japanese: "すみません、2点買ったら送料無料になりますか？" },
      { speaker: "卖家", chinese: "满九十九元才包邮哦。", pinyin: "mǎn jiǔ shí jiǔ yuán cái bāo yóu ò 。", japanese: "99元以上で送料無料になります。" },
      { speaker: "买家", chinese: "那算了，我再去看看别的。", pinyin: "nà suàn le ， wǒ zài qù kàn kàn bié de 。", japanese: "じゃあいいです、他を見てみます。" }
    ],
    keyVocabulary: [
      { word: "包邮", pinyin: "bāo yóu", meaning: "送料無料" },
      { word: "满", pinyin: "mǎn", meaning: "〜（の金額）に達する" }
    ],
  },
  {
    scene: '快递放驿站',
    scene_ja: '快递放驿站',
    sceneEmoji: '🏪',
    lines: [
      { speaker: "快递员", chinese: "你好，快递给你放菜鸟驿站了。", pinyin: "nǐ hǎo ， kuài dì gěi nǐ fàng cài niǎo yì zhàn le 。", japanese: "もしもし、お荷物は菜鳥駅（宅配ロッカー/取次所）に置いておきました。" },
      { speaker: "顾客", chinese: "能帮我送上楼吗？东西很重。", pinyin: "néng bāng wǒ sòng shàng lóu ma ？ dōng xī hěn zhòng 。", japanese: "部屋まで届けてくれませんか？荷物が重いんです。" },
      { speaker: "快递员", chinese: "行，那你等一下，我待会儿过去。", pinyin: "xíng ， nà nǐ děng yí xià ， wǒ dāi huì r guò qù 。", japanese: "わかりました。少し待ってください、後で行きます。" }
    ],
    keyVocabulary: [
      { word: "驿站", pinyin: "yì zhàn", meaning: "宅配便の取次所" },
      { word: "送上楼", pinyin: "sòng shàng lóu", meaning: "（部屋のある）階上まで届ける" }
    ],
  },
  {
    scene: '手机没流量了',
    scene_ja: '手机没流量了',
    sceneEmoji: '📱',
    lines: [
      { speaker: "租客", chinese: "我的手机没流量了，怎么买叠加包？", pinyin: "wǒ de shǒu jī méi liú liàng le ， zěn me mǎi dié jiā bāo ？", japanese: "スマホのデータ通信量がなくなりました。追加パックはどうやって買いますか？" },
      { speaker: "客服", chinese: "您可以在我们的App里选择流量加油包。", pinyin: "nín kě yǐ zài wǒ men de App lǐ xuǎn zé liú liàng jiā yóu bāo 。", japanese: "弊社のアプリでデータ増量パックを選択いただけます。" }
    ],
    keyVocabulary: [
      { word: "流量", pinyin: "liú liàng", meaning: "データ通信量" },
      { word: "加油包", pinyin: "jiā yóu bāo", meaning: "データ追加パック" }
    ],
  },
  {
    scene: '办理新手机号',
    scene_ja: '办理新手机号',
    sceneEmoji: '🆔',
    lines: [
      { speaker: "顾客", chinese: "我想办一张新的电话卡。", pinyin: "wǒ xiǎng bàn yì zhāng xīn de diàn huà kǎ 。", japanese: "新しいSIMカードを作りたいです。" },
      { speaker: "营业员", chinese: "请出示您的护照，并选择一个套餐。", pinyin: "qǐng chū shì nín de hù zhào ， bìng xuǎn zé yí gè tào cān 。", japanese: "パスポートを提示して、プランを選択してください。" }
    ],
    keyVocabulary: [
      { word: "套餐", pinyin: "tào cān", meaning: "セットメニュー、プラン" },
      { word: "出示", pinyin: "chū shì", meaning: "提示する" }
    ],
  },
  {
    scene: '酒店办理入住',
    scene_ja: '酒店办理入住',
    sceneEmoji: '🏨',
    lines: [
      { speaker: "前台", chinese: "您好，请出示您的预订信息。", pinyin: "nín hǎo ， qǐng chū shì nín de yù dìng xìn xī 。", japanese: "いらっしゃいませ、予約情報を提示してください。" },
      { speaker: "客人", chinese: "我姓张，预订了两晚的大床房。", pinyin: "wǒ xìng zhāng ， yù dìng le liǎng wǎn de dà chuáng fáng 。", japanese: "張です。ダブルルームを二泊で予約しています。" }
    ],
    keyVocabulary: [
      { word: "预订", pinyin: "yù dìng", meaning: "予約する" },
      { word: "大床房", pinyin: "dà chuáng fáng", meaning: "ダブルルーム（キングサイズベッドの部屋）" }
    ],
  },
  {
    scene: 'レストランで会計',
    scene_ja: 'レストランで会計',
    sceneEmoji: '💳',
    lines: [
      { speaker: "顾客", chinese: "服务员，买单！可以刷卡吗？", pinyin: "fú wù yuán ， mǎi dān ！ kě yǐ shuā kǎ ma ？", japanese: "すみません、お会計！カード使えますか？" },
      { speaker: "服务员", chinese: "可以刷卡，也可以扫码支付。", pinyin: "kě yǐ shuā kǎ ， yě kě yǐ sǎo mǎ zhī fù 。", japanese: "カードも使えますし、QRコード決済もできます。" }
    ],
    keyVocabulary: [
      { word: "买单", pinyin: "mǎi dān", meaning: "お会計" },
      { word: "扫码", pinyin: "sǎo mǎ", meaning: "（QRコードを）スキャンする" }
    ],
  },
  {
    scene: '餐厅打包',
    scene_ja: '餐厅打包',
    sceneEmoji: '🥡',
    lines: [
      { speaker: "顾客", chinese: "剩下的菜可以帮我打包吗？", pinyin: "shèng xià de cài kě yǐ bāng wǒ dǎ bāo ma ？", japanese: "残った料理、持ち帰りにできますか？" },
      { speaker: "服务员", chinese: "好的，给您拿个打包盒。", pinyin: "hǎo de ， gěi nín ná ge dǎ bāo hé 。", japanese: "承知しました。テイクアウト用の容器をお持ちします。" }
    ],
    keyVocabulary: [
      { word: "打包", pinyin: "dǎ bāo", meaning: "持ち帰りにする" },
      { word: "打包盒", pinyin: "dǎ bāo hé", meaning: "テイクアウト容器" }
    ],
  },
  {
    scene: '房东涨租',
    scene_ja: '房东涨租',
    sceneEmoji: '📈',
    lines: [
      { speaker: "房东", chinese: "今年房租要涨五百，现在物价都涨了。", pinyin: "jīn nián fáng zū yào zhǎng wǔ bǎi ， xiàn zài wù jià dōu zhǎng le 。", japanese: "今年は家賃を500元上げるよ。今は物価が全部上がってるから。" },
      { speaker: "租客", chinese: "房东，五百太多了，能不能少涨一点？", pinyin: "fáng dōng ， wǔ bǎi tài duō le ， néng bu néng shǎo zhǎng yì diǎn ？", japanese: "大家さん、500は多すぎます。もう少し安くしてもらえませんか？" }
    ],
    keyVocabulary: [
      { word: "涨", pinyin: "zhǎng", meaning: "上がる（価格など）" },
      { word: "房租", pinyin: "fáng zū", meaning: "家賃" }
    ],
  },
  {
    scene: '退房押金',
    scene_ja: '退房押金',
    sceneEmoji: '💰',
    lines: [
      { speaker: "租客", chinese: "我要退房了，押金什么时候能退给我？", pinyin: "wǒ yào tuì fáng le ， yā jīn shén me shí hou néng tuì gěi wǒ ？", japanese: "退去したいんですが、敷金はいつ返してもらえますか？" },
      { speaker: "房东", chinese: "等我看一下房子有没有损坏，没问题的话下周转给你。", pinyin: "děng wǒ kàn yí xià fáng zi yǒu méi yǒu sǔn huài ， méi wèn tí de huà xià zhōu zhuǎn gěi nǐ 。", japanese: "部屋に傷がないか確認してから、問題なければ来週振り込むよ。" }
    ],
    keyVocabulary: [
      { word: "退房", pinyin: "tuì fáng", meaning: "退去する" },
      { word: "押金", pinyin: "yā jīn", meaning: "敷金、保証金" }
    ],
  },
  {
    scene: '房屋维修',
    scene_ja: '房屋维修',
    sceneEmoji: '🔧',
    lines: [
      { speaker: "租客", chinese: "房东，马桶堵了，您能找人来修一下吗？", pinyin: "fáng dōng ， mǎ tǒng dǔ le ， nín néng zhǎo rén lái xiū yí xià ma ？", japanese: "大家さん、トイレが詰まりました。誰か修理に呼んでもらえますか？" },
      { speaker: "房东", chinese: "行，我下午让维修师傅过去看看。", pinyin: "xíng ， wǒ xià wǔ ràng wéi xiū shī fu guò qu kàn kan 。", japanese: "わかった。午後に修理業者に行かせるね。" }
    ],
    keyVocabulary: [
      { word: "堵", pinyin: "dǔ", meaning: "詰まる" },
      { word: "维修", pinyin: "wéi xiū", meaning: "修理、メンテナンス" }
    ],
  },
  {
    scene: '中介看房',
    scene_ja: '中介看房',
    sceneEmoji: '🏠',
    lines: [
      { speaker: "中介", chinese: "这套房子离地铁站很近，采光也好，您要看看吗？", pinyin: "zhè tào fáng zi lí dì tiě zhàn hěn jìn ， cǎi guāng yě hǎo ， nín yào kàn kan ma ？", japanese: "この部屋は駅から近くて、日当たりも良いですよ。見てみますか？" },
      { speaker: "客户", chinese: "好的，我想先看看卧室和厨房。", pinyin: "hǎo de ， wǒ xiǎng xiān kàn kan wò shì hé chú fáng 。", japanese: "はい、まず寝室とキッチンを見たいです。" }
    ],
    keyVocabulary: [
      { word: "采光", pinyin: "cǎi guāng", meaning: "日当たり" },
      { word: "中介", pinyin: "zhōng jiè", meaning: "仲介業者、不動産屋" }
    ],
  },
  {
    scene: '续签合同',
    scene_ja: '续签合同',
    sceneEmoji: '📝',
    lines: [
      { speaker: "房东", chinese: "合同快到期了，你要续签吗？", pinyin: "hé tong kuài dào qī le ， nǐ yào xù qiān ma ？", japanese: "契約がもう切れるけど、更新する？" },
      { speaker: "租客", chinese: "续签的话，房租可以不变吗？", pinyin: "xù qiān de huà ， fáng zū kě yǐ bú biàn ma ？", japanese: "更新する場合、家賃はそのままでいいですか？" }
    ],
    keyVocabulary: [
      { word: "到期", pinyin: "dào qī", meaning: "期限が切れる" },
      { word: "续签", pinyin: "xù qiān", meaning: "更新する（契約を）" }
    ],
  },
  {
    scene: '商场走散',
    scene_ja: '商场走散',
    sceneEmoji: '🛒',
    lines: [
      { speaker: "顾客", chinese: "服务员，我和孩子走散了，能帮我广播一下吗？", pinyin: "fú wù yuán ， wǒ hé hái zi zǒu sàn le ， néng bāng wǒ guǎng bō yí xià ma ？", japanese: "すみません、子供とはぐれました。放送してもらえますか？" },
      { speaker: "工作人员", chinese: "您别着急，孩子的特征是什么？穿什么颜色的衣服？", pinyin: "nín bié zháo jí ， hái zi de tè zhēng shì shén me ？ chuān shén me yán sè de yī fu ？", japanese: "落ち着いてください。お子さんの特徴は？何色の服を着ていますか？" }
    ],
    keyVocabulary: [
      { word: "走散", pinyin: "zǒu sàn", meaning: "はぐれる" },
      { word: "广播", pinyin: "guǎng bō", meaning: "放送する" }
    ],
  },
  {
    scene: '车祸处理',
    scene_ja: '车祸处理',
    sceneEmoji: '🚗',
    lines: [
      { speaker: "司机A", chinese: "你开车怎么不看路！我的车被撞了！", pinyin: "nǐ kāi chē zěn me bú kàn lù ！ wǒ de chē bèi zhuàng le ！", japanese: "運転中、前を見てないのか！僕の車がぶつかったじゃないか！" },
      { speaker: "司机B", chinese: "对不起，是我不小心。我们先拍照留证，再报警吧。", pinyin: "duì bu qǐ ， shì wǒ bù xiǎo xīn 。 wǒ men xiān pāi zhào liú zhèng ， zài bào jǐng ba 。", japanese: "すみません、不注意でした。まず写真を撮って証拠を残して、それから警察を呼びましょう。" }
    ],
    keyVocabulary: [
      { word: "撞", pinyin: "zhuàng", meaning: "ぶつかる" },
      { word: "报警", pinyin: "bào jǐng", meaning: "警察に通報する" }
    ],
  },
  {
    scene: '在商场跟孩子走散了',
    scene_ja: '在商场跟孩子走散了',
    sceneEmoji: '📢',
    lines: [
      { speaker: "家长", chinese: "保安你好，我孩子不见了，能不能帮我广播一下？", pinyin: "bǎo ān nǐ hǎo ， wǒ hái zi bú jiàn le ， néng bù néng bāng wǒ guǎng bō yí xià ？", japanese: "警備員さん、子供がいなくなりました。館内放送をしてもらえませんか？" },
      { speaker: "保安", chinese: "别着急，请告诉我孩子的身高和衣服颜色。", pinyin: "bié zháo jí ， qǐng gào sù wǒ hái zi de shēn gāo hé yī fú yán sè 。", japanese: "落ち着いてください。お子さんの身長と服の色を教えてください。" }
    ],
    keyVocabulary: [
      { word: "走散", pinyin: "zǒu sàn", meaning: "はぐれる" },
      { word: "广播", pinyin: "guǎng bō", meaning: "放送する、アナウンス" }
    ],
  },
  {
    scene: '在陌生城市车坏了',
    scene_ja: '在陌生城市车坏了',
    sceneEmoji: '🚗💥',
    lines: [
      { speaker: "司机", chinese: "师傅，我的车在高速上抛锚了，能帮我拖一下吗？", pinyin: "shī fu ， wǒ de chē zài gāo sù shàng pāo máo le ， néng bāng wǒ tuō yí xià ma ？", japanese: "すみません、高速道路で故障（エンスト）してしまいました。レッカーしてもらえますか？" },
      { speaker: "救援", chinese: "请提供您的具体位置，我们大概一小时到。", pinyin: "qǐng tí gōng nín de jù tǐ wèi zhì ， wǒ men dà gài yì xiǎo shí dào 。", japanese: "具体的な場所を教えてください。一時間ほどで到着します。" }
    ],
    keyVocabulary: [
      { word: "抛锚", pinyin: "pāo máo", meaning: "（車などが）故障して動かなくなる" },
      { word: "拖车", pinyin: "tuō chē", meaning: "レッカー車、牽引する" }
    ],
  },
  {
    scene: '在高铁上坐错位置',
    scene_ja: '在高铁上坐错位置',
    sceneEmoji: '🚄',
    lines: [
      { speaker: "乘客A", chinese: "不好意思，你好像坐了我的位置。", pinyin: "bú hǎo yì sī ， nǐ hǎo xiàng zuò le wǒ de wèi zhì 。", japanese: "すみません、私の席に座られているようです。" },
      { speaker: "乘客B", chinese: "啊，对不起，我看错车厢号了。", pinyin: "ā ， duì bù qǐ ， wǒ kàn cuò chē xiāng hào le 。", japanese: "あ、すみません。車両番号を間違えて見ていました。" }
    ],
    keyVocabulary: [
      { word: "好像", pinyin: "hǎo xiàng", meaning: "〜のようだ" },
      { word: "车厢", pinyin: "chē xiāng", meaning: "車両" }
    ],
  }
]

// HSK 5-6 (高级) - 成語、敬語、委婉表現
export const hsk56Dialogues: FallbackDialogue[] = [
  {
    scene: '商談',
    scene_ja: '商談',
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
    scene_ja: '面接',
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
    scene_ja: '謝罪',
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
    scene_ja: '会食',
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
    scene_ja: '断り',
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
    scene_ja: '環境保護',
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
    scene_ja: 'AI倫理',
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
    scene_ja: 'キャリア',
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
    scene_ja: '教育改革',
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
    scene_ja: '心の健康',
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
    scene_ja: '国際関係',
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
    scene_ja: '技術革新',
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
    scene_ja: '都市化',
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
    scene_ja: '文化遺産',
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
    scene_ja: '金融科技',
    sceneEmoji: '💳',
    lines: [
      { speaker: 'A', chinese: '移动支付的普及极大地改变了我们的消费习惯。', pinyin: 'Yí dòng zhī fù de pǔ jí jí dà de gǎ i bià n le wǒ me n de xiā o fè i xí guà n .', japanese: 'モバイル決済の普及は私たちの消費習慣を大きく変えました。' },
      { speaker: 'B', chinese: '是的。但与此同时，我们也需要关注数据安全和金融稳定问题。', pinyin: 'Shì de . Dà n yǔ cǐ tóng shí , wǒ me n yě xū yà o guā n zhù shù jù ā n quá n hé jī n róng wě n dì ng wè n tí .', japanese: 'そうです。同時に、データセキュリティと金融安定の問題にも注目する必要があります。' },
    ],
    keyVocabulary: [
      { word: '普及', pinyin: 'pǔ jí', meaning: '普及する', writingNote: '「普」= 広い。「及」= 行き渡る。' },
      { word: '稳定', pinyin: 'wě n dì ng', meaning: '安定する', writingNote: '「稳」は日本語では「安定」と言うが、中国語では「稳定」。' },
    ],
  },
  {
    scene: '老板画饼',
    scene_ja: '老板画饼',
    sceneEmoji: '🫓',
    lines: [
      { speaker: "老板", chinese: "大家好好干，明年公司上市发奖金。", pinyin: "dà jiā hǎo hǎo gàn ， míng nián gōng sī shàng shì fā jiǎng jīn 。", japanese: "みんな頑張ろう、来年会社が上場したらボーナスを出すぞ。" },
      { speaker: "员工", chinese: "老板，这句话您去年也说过。", pinyin: "lǎo bǎn ， zhè jù huà nín qù nián yě shuō guò 。", japanese: "社長、その言葉、去年も仰ってましたよ。" },
      { speaker: "老板", chinese: "今年情况不同，要有信心。", pinyin: "jīn nián qíng kuàng bù tóng ， yào yǒu xìn xīn 。", japanese: "今年は状況が違うんだ、自信を持ちなさい。" }
    ],
    keyVocabulary: [
      { word: "上市", pinyin: "shàng shì", meaning: "上場する" },
      { word: "画饼", pinyin: "huà bǐng", meaning: "絵に描いた餅（実現しない約束）" }
    ],
  },
  {
    scene: '委婉拒绝不合理要求',
    scene_ja: '委婉拒绝不合理要求',
    sceneEmoji: '🤐',
    lines: [
      { speaker: "甲方", chinese: "这个设计明天早上必须给我。", pinyin: "jiǎ fāng ， zhè gè shè jì míng tiān zǎo shàng bì xū gěi wǒ 。", japanese: "このデザイン、明日の朝までに必ず出してください。" },
      { speaker: "乙方", chinese: "这恐怕有点难度，细节还没对齐。", pinyin: "zhè kǒng pà yǒu diǎn nán dù ， xì jié hái méi duì qí 。", japanese: "それは恐らく難しいです、詳細の調整がまだ終わっていません。" },
      { speaker: "甲方", chinese: "想想办法，老板催得很紧。", pinyin: "xiǎng xiǎng bàn fǎ ， lǎo bǎn cuī de hěn jǐn 。", japanese: "何とかしてください、社長の催促が激しいんです。" }
    ],
    keyVocabulary: [
      { word: "恐怕", pinyin: "kǒng pà", meaning: "恐らく、〜ではないかと思う" },
      { word: "对齐", pinyin: "duì qí", meaning: "（情報を）合わせる、同期する" }
    ],
  },
  {
    scene: '帰省で結婚催促',
    scene_ja: '帰省で結婚催促',
    sceneEmoji: '🧨',
    lines: [
      { speaker: "亲戚", chinese: "老大不小了，怎么还不谈对象啊？", pinyin: "lǎo dà bù xiǎo le ， zěn me hái bù tán duì xiàng ā ？", japanese: "もういい年なんだから、どうしてまだ恋人を作らないの？" },
      { speaker: "你", chinese: "我不着急，想先以事业为重。", pinyin: "wǒ bù zháo jí ， xiǎng xiān yǐ shì yè wéi zhòng 。", japanese: "急いでないんです、まずは仕事を優先したくて。" },
      { speaker: "亲戚", chinese: "事业要紧，成家也重要啊！", pinyin: "shì yè yào jǐn ， chéng jiā yě zhòng yào ā ！", japanese: "仕事も大事だけど、家庭を持つのも重要だよ！" }
    ],
    keyVocabulary: [
      { word: "老大不小", pinyin: "lǎo dà bù xiǎo", meaning: "もういい年だ、大人だ" },
      { word: "谈对象", pinyin: "tán duì xiàng", meaning: "付き合う、恋人を作る" }
    ],
  },
  {
    scene: '聚餐被劝酒',
    scene_ja: '聚餐被劝酒',
    sceneEmoji: '🍶',
    lines: [
      { speaker: "张总", chinese: "小李，这杯必须喝，不喝就是不给我面子。", pinyin: "xiǎo lǐ ， zhè bēi bì xū hē ， bù hē jiù shì bù gěi wǒ miàn zi 。", japanese: "李くん、この一杯は飲まないと。飲まないのは僕の顔を潰すことになるよ。" },
      { speaker: "小李", chinese: "张总您误会了，我真的酒精过敏，实在不能喝。", pinyin: "zhāng zǒng nín wù huì le ， wǒ zhēn de jiǔ jīng guò mǐn ， shí zài bù néng hē 。", japanese: "張社長、誤解ですよ。本当にアルコールアレルギーで、どうしても飲めないんです。" },
      { speaker: "张总", chinese: "行吧，那这次就饶了你。", pinyin: "xíng ba ， nà zhè cì jiù ráo le nǐ 。", japanese: "いいよ、じゃあ今回は勘弁してやる。" }
    ],
    keyVocabulary: [
      { word: "给面子", pinyin: "gěi miàn zi", meaning: "顔を立てる、敬意を払う" },
      { word: "饶", pinyin: "ráo", meaning: "許す、勘弁する" }
    ],
  },
  {
    scene: '询问药效与副作用',
    scene_ja: '询问药效与副作用',
    sceneEmoji: '📝',
    lines: [
      { speaker: "患者", chinese: "这药会有副作用吗？", pinyin: "zhè yào huì yǒu fù zuò yòng ma ？", japanese: "この薬に副作用はありますか？" },
      { speaker: "医生", chinese: "可能会引起嗜睡，服药后不要开车。", pinyin: "kě néng huì yǐn qǐ shì shuì ， fú yào hòu bú yào kāi chē 。", japanese: "眠気を引き起こす可能性があるので、服用後の運転は避けてください。" },
      { speaker: "患者", chinese: "明白了，那一天吃几次？", pinyin: "míng bái le ， nà yì tiān chī jǐ cì ？", japanese: "わかりました。一日何回飲みますか？" }
    ],
    keyVocabulary: [
      { word: "副作用", pinyin: "fù zuò yòng", meaning: "副作用" },
      { word: "嗜睡", pinyin: "shì shuì", meaning: "嗜睡、ひどい眠気" }
    ],
  },
  {
    scene: '抗议剪得太短了',
    scene_ja: '抗议剪得太短了',
    sceneEmoji: '😱',
    lines: [
      { speaker: "顾客", chinese: "哎呀！你怎么剪了这么多？太短了！", pinyin: "āi yā ！ nǐ zěn me jiǎn le zhè me duō ？ tài duǎn le ！", japanese: "ちょっと！あんなに切ってって言ったのに！短すぎます！" },
      { speaker: "理发师", chinese: "这样显得精神。而且发质受损严重，必须剪掉。", pinyin: "zhè yàng xiǎn de jīng shén 。 ér qiě fà zhì shòu sǔn yán zhòng ， bì xū jiǎn diào 。", japanese: "この方がスッキリ見えますよ。それに毛先が傷んでいたので、切る必要がありました。" },
      { speaker: "顾客", chinese: "可这跟我想要的发型完全不一样！", pinyin: "kě zhè gēn wǒ xiǎng yào de fā xíng wán quán bù yī yàng ！", japanese: "でも、私の希望してたスタイルと全然違います！" }
    ],
    keyVocabulary: [
      { word: "显精神", pinyin: "xiǎn jīng shén", meaning: "（髪型などで）元気に見える、ハツラツとする" },
      { word: "发质", pinyin: "fà zhì", meaning: "髪質" }
    ],
  },
  {
    scene: '关于退还押金的争吵',
    scene_ja: '关于退还押金的争吵',
    sceneEmoji: '😠',
    lines: [
      { speaker: "租客", chinese: "我要退房了，请把押金退给我。", pinyin: "wǒ yào tuì fáng le ， qǐng bǎ yā jīn tuì gěi wǒ 。", japanese: "退去するので、敷金を返してください。" },
      { speaker: "房东", chinese: "墙面弄得这么脏，得扣五百块清洁费。", pinyin: "qiáng miàn nòng de zhè me zàng ， děi kòu wǔ bǎi kuài qīng jié fèi 。", japanese: "壁をこんなに汚して。クリーニング代として500元差し引きますよ。" },
      { speaker: "租客", chinese: "那是正常的磨损，你这是乱收费！", pinyin: "nà shì zhèng cháng de mó sǔn ， nǐ zhè shì luàn shōu fèi ！", japanese: "それは通常の使用による摩耗です。不当な請求だ！" }
    ],
    keyVocabulary: [
      { word: "磨损", pinyin: "mó sǔn", meaning: "摩耗、すり減り" },
      { word: "乱收费", pinyin: "luàn shōu fèi", meaning: "不当な料金請求" }
    ],
  },
  {
    scene: '商量搬家的时间',
    scene_ja: '商量搬家的时间',
    sceneEmoji: '🚚',
    lines: [
      { speaker: "A", chinese: "搬家公司约好了吗？几点能到？", pinyin: "bān jiā gōng sī yuē hǎo le ma ？ jǐ diǎn néng dào ？", japanese: "引っ越し業者の予約は済んだ？何時に着くって？" },
      { speaker: "B", chinese: "约了明天上午十点，他们负责打包和运输。", pinyin: "yuē le míng tiān shàng wǔ shí diǎn ， tā men fù zé dǎ bāo hé yùn shū 。", japanese: "明日午前10時に予約したよ。荷造りと運搬をやってくれるんだ。" }
    ],
    keyVocabulary: [
      { word: "打包", pinyin: "dǎ bāo", meaning: "荷造りする、梱包する" },
      { word: "运输", pinyin: "yùn shū", meaning: "運搬、輸送" }
    ],
  },
  {
    scene: '航班延误改签',
    scene_ja: '航班延误改签',
    sceneEmoji: '✈️',
    lines: [
      { speaker: "旅客", chinese: "我的航班延误了，能帮我改签到下一班吗？", pinyin: "wǒ de háng bān yán wù le ， néng bāng wǒ gǎi qiān dào xià yì bān ma ？", japanese: "私の便が遅延しました。次の便に振り替えてもらえますか？" },
      { speaker: "客服", chinese: "抱歉，由于天气原因，后续航班也都满员了。", pinyin: "bào qiàn ， yóu yú tiān qì yuán yīn ， hòu xù háng bān yě dōu mǎn yuán le 。", japanese: "申し訳ありません、天候の影響で、後続の便もすべて満席です。" }
    ],
    keyVocabulary: [
      { word: "改签", pinyin: "gǎi qiān", meaning: "（チケットを）変更する、振り替える" },
      { word: "延误", pinyin: "yán wù", meaning: "（交通機関が）遅延する" }
    ],
  },
  {
    scene: '餐厅投诉',
    scene_ja: '餐厅投诉',
    sceneEmoji: '😤',
    lines: [
      { speaker: "顾客", chinese: "这道菜味道不太对，是不是盐放多了？", pinyin: "zhè dào cài wèi dào bú tài duì ， shì bu shì yán fàng duō le ？", japanese: "この料理、味がおかしいです。塩を入れすぎたんじゃないですか？" },
      { speaker: "经理", chinese: "抱歉，我帮您换一份，或者给您免单。", pinyin: "bào qiàn ， wǒ bāng nín huàn yí fèn ， huò zhě gěi nín miǎn dān 。", japanese: "申し訳ございません。お取り替えします。または無料にさせていただきます。" }
    ],
    keyVocabulary: [
      { word: "味道", pinyin: "wèi dào", meaning: "味/風味" },
      { word: "免单", pinyin: "miǎn dān", meaning: "無料にする、勘弁する" }
    ],
  },
  {
    scene: '告白',
    scene_ja: '告白',
    sceneEmoji: '💕',
    lines: [
      { speaker: "男生", chinese: "其实我一直想跟你说……我喜欢你很久了。", pinyin: "qí shí wǒ yì zhí xiǎng gēn nǐ shuō … … wǒ xǐ huan nǐ hěn jiǔ le 。", japanese: "実はずっと言いたかったんだ……君のことがずっと好きだった。" },
      { speaker: "女生", chinese: "我……我没想到你会这么说，让我考虑一下好吗？", pinyin: "wǒ … … wǒ méi xiǎng dào nǐ huì zhè me shuō ， ràng wǒ kǎo lǜ yí xià hǎo ma ？", japanese: "私……そんな風に言われるとは思ってなかった。考えさせてくれない？" }
    ],
    keyVocabulary: [
      { word: "其实", pinyin: "qí shí", meaning: "実は" },
      { word: "没想到", pinyin: "méi xiǎng dào", meaning: "思っていなかった" }
    ],
  },
  {
    scene: '吵架',
    scene_ja: '吵架',
    sceneEmoji: '😤',
    lines: [
      { speaker: "女朋友", chinese: "你总是这样，从来不把我的话当回事！", pinyin: "nǐ zǒng shì zhè yàng ， cóng lái bù bǎ wǒ de huà dāng huí shì ！", japanese: "いつもこうだよね。私の話を全く聞いてない！" },
      { speaker: "男朋友", chinese: "我没有不当回事，只是你每次都那么敏感！", pinyin: "wǒ méi yǒu bù dāng huí shì ， zhǐ shì nǐ měi cì dōu nà me mǐn gǎn ！", japanese: "聞いてないわけじゃない。ただ君が毎回過剰に反応するんだよ！" }
    ],
    keyVocabulary: [
      { word: "当回事", pinyin: "dāng huí shì", meaning: "真剣に受け止める" },
      { word: "敏感", pinyin: "mǐn gǎn", meaning: "敏感、過剰反応" }
    ],
  },
  {
    scene: '冷战',
    scene_ja: '冷战',
    sceneEmoji: '🥶',
    lines: [
      { speaker: "男生", chinese: "你还在生我的气吗？我们谈谈好不好？", pinyin: "nǐ hái zài shēng wǒ de qì ma ？ wǒ men tán tan hǎo bu hǎo ？", japanese: "まだ怒ってる？話そうよ。" },
      { speaker: "女生", chinese: "没什么好谈的，你先冷静几天再说吧。", pinyin: "méi shén me hǎo tán de ， nǐ xiān lěng jìng jǐ tiān zài shuō ba 。", japanese: "話すことなんてない。まずは数日冷静になってからにして。" }
    ],
    keyVocabulary: [
      { word: "冷战", pinyin: "lěng zhàn", meaning: "冷戦（口を利かない状態）" },
      { word: "冷静", pinyin: "lěng jìng", meaning: "落ち着く、冷静になる" }
    ],
  },
  {
    scene: '求婚',
    scene_ja: '求婚',
    sceneEmoji: '💍',
    lines: [
      { speaker: "男生", chinese: "这些年和你在一起是我最幸福的时光，你愿意嫁给我吗？", pinyin: "zhè xiē nián hé nǐ zài yì qǐ shì wǒ zuì xìng fú de shí guāng ， nǐ yuàn yì jià gěi wǒ ma ？", japanese: "この数年、君と一緒にいられたのは最高に幸せな時間だった。僕と結婚してくれない？" },
      { speaker: "女生", chinese: "我愿意！我会一直陪在你身边。", pinyin: "wǒ yuàn yì ！ wǒ huì yì zhí péi zài nǐ shēn biān 。", japanese: "いいよ！ずっとあなたのそばにいるね。" }
    ],
    keyVocabulary: [
      { word: "求婚", pinyin: "qiú hūn", meaning: "プロポーズ" },
      { word: "愿意", pinyin: "yuàn yì", meaning: "～したい、喜んで～する" }
    ],
  },
  {
    scene: '见家长',
    scene_ja: '见家长',
    sceneEmoji: '👨‍👩‍👧',
    lines: [
      { speaker: "阿姨", chinese: "小伙子，你在哪里工作？收入怎么样？", pinyin: "xiǎo huǒ zi ， nǐ zài nǎ lǐ gōng zuò ？ shōu rù zěn me yàng ？", japanese: "お兄さん、どこで働いてるの？収入はどのくらい？" },
      { speaker: "男生", chinese: "阿姨好，我在一家互联网公司做工程师，收入还算稳定。", pinyin: "ā yí hǎo ， wǒ zài yì jiā hù lián wǎng gōng sī zuò gōng chéng shī ， shōu rù hái suàn wěn dìng 。", japanese: "おばさん、こんにちは。IT企業でエンジニアをしています。収入はまあ安定しています。" }
    ],
    keyVocabulary: [
      { word: "小伙子", pinyin: "xiǎo huǒ zi", meaning: "若者（若い男性への呼び方）" },
      { word: "稳定", pinyin: "wěn dìng", meaning: "安定している" }
    ],
  },
  {
    scene: '行李延误',
    scene_ja: '行李延误',
    sceneEmoji: '🧳',
    lines: [
      { speaker: "乘客", chinese: "我的行李没出来，能帮我查一下吗？", pinyin: "wǒ de xíng li méi chū lái ， néng bāng wǒ chá yí xià ma ？", japanese: "荷物が出てこないんですが、調べてもらえますか？" },
      { speaker: "地勤", chinese: "您的行李可能在下一班航班，请您填一下这个单子，送到酒店后我们会通知您。", pinyin: "nín de xíng li kě néng zài xià yì bān háng bān ， qǐng nín tián yí xià zhè ge dān zi ， sòng dào jiǔ diàn hòu wǒ men huì tōng zhī nín 。", japanese: "お客様の荷物は次の便に載っている可能性があります。この用紙に記入してください。ホテルに届いたらお知らせします。" }
    ],
    keyVocabulary: [
      { word: "行李", pinyin: "xíng li", meaning: "荷物" },
      { word: "航班", pinyin: "háng bān", meaning: "便（フライト）" }
    ],
  },
  {
    scene: '钱包被偷',
    scene_ja: '钱包被偷',
    sceneEmoji: '💸',
    lines: [
      { speaker: "游客", chinese: "我的钱包被偷了！里面有护照和银行卡！", pinyin: "wǒ de qián bāo bèi tōu le ！ lǐ miàn yǒu hù zhào hé yín háng kǎ ！", japanese: "財布が盗まれました！中にパスポートと銀行のカードが入ってます！" },
      { speaker: "警察", chinese: "别着急，您先去银行挂失，然后来派出所做笔录。", pinyin: "bié zháo jí ， nín xiān qù yín háng guà shī ， rán hòu lái pài chū suǒ zuò bǐ lù 。", japanese: "焦らないで。まず銀行で紛失届を出してから、交番で調書を作りましょう。" }
    ],
    keyVocabulary: [
      { word: "偷", pinyin: "tōu", meaning: "盗む" },
      { word: "挂失", pinyin: "guà shī", meaning: "紛失届を出す" }
    ],
  },
  {
    scene: '询问是否需要空腹抽血',
    scene_ja: '询问是否需要空腹抽血',
    sceneEmoji: '💉',
    lines: [
      { speaker: "患者", chinese: "护士，我明天抽血需要空腹吗？", pinyin: "hù shi ， wǒ míng tiān chōu xuě xū yào kōng fù ma ？", japanese: "看護師さん、明日の採血は空腹（絶食）である必要がありますか？" },
      { speaker: "护士", chinese: "是的，今晚十二点以后不要吃东西，水也要少喝。", pinyin: "shì de ， jīn wǎn shí èr diǎn yǐ hòu bú yào chī dōng xī ， shuǐ yě yào shǎo hē 。", japanese: "はい、今夜12時以降は何も食べないでください。水も控えてください。" }
    ],
    keyVocabulary: [
      { word: "空腹", pinyin: "kōng fù", meaning: "空腹、絶食状態" },
      { word: "抽血", pinyin: "chōu xuě", meaning: "採血する" }
    ],
  },
  {
    scene: '咨询医疗保险理赔',
    scene_ja: '咨询医疗保险理赔',
    sceneEmoji: '📄',
    lines: [
      { speaker: "患者", chinese: "医生，请帮我开一下诊断证明，我要办保险理赔。", pinyin: "yī shēng ， qǐng bāng wǒ kāi yí xià zhěn duàn zhèng míng ， wǒ yào bàn bǎo xiǎn lǐ péi 。", japanese: "先生、診断書を書いてください。保険金の請求（理賠）をしたいんです。" },
      { speaker: "医生", chinese: "没问题，拿着这个单子去窗口盖章就行。", pinyin: "méi wèn tí ， ná zhe zhè gè dān zi qù chuāng kǒu gài zhāng jiù xíng 。", japanese: "わかりました。この書類を持って窓口で押印してもらってください。" }
    ],
    keyVocabulary: [
      { word: "理赔", pinyin: "lǐ péi", meaning: "（保険などの）請求、支払い手続き" },
      { word: "盖章", pinyin: "gài zhāng", meaning: "押印する、スタンプを押す" }
    ],
  },
  {
    scene: '护照丢了去领事馆',
    scene_ja: '护照丢了去领事馆',
    sceneEmoji: '🛂',
    lines: [
      { speaker: "游客", chinese: "我的护照丢了，明天就要回国了，能办紧急旅行证吗？", pinyin: "wǒ de hù zhào diū le ， míng tiān jiù yào huí guó le ， néng bàn jǐn jí lǚ xíng zhèng ma ？", japanese: "パスポートを紛失しました。明日帰国予定なのですが、緊急旅行証を発行できますか？" },
      { speaker: "工作人员", chinese: "你需要先去警察局报案，拿着报案回执再来这里。", pinyin: "nǐ xū yào xiān qù jǐng chá jú bào àn ， ná zhe bào àn huí zhí zài lái zhè lǐ 。", japanese: "まず警察署へ行って届け出てください。その受理証を持ってここに来てください。" }
    ],
    keyVocabulary: [
      { word: "领事馆", pinyin: "lǐng shì guǎn", meaning: "領事館" },
      { word: "回执", pinyin: "huí zhí", meaning: "受領書、控え" }
    ],
  },
  {
    scene: '老板在群里画饼',
    scene_ja: '老板在群里画饼',
    sceneEmoji: '🫓',
    lines: [
      { speaker: "老板", chinese: "只要大家今年再加把劲，公司明年带大家去团建。", pinyin: "zhǐ yào dà jiā jīn nián zài jiā bǎ jìn ， gōng sī míng nián dài dà jiā qù tuán jiàn 。", japanese: "今年みんなでもう一踏ん張りすれば、来年は社員旅行に連れて行くよ。" },
      { speaker: "员工", chinese: "这句话您去年也说过，后来怎么没下文了？", pinyin: "zhè jù huà nín qù nián yě shuō guò ， hòu lái zěn me méi xià wén le ？", japanese: "そのセリフ、去年も聞きましたけど、その後どうなったんでしたっけ？" }
    ],
    keyVocabulary: [
      { word: "画饼", pinyin: "huà bǐng", meaning: "実現不可能な約束をする（絵に描いた餅）" },
      { word: "没下文", pinyin: "méi xià wén", meaning: "立ち消えになる、音沙汰がない" }
    ],
  },
  {
    scene: '健身房私教推销',
    scene_ja: '健身房私教推销',
    sceneEmoji: '💪',
    lines: [
      { speaker: "教练", chinese: "美女，看你动作不太标准，要不要试听一下我的私教课？", pinyin: "měi nǚ ， kàn nǐ dòng zuò bú tài biāo zhǔn ， yào bú yào shì tīng yí xià wǒ de sī jiào kè ？", japanese: "そこの方、フォームが少し乱れていますね。私のパーソナルレッスンを体験してみませんか？" },
      { speaker: "你", chinese: "不用了，我就是随便练练，没打算办卡。", pinyin: "bú yòng le ， wǒ jiù shì suí biàn liàn liàn ， méi dǎ suàn bàn kǎ 。", japanese: "結構です。適当に体を動かしているだけなので、入会するつもりはありません。" }
    ],
    keyVocabulary: [
      { word: "私教", pinyin: "sī jiào", meaning: "パーソナルトレーナー" },
      { word: "办卡", pinyin: "bàn kǎ", meaning: "（ジムなどの）会員カードを作る、入会する" }
    ],
  },
  {
    scene: '委婉拒绝加班',
    scene_ja: '委婉拒绝加班',
    sceneEmoji: '🌙',
    lines: [
      { speaker: "领导", chinese: "小王，这个方案今晚得赶出来，辛苦一下？", pinyin: "xiǎo wáng ， zhè gè fāng àn jīn wǎn děi gǎn chū lái ， xīn kǔ yí xià ？", japanese: "王君、この案を今晩中に仕上げてほしいんだ。悪いね？" },
      { speaker: "小王", chinese: "真抱歉领导，我今晚家里有点急事，恐怕处理不了。", pinyin: "zhēn bào qiàn lǐng dǎo ， wǒ jīn wǎn jiā lǐ yǒu diǎn jí shì ， kǒng pà chǔ lǐ bù liǎo 。", japanese: "申し訳ありません。今夜は家庭で急用がありまして、対応できそうにありません。" }
    ],
    keyVocabulary: [
      { word: "赶出来", pinyin: "gǎn chū lái", meaning: "（急いで）仕上げる" },
      { word: "恐怕", pinyin: "kǒng pà", meaning: "恐らく〜（できない）だろう" }
    ],
  },
  {
    scene: '同事推卸责任',
    scene_ja: '同事推卸责任',
    sceneEmoji: '🙄',
    lines: [
      { speaker: "A", chinese: "这个错误明明是你负责的部分，为什么要推给我？", pinyin: "zhè gè cuò wù míng míng shì nǐ fù zé de bù fèn ， wèi shén me yào tuī gěi wǒ ？", japanese: "このミスは明らかに君の担当部分なのに、どうして僕のせいにすんだよ？" },
      { speaker: "B", chinese: "我也是按你的模板做的，出问题大家都有责任吧。", pinyin: "wǒ yě shì àn nǐ de mú bǎn zuò de ， chū wèn tí dà jiā dōu yǒu zé rèn ba 。", japanese: "僕も君のテンプレート通りにやったんだ。問題が出たらお互い様だろ？" }
    ],
    keyVocabulary: [
      { word: "推卸", pinyin: "tuī xiè", meaning: "（責任を）逃れる、転嫁する" },
      { word: "模板", pinyin: "mú bǎn", meaning: "テンプレート" }
    ],
  },
  {
    scene: '被吐槽食堂难吃',
    scene_ja: '被吐槽食堂难吃',
    sceneEmoji: '🥣',
    lines: [
      { speaker: "同事", chinese: "这食堂的饭简直难以下咽，老板怎么想的？", pinyin: "zhè shí táng de fàn jiǎn zhí nán yǐ xià yàn ， lǎo bǎn zěn me xiǎng de ？", japanese: "この食堂の飯、マジで食えたもんじゃないな。社長は何を考えてんだ？" },
      { speaker: "你", chinese: "省钱呗，反正他自己又不在这里吃。", pinyin: "shěng qián bei ， fǎn zhèng tā zì jǐ yòu bú zài zhè lǐ chī 。", japanese: "コスト削減だよ。どうせ自分はここで食べないんだから。" }
    ],
    keyVocabulary: [
      { word: "难以下咽", pinyin: "nán yǐ xià yàn", meaning: "（まずくて）飲み込みにくい" },
      { word: "反正", pinyin: "fǎn zhèng", meaning: "どうせ、いずれにせよ" }
    ],
  },
  {
    scene: '委婉拒绝老板的画饼',
    scene_ja: '委婉拒绝老板的画饼',
    sceneEmoji: '🥯',
    lines: [
      { speaker: "老板", chinese: "只要你今年肯努力，明年给你涨薪百分之五十。", pinyin: "zhǐ yào nǐ jīn nián kěn nǔ lì ， míng nián gěi nǐ zhǎng xīn bǎi fēn zhī wǔ shí 。", japanese: "今年頑張れば、来年は給料を50％アップしてあげるよ。" },
      { speaker: "你", chinese: "谢谢老板。但我更希望现在的工资能按时发放。", pinyin: "xiè xie lǎo bǎn 。 dàn wǒ gèng xī wàng xiàn zài de gōng zī néng àn shí fā fàng 。", japanese: "ありがとうございます。ですが、今はまず今の給料が遅れずに支払われることを願っています。" }
    ],
    keyVocabulary: [
      { word: "按时", pinyin: "àn shí", meaning: "時間通りに" },
      { word: "发放", pinyin: "fā fàng", meaning: "（給与を）支給する" }
    ],
  },
  {
    scene: '职场八卦',
    scene_ja: '职场八卦',
    sceneEmoji: '🍉',
    lines: [
      { speaker: "同事A", chinese: "听说了吗？财务部的老张要跳槽了。", pinyin: "tīng shuō le ma ？ cái wù bù de lǎo zhāng yào tiào cáo le 。", japanese: "聞いた？財務部の張さんが転職するらしいよ。" },
      { speaker: "同事B", chinese: "真的假的？他不是才升职吗，怎么又要走？", pinyin: "zhēn de jiǎ de ？ tā bú shì cái shēng zhí ma ， zěn me yòu yào zǒu ？", japanese: "本当？彼は最近昇進したばかりじゃないの、なんでまた辞めるの？" }
    ],
    keyVocabulary: [
      { word: "跳槽", pinyin: "tiào cáo", meaning: "（会社・職種を）乗り換える跳槽" },
      { word: "升职", pinyin: "shēng zhí", meaning: "昇進する" }
    ],
  },
  {
    scene: '被要求周末加班',
    scene_ja: '被要求周末加班',
    sceneEmoji: '😤',
    lines: [
      { speaker: "领导", chinese: "这周有个紧急项目，周末大家克服一下。", pinyin: "zhè zhōu yǒu gè jǐn jí xiàng mù ， zhōu mò dà jiā kè fú yí xià 。", japanese: "今週中に緊急プロジェクトがあるんだ。週末、みんな頑張って。" },
      { speaker: "你", chinese: "这已经是连续第三个周末了，我的年假还没休过呢。", pinyin: "zhè yǐ jīng shì lián xù dì sān gè zhōu mò le ， wǒ de nián jià hái méi xiū guò ne 。", japanese: "もう連続で3週連続の週末出勤だよ。有給もまだ一回も取ってないのに。" }
    ],
    keyVocabulary: [
      { word: "克服", pinyin: "kè fú", meaning: "我慢する、克服する" },
      { word: "年假", pinyin: "nián jià", meaning: "年次休暇、有給" }
    ],
  },
  {
    scene: '工作群里发错消息',
    scene_ja: '工作群里发错消息',
    sceneEmoji: '😅',
    lines: [
      { speaker: "你", chinese: "不好意思，刚才那条消息是发错群了，请忽略。", pinyin: "bú hǎo yì si ， gāng cái nà tiáo xiāo xī shì fā cuò qún le ， qǐng hū luè 。", japanese: "すみません、さっきのメッセージは間違えて別のグループに送っちゃいました。無視してください。" },
      { speaker: "同事", chinese: "哈哈哈没事，我都准备去参加party了。", pinyin: "hā hā hā méi shì ， wǒ dōu zhǔn bèi qù cān jiā party le 。", japanese: "ははは大丈夫だよ。むしろ俺、パーティーの準備し始めてた所だった。" }
    ],
    keyVocabulary: [
      { word: "发错群", pinyin: "fā cuò qún", meaning: "（LINEなどの）グループに間違えて送信する" },
      { word: "忽略", pinyin: "hū luè", meaning: "無視する" }
    ],
  },
  {
    scene: '被同事阴阳怪气',
    scene_ja: '被同事阴阳怪气',
    sceneEmoji: '😏',
    lines: [
      { speaker: "同事", chinese: "哎呀，你PPT做得真快呀，不愧是卷王呢！", pinyin: "āi yā ， nǐ PPT zuò de zhēn kuài ya ， bú kuì shì juàn wáng ne ！", japanese: "おやおや、PPT的制作が早いね〜。やっぱりキミは努力の人だね！" },
      { speaker: "你", chinese: "彼此彼此，你不也在领导面前表现得很积极吗？", pinyin: "bǐ cǐ bǐ cǐ ， nǐ bù yě zài lǐng dǎo miàn qián biǎo xiàn de hěn jī jí ma ？", japanese: "お互い様でしょ。キミだって上司の前ではっぴょっぴろ？" }
    ],
    keyVocabulary: [
      { word: "卷王", pinyin: "juǎn wáng", meaning: "激烈に 경쟁하는 사람（過劳競争 genshin" },
      { word: "阴阳怪气", pinyin: "yīn yáng guài qì", meaning: "嫌味、皮肉を言う" }
    ],
  },
  {
    scene: '汇报工作时被打断',
    scene_ja: '汇报工作时被打断',
    sceneEmoji: '🤷',
    lines: [
      { speaker: "你", chinese: "关于这个方案，我们已经做了详细的市场调研，结果显示——", pinyin: "guān yú zhè gè fāng àn ， wǒ men yǐ jīng zuò le xiáng xì de shì chǎng diào yán ， jié guǒ xiǎn shì ——", japanese: "この方案については、すでに詳しい市場調査を行っており、結果は——" },
      { speaker: "领导", chinese: "直接说结论吧，时间有限。", pinyin: "zhí jiē shuō jié lùn ba ， shí jiān yǒu xiàn 。", japanese: "結論直接从言ってください。時間が限られてるので。" }
    ],
    keyVocabulary: [
      { word: "汇报", pinyin: "huì bào", meaning: "（上司に）報告する" },
      { word: "调研", pinyin: "diào yán", meaning: "調査研究" }
    ],
  },
  {
    scene: '迟到被领导发现',
    scene_ja: '迟到被领导发现',
    sceneEmoji: '🕐',
    lines: [
      { speaker: "领导", chinese: "小李，今天又迟到了，这个月第几次了？", pinyin: "xiǎo lǐ ， jīn tiān yòu chí dào le ， zhè gè yuè dì jǐ cì le ？", japanese: "李さん、今日はまた遅刻？今月何度目？" },
      { speaker: "你", chinese: "路上堵车了，我明天一定早点出发。", pinyin: "lù shàng dǔ chē le ， wǒ míng tiān yí dìng zǎo diǎn chū fā 。", japanese: "途中で込んでいるんです。明日こそ早く出発します。" }
    ],
    keyVocabulary: [
      { word: "迟到", pinyin: "chí dào", meaning: "遅刻する" },
      { word: "堵车", pinyin: "dǔ chē", meaning: "交通渋滞" }
    ],
  }
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

// ============================================================
// Scene Map — O(1) 查找，替代 findIndex O(n)
// ============================================================

/** 按 scene（中文）作为 key 的 Map，查找 O(1) */
export const SCENE_MAP: ReadonlyMap<string, FallbackDialogue> = new Map([
  ...hsk12Dialogues.map(d => [d.scene, d] as const),
  ...hsk34Dialogues.map(d => [d.scene, d] as const),
  ...hsk56Dialogues.map(d => [d.scene, d] as const),
])

/** 按 scene_ja（日语）作为 key 的 Map */
export const SCENE_JA_MAP: ReadonlyMap<string, FallbackDialogue> = new Map([
  ...hsk12Dialogues.map(d => [d.scene_ja, d] as const),
  ...hsk34Dialogues.map(d => [d.scene_ja, d] as const),
  ...hsk56Dialogues.map(d => [d.scene_ja, d] as const),
])

// Get a random dialogue for a specific level
export function getRandomDialogue(level: HSKLevel): FallbackDialogue {
  const dialogues = getDialoguesByLevel(level); // 确保拿到了对应等级的数组
  // 核心：使用 Math.random() 随机抽取
  const randomIndex = Math.floor(Math.random() * dialogues.length);
  return dialogues[randomIndex];
}

// ============================================================
// 内置拼音预解（基于 lines.pinyin）
// 用途：SentenceRenderer 可按需查表，而非每次调用 pinyin-pro
// 格式：Record<scene, Record<lineIndex, string[]>>
// ============================================================
export const SCENE_PINYIN_MAP: ReadonlyMap<string, Array<string[]>> = new Map([
  ...hsk12Dialogues.map(d => [
    d.scene,
    d.lines.map(l => l.pinyin.split(/\s+/).filter(Boolean))
  ] as const),
  ...hsk34Dialogues.map(d => [
    d.scene,
    d.lines.map(l => l.pinyin.split(/\s+/).filter(Boolean))
  ] as const),
  ...hsk56Dialogues.map(d => [
    d.scene,
    d.lines.map(l => l.pinyin.split(/\s+/).filter(Boolean))
  ] as const),
])
