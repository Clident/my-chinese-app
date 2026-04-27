#!/usr/bin/env node
/**
 * 批量追加9条机场大交通场景 → hsk-fallback-data.ts
 * 用法: node scripts/batch-append-9-travel.cjs
 *
 * 追加内容:
 * 1. 04-security-check.ts  → 空港の保安検査
 * 2. 05-gate-boarding.ts   → 搭乗ゲートでの確認
 * 3. 06-inflight-service.ts → 機内サービス
 * 4. 07-immigration.ts      → 国入境審査
 * 5. 08-baggage-claim.ts   → 手荷物受取所
 * 6. 09-highspeed-train-ticket.ts → 高速鉄道の切符購入
 * 7. 10-taxi-ride.ts       → タクシーの配車
 * 8. 11-subway-transfer.ts → 地下鉄の乗り換え
 * 9. 12-hotel-checkin.ts   → ホテルのチェックイン
 */

const fs = require('fs');
const path = require('path');

const GENERATED_DIR = path.join(__dirname, 'generated');
const DATA_FILE = path.join(__dirname, '..', 'lib', 'hsk-fallback-data.ts');

function loadExport(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  // Extract the exported object
  const match = code.match(/export\s+const\s+\w+\s*=\s*(\{[\s\S]*?\n\}\s*);?$/m);
  if (!match) throw new Error(`Cannot parse: ${filePath}`);
  // Convert to JS object
  const obj = eval(`(${match[1]})`);
  return obj;
}

function buildDialogueObj(dialogue, level = 'hsk34') {
  // Build vocabulary array from keyVocabulary
  const vocabulary = (dialogue.keyVocabulary || []).map(v => ({
    word: v.word,
    pinyin: v.pinyin,
    meaning: v.meaning,
    ...(v.usageNote ? { usageNote: v.usageNote } : {}),
    ...(v.writingNote ? { writingNote: v.writingNote } : {}),
  }));

  return {
    id: dialogue.scene,
    scene: dialogue.scene,
    scene_ja: dialogue.scene_ja,
    sceneEmoji: dialogue.sceneEmoji || '✈️',
    level,
    vocabulary,
    dialogue: dialogue.lines.map(l => ({
      speaker: l.speaker,
      chinese: l.chinese,
      pinyin: l.pinyin,
      japanese: l.japanese,
    })),
  };
}

function main() {
  const files = [
    '04-security-check.ts',
    '05-gate-boarding.ts',
    '06-inflight-service.ts',
    '07-immigration.ts',
    '08-baggage-claim.ts',
    '09-highspeed-train-ticket.ts',
    '10-taxi-ride.ts',
    '11-subway-transfer.ts',
    '12-hotel-checkin.ts',
  ];

  const newDialogues = [];
  for (const f of files) {
    const filePath = path.join(GENERATED_DIR, f);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${f}`);
      continue;
    }
    try {
      const dialogue = loadExport(filePath);
      const level = dialogue.scene.includes('高铁') || dialogue.scene.includes('地铁') ? 'hsk34' : 'hsk34';
      newDialogues.push(buildDialogueObj(dialogue, level));
      console.log(`✅ ${dialogue.scene} (${dialogue.scene_ja})`);
    } catch (e) {
      console.error(`❌ ${f}: ${e.message}`);
    }
  }

  console.log(`\n准备好追加 ${newDialogues.length} 条场景。`);
  console.log('下一步：在 hsk-fallback-data.ts 中追加这些数据，或手动导入。');
  console.log('\n--- 数据预览 ---');
  newDialogues.forEach(d => {
    console.log(`  [${d.level}] ${d.scene} / ${d.scene_ja} (${d.dialogue.length}句, ${d.vocabulary.length}词)`);
  });
}

main();
