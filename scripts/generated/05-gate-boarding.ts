// ============================================================
// 场景 2：搭乗ゲートでの確認（登机口）
// 搭乗手続き・遅延対応
// ============================================================
export const gateBoardingDialogue = {
  scene: '登机口',
  scene_ja: '搭乗ゲートでの確認',
  sceneEmoji: '🛫',
  lines: [
    {
      speaker: 'A',
      chinese: '您好，请问这是去东京的航班吗？',
      pinyin: 'Nín hǎo , qǐng wèn zhè shì qù Dōngjīng de háng bān ma ?',
      japanese: '失礼いたしますが、これは東京行きの便ですか？',
    },
    {
      speaker: 'B',
      chinese: '是的，请问您的登机牌准备好了吗？',
      pinyin: 'Shì de , qǐng wèn nín de dēng jī pái zhǔn bèi hǎo le ma ?',
      japanese: 'はい、搭乗券はお 준비できていますか？',
    },
    {
      speaker: 'A',
      chinese: '给您看一下，我的航班延误了一个小时。',
      pinyin: 'Gěi nín kàn yí xià , wǒ de háng bān yán wù le yí gè xiǎo shí .',
      japanese: 'はい、これですが、便が1時間遅延しているということです。',
    },
    {
      speaker: 'B',
      chinese: '是的，由于天气原因，飞机会晚点起飞。',
      pinyin: 'Shì de , yóu yú tiān qì yuán yīn , fēi jī huì wǎn diǎn qǐ fēi .',
      japanese: 'はい、天候の関係で飞机的出発が遅れています。',
    },
    {
      speaker: 'A',
      chinese: '请问现在可以在候机室等吗？',
      pinyin: 'Qǐng wèn xiàn zài kě yǐ zài hòu jī shì děng ma ?',
      japanese: '搭乗待合室で待ってもよろしいですか？',
    },
    {
      speaker: 'B',
      chinese: '可以，请在登机口附近等候，登机时间是十一点整。',
      pinyin: 'Kě yǐ , qǐng zài dēng jī kǒu fù jìn děng hòu , dēng jī shí jiān shì shí yī diǎn zhěng .',
      japanese: 'はい、搭乗ゲート付近でお待ちください。搭乗は11時です。',
    },
    {
      speaker: 'A',
      chinese: '请问可以在候机室充电吗？',
      pinyin: 'Qǐng wèn kě yǐ zài hòu jī shì chōng diàn ma ?',
      japanese: '待合室で充電できますか？',
    },
    {
      speaker: 'B',
      chinese: '可以的，每个座位附近都有USB接口。',
      pinyin: 'Kě yǐ de , měi gè zuò wèi fù jìn dōu yǒu USB jiē kǒu .',
      japanese: 'はい、各座席の近くにUSB端子がございます。',
    },
    {
      speaker: 'A',
      chinese: '太好了，请问有免费的Wi-Fi吗？',
      pinyin: 'Tài hǎo le , qǐng wèn yǒu miǎn fèi de Wi-Fi ma ?',
      japanese: 'ありがとうございます。無料のWi-Fiはありますか？',
    },
    {
      speaker: 'B',
      chinese: '有，请连接Airport-Free-WiFi，输入手机号验证。',
      pinyin: 'Yǒu , qǐng lián jiē Airport-Free-WiFi , shū rù shǒu jī hào yàn zhèng .',
      japanese: 'はい、「Airport-Free-WiFi」に接続し、携帯番号で認証してください。',
    },
    {
      speaker: 'A',
      chinese: '好的，谢谢您！我先去候机室等广播。',
      pinyin: 'Hǎo de , xiè xie nín ! Wǒ xiān qù hòu jī shì děng guǎng bō .',
      japanese: 'わかりました。ありがとうございます。じゃあ、待合室で放送を待ちます。',
    },
    {
      speaker: 'B',
      chinese: '不客气，祝您旅途愉快。',
      pinyin: 'Bú kè qi , zhù nín lǚ tú yú kuài .',
      japanese: 'どういたしまして。ご旅行をお楽しみください。',
    },
  ],
  keyVocabulary: [
    {
      word: '登机口',
      pinyin: 'dēng jī kǒu',
      meaning: '搭乗ゲート',
      writingNote: '中文「登机口」、日文「搭乗ゲート」。_gate的不同表达',
    },
    {
      word: '延误',
      pinyin: 'yán wù',
      meaning: '遅延（する）',
      usageNote: '「延误」= 延迟＋耽误。航班/列车延误是中国常见情况',
    },
    {
      word: '定刻',
      pinyin: 'dìng kè',
      meaning: '定刻・予定時刻',
      writingNote: '中文「定刻」= scheduled time。日文「定刻」=定刻運行',
    },
    {
      word: '候机室',
      pinyin: 'hòu jī shì',
      meaning: '搭乗待合室',
      writingNote: '中文「候机」= 搭乗を待つ。日文「候」= 待つ（書き言葉）',
    },
    {
      word: 'USB接口',
      pinyin: 'USB jiē kǒu',
      meaning: 'USB端子',
      writingNote: '中文「接口」= connection port。日文「端子」',
    },
    {
      word: '验证',
      pinyin: 'yàn zhèng',
      meaning: '認証する',
      writingNote: '中文「验证」比日文「検証」更侧重身份/信息确认',
    },
    {
      word: '广播',
      pinyin: 'guǎng bō',
      meaning: '放送・案内',
      usageNote: '机场广播很重要。「请注意」= お知らせがあります',
    },
    {
      word: 'Wi-Fi',
      pinyin: 'Wi-Fi',
      meaning: 'Wi-Fi（ワイヤレスネットワーク）',
      writingNote: '外来语，中国也说「Wi-Fi」或「无线网」',
    },
  ],
};
