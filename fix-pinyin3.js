// 修复连字符问题：Wi-Fi → Wi Fi，同时处理大写开头
const fs = require('fs')

const file = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let content = fs.readFileSync(file, 'utf8')

// 连字符拆开 + 大写转小写
const lines = content.split('\n')
let changed = 0

const newLines = lines.map(line => {
  // 只处理 pinyin 字段
  const match = line.match(/pinyin:\s*['"]([^'"]+)['"]/)
  if (!match) return line

  const oldPy = match[1]
  // 把大写开头转为小写，同时保留声调
  let newPy = oldPy.replace(/[A-Z]/g, c => c.toLowerCase())
  // 把所有非拼音字符（非字母、非声调符号）替换为空格
  // 保留：a-z, āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü
  newPy = newPy.replace(/[^a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]/g, ' ')

  // 处理连字符：Wi-Fi → Wi Fi, xīwàng → xī wàng
  newPy = newPy.replace(/-/g, ' ')
  newPy = newPy.replace(/([a-zà-ǜü])([a-zà-ǜü])/gi, (m, a, b) => {
    // 如果两个字母之间没有空格且前一个不是完整音节末尾，可能是连写的
    // 简单策略：元音后无声调 = 可能是音节边界
    // 更安全：只拆我们已知的复合词
    return m
  })

  // 智能拆分已知复合词
  const compounds = [
    ['yīgè', 'yī gè'], ['yīxià', 'yī xià'], ['yīzhí', 'yī zhí'],
    ['dàxué', 'dà xué'], ['xūyào', 'xū yào'], ['mìmǎ', 'mì mǎ'],
    ['mǎshàng', 'mǎ shàng'], ['kànkan', 'kàn kan'], ['jiějué', 'jiě jué'],
    ['bùfèn', 'bù fèn'], ['guānyú', 'guān yú'], ['zhèi', 'zhè'],
    ['shìfǒu', 'shì fǒu'], ['yōuhuà', 'yōu huà'], ['yúkuài', 'yú kuài'],
    ['zánmen', 'zán men'], ['shāngliang', 'shāng liang'],
    ['xīwàng', 'xī wàng'], ['ànshí', 'àn shí'],
  ]
  compounds.forEach(([bad, good]) => {
    const re = new RegExp(bad.replace(/[àáǎ]/g, c => c), 'g')
    newPy = newPy.split(bad).join(good)
  })

  newPy = newPy.trim().replace(/\s+/g, ' ')

  if (newPy !== oldPy.toLowerCase().trim().replace(/\s+/g, ' ')) {
    changed++
    console.log(`🔧 ${oldPy.substring(0, 60)}...`)
    console.log(`   → ${newPy.substring(0, 60)}...`)
  }

  return line.replace(match[0], `pinyin: '${newPy}'`)
})

content = newLines.join('\n')
fs.writeFileSync(file, content, 'utf8')
console.log(`\nTotal changed: ${changed}`)
