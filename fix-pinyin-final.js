// 最终修复：先把所有非pinyin字符替换为空格，然后把残留合成音节拆开
const fs = require('fs')

const file = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let content = fs.readFileSync(file, 'utf8')

// 已知的合成音节（连写在一起的多个音节）
const compoundMap = {
  'yīgè': 'yī gè', 'yīxià': 'yī xià', 'yīzhí': 'yī zhí',
  'dàxué': 'dà xué', 'xūyào': 'xū yào', 'mìmǎ': 'mì mǎ',
  'mǎshàng': 'mǎ shàng', 'kànkan': 'kàn kan', 'jiějué': 'jiě jué',
  'bùfèn': 'bù fèn', 'guānyú': 'guān yú', 'shìfǒu': 'shì fǒu',
  'yōuhuà': 'yōu huà', 'yúkuài': 'yú kuài', 'zánmen': 'zán men',
  'shāngliang': 'shāng liang', 'xīwàng': 'xī wàng', 'ànshí': 'àn shí',
  'guānyú': 'guān yú', 'tiānmáfan': 'tiān má fán',
  'dàxuéshēng': 'dà xué shēng',
  'yīgègè': 'yī gè gè',
  'yīgè': 'yī gè',
  // 剩余的
  'zhèi': 'zhè',
  'fāngàn': 'fāng àn',
  'fāngàn.': 'fāng àn.',
  'jiějuéfāng': 'jiě jué fāng',
  'jiějuéfāngàn': 'jiě jué fāng àn',
  'fāngàn': 'fāng àn',
  'à nshí': 'àn shí',
}

// 处理所有 pinyin 字段
let changed = 0
content = content.replace(/pinyin:\s*['"]([^'"]+)['"]/g, (match, py) => {
  let newPy = py

  // 1. 把所有非拼音字符（非字母、非声调符号）替换为空格
  // 然后把所有连续空格合并为单个空格
  newPy = newPy.replace(/[^a-zA-ZāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙǕǗǙǛüÜ]/g, ' ')
  newPy = newPy.toLowerCase()
  newPy = newPy.replace(/\s+/g, ' ').trim()

  // 2. 智能拆分：先替换已知合成词（从长到短排序）
  const sortedCompounds = Object.keys(compoundMap)
    .sort((a, b) => b.length - a.length)
  sortedCompounds.forEach(bad => {
    const good = compoundMap[bad]
    if (newPy.includes(bad)) {
      newPy = newPy.split(bad).join(good)
    }
  })

  newPy = newPy.replace(/\s+/g, ' ').trim()

  if (newPy !== py) {
    changed++
    console.log(`✅ "${py}"`)
    console.log(`   → "${newPy}"`)
  }

  return `pinyin: '${newPy}'`
})

console.log(`\nTotal: ${changed} lines changed`)
fs.writeFileSync(file, content, 'utf8')
console.log('Saved.')
