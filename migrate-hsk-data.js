const fs = require('fs');
const path = require('path');

const CONFIG = [
  { key: 'hsk12Dialogues', prefix: 'hsk12', level: 'HSK1-2' },
  { key: 'hsk34Dialogues', prefix: 'hsk34', level: 'HSK3-4' },
  { key: 'hsk56Dialogues', prefix: 'hsk56', level: 'HSK5-6' }
];

const sourcePath = path.join(__dirname, 'lib/hsk-fallback-data.ts');
const targetPath = path.join(__dirname, 'lib/hsk-v2-data.ts');
const rawContent = fs.readFileSync(sourcePath, 'utf8');

function extractArray(content, exportName) {
  const si = content.indexOf(`export const ${exportName}`);
  if (si === -1) return null;

  // Find the "= [" pattern: first [ after = that's NOT in a type annotation
  const eqPos = content.indexOf('=', si);
  if (eqPos === -1) return null;

  // Count: for each char after =, track depth. When we go from depth 0 to 1,
  // that's the real array start. (Type annotation [] has depth going back to 0)
  let depth = 0, inStr = false, strChar = null;
  let arrStart = -1;

  for (let i = eqPos + 1; i < content.length; i++) {
    const ch = content[i];
    if (!inStr) {
      if (ch === '"' || ch === "'" || ch === '`') { inStr = true; strChar = ch; }
      else if (ch === '[') {
        depth++;
        if (arrStart === -1) arrStart = i; // first [ at depth 1 is the array
      }
      else if (ch === ']') {
        if (depth === 1 && arrStart !== -1) {
          // This closes the first-level array
          return { start: arrStart, end: i };
        }
        depth--;
      }
      else if (ch === '\n' && arrStart === -1) break; // no array on next line
    } else {
      if (ch === strChar) inStr = false;
    }
  }
  return null;
}

function migrate() {
  const output = [];
  let total = 0;

  for (const { key, prefix, level } of CONFIG) {
    console.log(`处理 ${level}...`);
    const bounds = extractArray(rawContent, key);
    if (!bounds) { console.warn(`  ⚠️ ${key} 提取失败`); continue; }

    const raw = rawContent.slice(bounds.start + 1, bounds.end);
    console.log(`  提取: pos ${bounds.start + 1} → ${bounds.end} (${raw.length} chars)`);

    let data;
    try {
      data = eval(`[${raw}]`);
    } catch (e) {
      console.error(`  ❌ eval失败: ${e.message}`);
      const m = e.message.match(/at position (\d+)/);
      if (m) {
        const ep = parseInt(m[1]);
        console.error(`  raw[${ep}]: ${JSON.stringify(raw.slice(Math.max(0, ep-30), ep+30))}`);
      }
      continue;
    }

    console.log(`  ✅ ${data.length} 条`);
    total += data.length;

    const migrated = data.map((entry, index) => ({
      id: `${prefix}-${(index + 1).toString().padStart(3, '0')}`,
      metadata: { level, source: 'human', isVerified: false },
      title: { ja: entry.scene || "", zh: "" },
      emoji: entry.sceneEmoji || "🏮",
      content: {
        speakers: [...new Set(entry.lines.map(l => l.speaker))],
        lines: entry.lines.map(line => ({
          speaker: line.speaker, text_zh: line.chinese, text_ja: line.japanese
        }))
      },
      vocabulary: (entry.keyVocabulary || []).map(v => ({
        word: v.word, pinyin: v.pinyin, meaning: v.meaning,
        writingNote: v.writingNote || '', usageNote: v.usageNote || ''
      }))
    }));

    output.push(`// === ${level} (${migrated.length} 条) ===\nexport const ${key}V2 = ${JSON.stringify(migrated, null, 2)};`);
  }

  if (!output.length) { console.error('❌ 无数据'); process.exit(1); }

  const final = `/**
 * HSK V2 Data - 数据规范化重构版
 * ${new Date().toISOString()}
 */

${output.join('\n\n')}
`;

  fs.writeFileSync(targetPath, final, 'utf8');
  console.log(`\n✅ 共 ${total} 条 -> lib/hsk-v2-data.ts (${(fs.statSync(targetPath).size / 1024).toFixed(1)} KB)`);
}

migrate();
