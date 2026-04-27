const fs = require('fs');
let data = fs.readFileSync('lib/hsk-fallback-data.ts', 'utf8');

const map = {
  '确认过敏史（救命句）': 'アレルギー歴の確認（重要）',
  '被吐槽食堂难吃': '社食がまずいとツッコまれる',
  '委婉拒绝老板的画饼': '上司の絵柄を婉拒',
  '职场八卦': '職場の噂話',
  '被要求周末加班': '週末残業を要求される',
  '工作群里发错消息': '仕事のチャットで誤送信',
  '被同事阴阳怪气': '同僚の皮肉に対処',
  '汇报工作时被打断': '報告中に割り込まれる',
  '迟到被领导发现': '遅刻を上司に見つかる',
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
