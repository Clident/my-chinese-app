// 测试 splitPinyin 修复

const splitPinyin = (pinyin) =>
  pinyin
    .replace(/[，。！？、；：""''【】《》（）!?.,;:"'()\[\]]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(p => p.replace(/[^āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜa-zA-Zü]/g, ''))

const isCJK = (ch) => /[\u4e00-\u9fff\u3400-\u4dbf]/.test(ch)

const data = [
  ['Nǐ hǎo, yào shénme?', '你好，要什么？'],
  ['Gǎn xiè guì gōng sī.', '感谢贵公司。'],
  ['Nǐ shì xuéshēng ma?', '你是学生吗？'],
  ['Wǒ yào yī bēi kāfēi.', '我要一杯咖啡。'],
  ['Zhège duōshao qián?', '这个多少钱？'],
  ['Hǎo de, qǐng děng yīxià.', '好的，请等一下。'],
]

console.log('=== splitPinyin 测试 ===')
data.forEach(([py, cn]) => {
  const pinyins = splitPinyin(py)
  const chars = cn.split('')
  const cjkChars = chars.filter(isCJK)
  console.log(`原文拼音: "${py}"`)
  console.log(`splitPinyin: [${pinyins.map(p => `"${p}"`).join(', ')}] (${pinyins.length}个)`)
  console.log(`中文字符: ${cjkChars.length}个 → ${JSON.stringify(cjkChars)}`)
  console.log(`匹配: ${pinyins.length === cjkChars.length ? '✅ OK' : '❌ FAIL'}`)
  console.log('---')
})
