const fs = require('fs')
const file = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
const raw = fs.readFileSync(file, 'utf8')

const syllableMap = {
  'rúhé': 'rú hé',
  'Xīwàng': 'Xī wàng',
  'shénme': 'shén me',
  'wǒmen': 'wǒ men',
  'Zhège': 'Zhè gè',
  'nǎlǐ': 'nǎ lǐ',
  'liǎojiě': 'liǎo jiě',
  'zánmen': 'zán men',
  'qièshí': 'qiè shí',
  'yīdìng': 'yī dìng',
  'jiéjìn': 'jié jìn',
  'yùsuàn': 'yù suàn',
  'kěxíng': 'kě xíng',
  'zhēnde': 'zhēn de',
  'gāoxìng': 'gāo xìng',
  'yuèliàng': 'yuè liàng',
  'yínháng': 'yín háng',
  'fēicháng': 'fēi cháng',
  'shēngyīn': 'shēng yīn',
  'kāishǐ': 'kāi shǐ',
  'jìxù': 'jì xù',
  'jiéshù': 'jié shù',
  'jìsuàn': 'jì suàn',
  'yùbèi': 'yù bèi',
  'nǎr': 'nǎ ér',
  'nà biān': 'nà biān',
  'zhè biān': 'zhè biān',
  'yǒu de': 'yǒu de',
  'yī diǎn': 'yī diǎn',
  'yìdiǎn': 'yì diǎn',
  'xiànzài': 'xiàn zài',
  'hòutiān': 'hòu tiān',
  'zuótiān': 'zuó tiān',
  'zhōngwǔ': 'zhōng wǔ',
  'shàngwǔ': 'shàng wǔ',
  'xiàwǔ': 'xià wǔ',
  'jǐdiǎn': 'jǐ diǎn',
  'tǐyù': 'tǐ yù',
  'gènghǎo': 'gèng hǎo',
  'bù fen': 'bù fen',
  'tóngshì': 'tóng shì',
  'jīnglǐ': 'jīng lǐ',
  'gōngsī': 'gōng sī',
  'bàogào': 'bào gào',
  'cānjiā': 'cān jiā',
  'gǎnxiè': 'gǎn xiè',
  'zhīdào': 'zhī dào',
  'duōshao': 'duō shǎo',
  'kāfēi': 'kā fēi',
  'yīxià': 'yī xià',
  'diǎnshí': 'diǎn shì',
}

// PASS 1: char-by-char parse pinyin fields
let result = ''
let i = 0
let pinyinCount = 0
let apostropheFixes = 0

while (i < raw.length) {
  const marker = "pinyin: '"
  const idx = raw.indexOf(marker, i)
  if (idx === -1) {
    result += raw.slice(i)
    break
  }
  result += raw.slice(i, idx + marker.length)
  i = idx + marker.length
  let pinyinVal = ''
  while (i < raw.length) {
    const ch = raw[i]
    if (ch === '\\' && raw[i + 1] === "'") {
      pinyinVal += ' '
      i += 2
      apostropheFixes++
    } else if (ch === "'") {
      const next = raw[i + 1]
      if (next && /[a-zA-ZāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüÜ]/.test(next)) {
        pinyinVal += ' '
        i += 1
        apostropheFixes++
      } else {
        i++
        break
      }
    } else {
      pinyinVal += ch
      i++
    }
  }
  pinyinVal = pinyinVal.replace(/\s+/g, ' ').trim()
  result += pinyinVal + "'"
  pinyinCount++
}

console.log('PASS 1: parsed ' + pinyinCount + ' fields, apostrophe fixes: ' + apostropheFixes)

// PASS 2: syllable dict
let dictFixes = 0
for (const [old, newVal] of Object.entries(syllableMap)) {
  if (old === newVal) continue
  const matches = result.match(new RegExp('\\b' + old + '\\b', 'gi'))
  if (matches) {
    result = result.replace(new RegExp('\\b' + old + '\\b', 'gi'), newVal)
    dictFixes += matches.length
    console.log('  dict: ' + old + ' (' + matches.length + 'x) -> ' + newVal)
  }
}
console.log('PASS 2: dict fixes: ' + dictFixes)

// PASS 3: punct粘连
const before = result.length
result = result.replace(/([āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüÜa-zA-Z])([，。？！,.?!：；;:])/g, '$1 $2')
result = result.replace(/ +/g, ' ')
console.log('PASS 3: punct cleanup: ' + (before - result.length) + ' chars')

fs.writeFileSync(file, result, 'utf8')
console.log('DONE')
