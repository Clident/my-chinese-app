const fs = require('fs');
const c = fs.readFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', 'utf8');

// Simple test: find the EXACT position of the second '[' for hsk12Dialogues
const sp = 'export const hsk12Dialogues';
const si = c.indexOf(sp);
const lineEnd = c.indexOf('\n', si);
let lastBracket = -1;
for (let i = si; i < lineEnd; i++) {
  if (c[i] === '[') lastBracket = i;
}
console.log('Second [ at:', lastBracket, 'char:', JSON.stringify(c[lastBracket]));
console.log('Next 40 chars:', JSON.stringify(c.slice(lastBracket, lastBracket + 40)));

// Now count brackets from there, carefully
let depth = 0, inStr = false, strChar = null;
for (let i = lastBracket; i < c.length; i++) {
  const ch = c[i];
  if (!inStr) {
    if (ch === '"' || ch === "'" || ch === '`') {
      inStr = true;
      strChar = ch;
      console.log(`  String start at ${i}: ${ch}`);
    } else if (ch === '[') {
      depth++;
    } else if (ch === ']') {
      if (depth === 0) {
        console.log(`Found close at ${i}, raw length = ${i - lastBracket - 1}`);
        console.log(`Last 40 of raw: ${JSON.stringify(c.slice(lastBracket + 1, lastBracket + 41))}`);
        console.log(`Next 40 after close: ${JSON.stringify(c.slice(i, i + 40))}`);
        break;
      }
      depth--;
    }
  } else {
    if (ch === strChar && c[i - 1] !== '\\') {
      inStr = false;
      console.log(`  String end at ${i}`);
    }
  }
}