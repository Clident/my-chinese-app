const fs = require('fs');
const c = fs.readFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', 'utf8');

let depth = 0, inStr = false, strChar = null;
let close = -1;

for (let i = 636; i < c.length; i++) {
  const ch = c[i];
  if (!inStr) {
    if (ch === '"' || ch === "'" || ch === '`') { inStr = true; strChar = ch; }
    else if (ch === '[') depth++;
    else if (ch === ']') {
      if (depth === 0) { close = i; break; }
      depth--;
    }
  } else {
    if (ch === strChar) {
      let backslashes = 0;
      for (let j = i - 1; j >= 636 && c[j] === '\\'; j--) backslashes++;
      if (backslashes % 2 === 0) inStr = false;
    }
  }
}

console.log('close:', close);
console.log('char at close:', JSON.stringify(c[close]));
console.log('raw len:', close - 636 - 1);

if (close !== -1) {
  const raw = c.slice(637, close);
  console.log('Last 80 of raw:', JSON.stringify(raw.slice(-80)));
  try {
    const data = eval('[' + raw + ']');
    console.log('EVAL OK:', data.length);
  } catch(e) {
    console.log('EVAL FAIL:', e.message);
    const m = e.message.match(/at position (\d+)/);
    if (m) {
      const ep = parseInt(m[1]);
      console.log('  raw pos', ep, ':', JSON.stringify(raw.slice(Math.max(0,ep-30), ep+30)));
    }
  }
} else {
  console.log('NOT FOUND. Final depth:', depth, 'inStr:', inStr);
}