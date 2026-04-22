const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'lib', 'hsk-fallback-data.ts')
let content = fs.readFileSync(filePath, 'utf8')

const hsk56Data = `  {
    scene: '航班延误改签',
    sceneEmoji: '✈️',
    lines: [
      { speaker: "旅客", chinese: "我的航班延误了，能帮我改签到下一班吗？", pinyin: "wǒ de háng bān yán wù le ， néng bāng wǒ gǎi qiān dào xià yì bān ma ？", japanese: "私の便が遅延しました。次の便に振り替えてもらえますか？" },
      { speaker: "客服", chinese: "抱歉，由于天气原因，后续航班也都满员了。", pinyin: "bào qiàn ， yóu yú tiān qì yuán yīn ， hòu xù háng bān yě dōu mǎn yuán le 。", japanese: "申し訳ありません、天候の影響で、後続の便もすべて満席です。" }
    ],
    keyVocabulary: [
      { word: "改签", pinyin: "gǎi qiān", meaning: "（チケットを）変更する、振り替える" },
      { word: "延误", pinyin: "yán wù", meaning: "（交通機関が）遅延する" }
    ],
  }`

// Find export marker
const exportMarker = '\r\n\r\nexport const allDialogues'
const exportIdx = content.indexOf(exportMarker)
if (exportIdx > 0) {
  const beforeExport = content.substring(0, exportIdx)
  const lastBracket = beforeExport.lastIndexOf('}')
  
  content = content.substring(0, lastBracket + 1) + ',\n' + hsk56Data + '\n]' + content.substring(beforeExport.lastIndexOf(']') + 1)
  console.log('Added HSK56 flight dialogue')
}

fs.writeFileSync(filePath, content, 'utf8')
console.log('Done!')
