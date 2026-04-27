const fs = require('fs');
const d = fs.readFileSync('lib/hsk-fallback-data.ts', 'utf8');
const re = /scene:\s*'([^']+)',\s*\r?\n\s*scene_ja:\s*'([^']+)'/g;
let m;
const bad = [];
while ((m = re.exec(d)) !== null) {
  const zh = m[1], ja = m[2];
  // Check if scene_ja contains Chinese-only characters (no katakana/hiragana)
  // Simple check: if scene_ja === scene, it's untranslated
  if (ja === zh) bad.push(zh);
}
console.log('Chinese scene_ja remaining:', bad.length);
bad.forEach(x => console.log(' -', x));
