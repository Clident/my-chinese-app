#!/usr/bin/env node
/**
 * 将9条机场大交通场景注入 hsk-fallback-data.ts
 * 插入点：hsk34Dialogues 数组末尾（hsk56Dialogues 之前）
 */
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'lib', 'hsk-fallback-data.ts');
const GENERATED_DIR = path.join(__dirname, 'generated');

function loadExport(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const cleanCode = code
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');
  const match = cleanCode.match(/export\s+const\s+\w+\s*=\s*(\{[\s\S]*?\n\}\s*);?$/m);
  if (!match) throw new Error(`Cannot parse: ${filePath}`);
  return eval(`(${match[1]})`);
}

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

const dialogues = [];
for (const f of files) {
  const d = loadExport(path.join(GENERATED_DIR, f));
  dialogues.push(d);
  console.log(`✅ ${d.scene} (${d.scene_ja})`);
}

// Generate TS block matching original file format
// Original fields: scene, scene_ja, sceneEmoji, lines[], keyVocabulary[]
// keyVocabulary fields: word, pinyin, meaning, usageNote?, writingNote?
function generateTS(d) {
  const vocabs = d.keyVocabulary.map(v => {
    let vocabStr = `      { word: "${v.word}", pinyin: "${v.pinyin}", meaning: "${v.meaning}"`;
    if (v.usageNote) vocabStr += `, usageNote: "${v.usageNote}"`;
    if (v.writingNote) vocabStr += `, writingNote: "${v.writingNote}"`;
    return vocabStr + ' }';
  }).join(',\n');

  const dialogueLines = d.lines.map(l =>
    `    { speaker: "${l.speaker}", chinese: "${l.chinese}", pinyin: "${l.pinyin}", japanese: "${l.japanese}" }`
  ).join(',\n');

  return `  {
    scene: "${d.scene}",
    scene_ja: "${d.scene_ja}",
    sceneEmoji: "${d.sceneEmoji || '✈️'}",
    lines: [
${dialogueLines}
    ],
    keyVocabulary: [
${vocabs}
    ],
  }`;
}

// Read data file (CRLF on Windows)
const content = fs.readFileSync(DATA_FILE, 'utf8');
const lines = content.split(/\r?\n/);
const markerLineIdx = lines.findIndex(l => l.includes('// HSK 5-6 (高级)'));
if (markerLineIdx === -1) throw new Error('Cannot find HSK 5-6 marker');

// File structure:
//   index 986: "  }" (last entry's close)
//   index 987: "]"  (array close)
//   index 988: blank
//   index 989: marker (markerLineIdx)
const arrayCloseIdx = markerLineIdx - 2;  // index of "]" line
const lastEntryCloseIdx = arrayCloseIdx - 1;  // index of "  }" line

// Add comma to the last existing entry's closing brace
lines[lastEntryCloseIdx] = lines[lastEntryCloseIdx] + ',';

// Generate new entries (each ends with "  }"), join with commas
const newEntriesBlock = dialogues.map(d => generateTS(d)).join(',\n');

const newLines = [
  ...lines.slice(0, arrayCloseIdx),  // through modified "  },"
  newEntriesBlock,                   // new dialogue entries
  ...lines.slice(arrayCloseIdx),      // "]" and rest
];

const newContent = newLines.join('\r\n');
fs.writeFileSync(DATA_FILE, newContent, 'utf8');
console.log(`\n✅ 注入 ${dialogues.length} 条`);
console.log(`   文件大小: ${(newContent.length / 1024).toFixed(1)} KB`);
