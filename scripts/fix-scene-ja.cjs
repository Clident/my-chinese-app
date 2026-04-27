const fs = require('fs');
let data = fs.readFileSync('lib/hsk-fallback-data.ts', 'utf8');

const map = {
  '老板画饼': '上司の絵柄',
  '委婉拒绝不合理要求': '不当な要求の婉拒',
  '聚餐被劝酒': '飲み会での勧酒',
  '询问药效与副作用': '薬効と副作用の確認',
  '抗议剪得太短了': '短く切りすぎへの抗議',
  '关于退还押金的争吵': '敷金返還の争い',
  '商量搬家的时间': '引っ越し日程の相談',
  '航班延误改签': 'フライト遅延の振替',
  '餐厅投诉': 'レストランへのクレーム',
  '吵架': '喧嘩',
  '冷战': '冷戦状態',
  '求婚': 'プロポーズ',
  '见家长': '相手の親に挨拶',
  '行李延误': '荷物の遅延',
  '钱包被偷': '財布の盗難',
  '询问是否需要空腹抽血': '空腹採血の確認',
  '咨询医疗保险理赔': '医療保険の請求相談',
  '护照丢了去领事馆': 'パスポート紛失と領事館',
  '老板在群里画饼': 'チャットで上司の絵柄',
  '健身房私教推销': 'ジムのパーソナル営業',
  '委婉拒绝加班': '残業の婉拒',
  '金融科技': 'フィンテック',
};

let count = 0;
for (const [zh, ja] of Object.entries(map)) {
  const escaped = zh.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp("scene: '" + escaped + "',\\r?\\n(\\s*)scene_ja: '[^']*'", 'g');
  data = data.replace(regex, (match, indent) => {
    count++;
    return "scene: '" + zh + "',\r\n" + indent + "scene_ja: '" + ja + "'";
  });
}

fs.writeFileSync('lib/hsk-fallback-data.ts', data);
console.log('Replaced:', count);
