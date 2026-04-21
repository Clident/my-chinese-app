const fs = require('fs')
const filePath = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
const raw = fs.readFileSync(filePath, 'utf8')

// ============================================================
// 智能拆分函数
// ============================================================
function smartSplit(pinyin) {
  return pinyin
    .replace(/([āēīōūǖáéíóúǘǎěǐǒǔǚàèìòùǜ])([a-zA-Z])/g, '$1 $2')
    .replace(/me(?=[a-zA-Z])/g, 'me ')
    .replace(/men(?=[a-zA-Z])/g, 'men ')
    .replace(/zi(?=[a-zA-Z])/g, 'zi ')
    .replace(/([a-zA-Z])([，。？！,.?!：；;:])/g, '$1 $2')
    .replace(/([，。？！,.?!：；;:])([a-zA-Z])/g, '$1 $2')
    .replace(/Wi\s+Fi/g, 'Wi-Fi')
    .replace(/\s+/g, ' ')
    .trim()
}

// ============================================================
// 逐字符解析：只处理 pinyin 字段值，不动其他任何内容
// ============================================================
let result = ''
let i = 0
let changed = 0

while (i < raw.length) {
  // 找下一个 pinyin 字段的起始
  const marker = "pinyin"
  const idx = raw.indexOf(marker, i)
  if (idx === -1) {
    result += raw.slice(i)
    break
  }

  // 追加 marker 之前的原文
  result += raw.slice(i, idx)
  i = idx

  // 找 : 之后第一个 '
  const colonIdx = raw.indexOf(':', i)
  if (colonIdx === -1) {
    result += raw[i++]
    continue
  }

  // 找引号开始
  const quoteStart = raw.indexOf("'", colonIdx)
  if (quoteStart === -1) {
    result += raw.slice(i, colonIdx + 1)
    i = colonIdx + 1
    continue
  }

  // 追加到引号开始之前（含 :'）
  result += raw.slice(i, quoteStart + 1)
  i = quoteStart + 1

  // 逐字符收集 pinyin 值（遇未转义单引号结束）
  let pinyinVal = ''
  while (i < raw.length) {
    const ch = raw[i]
    if (ch === '\\' && raw[i + 1] === "'") {
      pinyinVal += ' '
      i += 2
    } else if (ch === "'") {
      // 裸引号 — 判断是音节分隔还是字符串结束
      const next = raw[i + 1]
      if (next && /[a-zA-Z]/.test(next)) {
        pinyinVal += ' '
        i++
      } else {
        i++
        break
      }
    } else {
      pinyinVal += ch
      i++
    }
  }

  // 应用智能拆分
  const original = pinyinVal
  pinyinVal = smartSplit(pinyinVal)

  if (pinyinVal !== original) {
    changed++
  }

  result += pinyinVal + "'"
}

console.log('Changed fields: ' + changed)

fs.writeFileSync(filePath, result, 'utf8')
console.log('Done!')
