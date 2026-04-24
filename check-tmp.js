const fs = require('fs');
const c = fs.readFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/_tmp_hsk.js', 'utf8');
const lines = c.split('\n');
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // Find lines with colons that aren't object properties
  if (l.includes(':') && !l.trim().startsWith('//') && !l.match(/^\s+\w+:\s*[\[{'".\d]/)) {
    console.log('Line', i + 1, ':', l.slice(0, 100));
  }
}
console.log('\nTotal lines:', lines.length);
console.log('Total chars:', c.length);