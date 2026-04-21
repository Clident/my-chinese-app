const fs = require('fs')

const splitPinyin = (pinyin) =>
  pinyin
    .replace(/[，。！？、；：""''【】《》（）!?.,;:"'()\[\]]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(p => p.replace(/[^āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜa-zA-Zü]/g, ''))

const isCJK = (ch) => /[\u4e00-\u9fff\u3400-\u4dbf]/.test(ch)

const data = [
  ['Nǐ hǎo, yào shén mè?', '你好，要什么？'],
  ['nǐ shì xué shēng ma', '你是学生吗？'],
  ['shì de wǒ shì dà xué shēng', '是的，我是大学生。'],
  ['wǒ yào yī bēi kā fēi.', '我要一杯咖啡。'],
  ['hǎo de qǐng děng yī xià', '好的，请等一下。'],
  ['zhè gè duō shǎo qián', '这个多少钱？'],
  ['dì tiě zhàn zài nǎ ér', '地铁站在哪儿？'],
  ['zài nà biān.', '在那边。'],
  ['wáng jīng lǐ, zhè fèn bào gào wǒ yǐ jīng zhǔn bèi hǎo le', '王经理，这份报告我已经准备好了。'],
  ['hěn hǎo fàng zài wǒ zhuō shang ba xià wǔ kāi huì de shí hòu huì yòng dào', '很好，放在我桌上吧。下午开会的时候会用到。'],
  ['hǎo de hái yǒu shén mè xū yào wǒ bāng máng de ma', '好的，还有什么需要我帮忙的吗？'],
  ['yī shēng wǒ zuì jìn jīng cháng tóu téng wǎn shang yě shuì bù hǎo', '医生，我最近经常头疼，晚上也睡不好。'],
  ['nǐ gōng zuò yā lì dà ma yǒu méi yǒu àn shí chī fàn', '你工作压力大吗？有没有按时吃饭？'],
  ['què shí zuì jìn gōng zuò hěn máng jīng cháng jiā bān', '确实最近工作很忙，经常加班。'],
  ['nǐ hǎo wǒ xiǎng kāi yī gè yín háng zhàng hù.', '你好，我想开一个银行账户。'],
  ['qǐng chū shì nín de shēn fèn zhèng hé shǒu jī hào mǎ.', '请出示您的身份证和手机号码。'],
  ['zhè shì wǒ de hù zhào kě yǐ ma', '这是我的护照，可以吗？'],
  ['qǐng wèn fáng jiān lǐ yǒu miǎn fèi de Wi Fi ma', '请问房间里有免费的Wi-Fi吗？'],
  ['yǒu de mì mǎ zài fáng kǎ shàng miàn. tuì fáng shí jiān shì zhōng wǔ shí èr diǎn.', '有的，密码在房卡上面。退房时间是中午十二点。'],
  ['zhè jiàn yī fu néng bù néng pián yi yī diǎn?', '这件衣服能不能便宜一点？'],
  ['zhè yǐ jīng shì zuì dī jià le, bú guò rú guǒ nín bàn huì yuán kǎ, kě yǐ dǎ jiǔ zhé.', '这已经是最低价了，不过如果您办会员卡，可以打九折。'],
]

let allPass = true
data.forEach(([py, cn]) => {
  const pinyins = splitPinyin(py)
  const cjkChars = cn.split('').filter(isCJK)
  const pass = pinyins.length === cjkChars.length
  if (!pass) allPass = false
  console.log(`${pass ? '✅' : '❌'} pinyins=${pinyins.length} cjk=${cjkChars.length} | ${cn}`)
  if (!pass) {
    console.log(`   py: [${pinyins.join(', ')}]`)
    console.log(`   cn: [${cjkChars.join(', ')}]`)
  }
})

console.log(allPass ? '\n🎉 All pass!' : '\n⚠️  Some still fail')
