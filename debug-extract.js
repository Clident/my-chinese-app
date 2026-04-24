const fs = require('fs');
const c = fs.readFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', 'utf8');

const second = 636;
console.log(`Testing from pos ${second}`);

// Simple bracket counting with string tracking
let depth = 0, inStr = false, strChar = null;
for (let i = second; i < c.length; i++) {
  const ch = c[i];
  if (!inStr) {
    if (ch === '"' || ch === "'" || ch === '`') { inStr = true; strChar = ch; }
    else if (ch === '[') depth++;
    else if (ch === ']') {
      if (depth === 0) {
        console.log(`Close at ${i}, raw len=${i - second - 1}`);
        const raw = c.slice(second + 1, i);
        console.log(`Last 80: ${JSON.stringify(raw.slice(-80))}`);
        try {
          const data = eval(`[${raw}]`);
          console.log(`✅ Eval OK: ${data.length} items`);
        } catch (e) {
          console.log(`❌ Eval failed: ${e.message}`);
        }
        break;
      }
      depth--;
    }
  } else {
    if (ch === strChar) {
      // Count backslashes before this quote
      let backslashes = 0;
      for (let j = i - 1; j >= second && c[j] === '\\'; j--) backslashes++;
      if (backslashes % 2 === 0) inStr = false;
    }
  }
}

// Let's also check if there's a specific string issue around pos 16680
console.log('\n--- Checking context of first close (16680) ---');
// Context: what was the string state around 16680?
let inStr2 = false, strChar2 = null;
for (let i = second; i <= 16680; i++) {
  const ch = c[i];
  if (!inStr2) {
    if (ch === '"' || ch === "'" || ch === '`') { inStr2 = true; strChar2 = ch; }
  } else {
    if (ch === strChar2) {
      let backslashes = 0;
      for (let j = i - 1; j >= second && c[j] === '\\'; j--) backslashes++;
      if (backslashes % 2 === 0) { inStr2 = false; }
    }
  }
}
console.log(`At pos 16680: inStr=${inStr2}, strChar=${strChar2}`);

// Let's also find any string that contains ]
console.log('\n--- Finding strings with ] inside ---');
let inStr3 = false, strChar3 = null, strStart = -1;
for (let i = second; i < 16690; i++) {
  const ch = c[i];
  if (!inStr3) {
    if (ch === '"' || ch === "'" || ch === '`') { inStr3 = true; strStart = i; strChar3 = ch; }
  } else {
    if (ch === strChar3) {
      let backslashes = 0;
      for (let j = i - 1; j >= second && c[j] === '\\'; j--) backslashes++;
      if (backslashes % 2 === 0) {
        inStr3 = false;
        // Check if this string contains ]
        const s = c.slice(strStart + 1, i);
        if (s.includes(']')) {
          console.log(`String at ${strStart}-${i} contains ]: ${JSON.stringify(s.slice(0, 40))}`);
        }
      }
    }
  }
}

// Let's look at the raw string content between 636 and 16689
// specifically: look for any single-quote string that might not be properly closed
// by checking the quote count
console.log('\n--- Quote balance analysis ---');
let quotes = 0;
for (let i = second; i < 16689; i++) {
  if (c[i] === "'" && (i === second || c[i-1] !== '\\')) {
    // Check if this quote is escaped
    let backslashes = 0;
    for (let j = i - 1; j >= second && c[j] === '\\'; j--) backslashes++;
    if (backslashes % 2 === 0) quotes++;
  }
}
console.log(`Quote count between 636-16689: ${quotes} (even means balanced)`);
console.log(`Unquoted chars: ${16689 - second - 1 - quotes}`);

// Now check: what's at position 16688?
console.log(`\nChar at 16688: '${c[16688]}'`);
console.log(`Context 16680-16690: ${JSON.stringify(c.slice(16680, 16690))}`);

// CONCLUSION: The close at 16680 WAS valid. 
// The problem is our findClosing is using depth counter from pos 636
// and saying depth never reaches 0... but we just verified it does!
// 
// Let me re-run the exact same logic from 636 with detailed trace
console.log('\n--- Detailed trace from 636 ---');
let d = 0, s = false, sc = null;
let lastDepthChange = null;
for (let i = second; i < second + 100; i++) {
  const ch = c[i];
  if (!s) {
    if (ch === '"' || ch === "'" || ch === '`') { s = true; sc = ch; }
    else if (ch === '[') { d++; console.log(`  [${i}] depth now ${d}`); lastDepthChange = i; }
    else if (ch === ']') {
      console.log(`  [${i}] depth now ${d} (depth=${d === 0 ? 'ZERO' : '>0'})`);
      if (d === 0) { console.log(`*** FOUND CLOSE ***`); break; }
      d--;
    }
  } else {
    if (ch === sc) {
      let bs = 0;
      for (let j = i - 1; j >= second && c[j] === '\\'; j--) bs++;
      if (bs % 2 === 0) s = false;
    }
  }
}
console.log(`After 100 chars, depth=${d}`);