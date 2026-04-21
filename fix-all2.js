const fs = require('fs')
const file = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let content = fs.readFileSync(file, 'utf8')

// 1. Fix glued tone-suffix pattern: shí'èr → shí èr
// Pattern: [vowel+tone mark] + ['] + [consonant letter]
content = content.replace(/([aeiouüǖǘǚǜàáǎäèéěëìíǐïòóǒöùúǔü][̀́̌̋]*)([a-z])/gi, '$1 $2')
console.log('Applied glued pattern fix')

// 2. Specific multi-syllable expansions
const fixes = [
  ['shénme', 'shén mè'],
  ['xuéshēng', 'xué shēng'],
  ['dàxuéshēng', 'dà xué shēng'],
  ['kāfēi', 'kā fēi'],
  ['yīxià', 'yī xià'],
  ['duōshao', 'duō shǎo'],
  ['nǎr', 'nǎ ér'],
  ['nàbiān', 'nà biān'],
  ['jīnglǐ', 'jīng lǐ'],
  ['bàogào', 'bào gào'],
  ['yǐjīng', 'yǐ jīng'],
  ['zhǔnbèi', 'zhǔn bèi'],
  ['Xiàwǔ', 'Xià wǔ'],
  ['kāihuì', 'kāi huì'],
  ['shíhou', 'shí hou'],
  ['wǎnshang', 'wǎn shang'],
  ['gōngzuò', 'gōng zuò'],
  ['yālì', 'yā lì'],
  ['shìfǒu', 'shì fǒu'],
  ['chīfàn', 'chī fàn'],
  ['jiābān', 'jiā bān'],
  ['yīgè', 'yī gè'],
  ['yínháng', 'yín háng'],
  ['zhànghù', 'zhàng hù'],
  ['chūshì', 'chū shì'],
  ['shēnfènzhèng', 'shēn fèn zhèng'],
  ['shǒujī', 'shǒu jī'],
  ['hàomǎ', 'hào mǎ'],
  ['hùzhào', 'hù zhào'],
  ['kěyǐ', 'kě yǐ'],
  ['Qǐngwèn', 'Qǐng wèn'],
  ['fángjiān', 'fáng jiān'],
  ['miǎnfèi', 'miǎn fèi'],
  ['mìmǎ', 'mì mǎ'],
  ['fángkǎ', 'fáng kǎ'],
  ['shàngmiàn', 'shàng miàn'],
  ['Tuìfáng', 'Tuì fáng'],
  ['shíjiān', 'shí jiān'],
  ['zhōngwǔ', 'zhōng wǔ'],
  ['yīfu', 'yī fu'],
  ['piányi', 'pián yi'],
  ['yīdiǎn', 'yī diǎn'],
  ['zuìdī', 'zuì dī'],
  ['búguò', 'bú guò'],
  ['rúguǒ', 'rú guǒ'],
  ['huìyuánkǎ', 'huì yuán kǎ'],
  ['gōngsī', 'gōng sī'],
  ['bǎimáng', 'bǎi máng'],
  ['chōuchū', 'chōu chū'],
  ['qiàtán', 'qià tán'],
  ['hézuò', 'hé zuò'],
  ['shìyí', 'shì yí'],
  ['nǎlǐ', 'nǎ lǐ'],
  ['fēicháng', 'fēi cháng'],
  ['qīdài', 'qī dài'],
  ['nénggòu', 'néng gòu'],
  ['shuāngyíng', 'shuāng yíng'],
  ['guānyú', 'guān yú'],
  ['fùkuǎn', 'fù kuǎn'],
  ['fāngshì', 'fāng shì'],
  ['kǒngpà', 'kǒng pà'],
  ['shāngliang', 'shāng liang'],
  ['wǒmen', 'wǒ men'],
  ['shìqing', 'shì qíng'],
  ['fāshēng', 'fā shēng'],
  ['guānjiàn', 'guān jiàn'],
  ['bǔjiù', 'bǔ jiù'],
  ['jiějué', 'jiě jué'],
  ['wèntí', 'wèn tí'],
  ['yúkuài', 'yú kuài'],
  ['Chéngméng', 'Chéng méng'],
  ['guānzhào', 'guān zhào'],
  ['róngxìng', 'róng xìng'],
  ['chóngxīn', 'chóng xīn'],
  ['pínggū', 'píng gū'],
  ['bùfèn', 'bù fèn'],
  ['yōuhuà', 'yōu huà'],
  ['kōngjiān', 'kōng jiān'],
  ['jiànyì', 'jiàn yì'],
  ['huòzhě', 'huò zhě'],
  ['xiūgǎi', 'xiū gǎi'],
  ['yìjiàn', 'yì jiàn'],
  ['Lǐjiě', 'Lǐ jiě'],
  ['xūyào', 'xū yào'],
  ['bāngmáng', 'bāng máng'],
  ['zuìjìn', 'zuì jìn'],
  ['jīngcháng', 'jīng cháng'],
  ['tóuténg', 'tóu téng'],
  ['Zánmen', 'Zán men'],
  ['xiānsheng', 'xiān sheng'],
  ['tàitai', 'tài tai'],
  ['bǐjiào', 'bǐ jiào'],
  ['Zhège', 'Zhège'],
  ['Èrshí', 'Èr shí'],
  ['Dìtiě', 'Dì tiě'],
  ['Zàinàbiān', 'Zài nà biān'],
  ['fāngàn', 'fāng àn'],
]

let count = 0
for (const [old, newVal] of fixes) {
  if (content.includes(old)) {
    content = content.split(old).join(newVal)
    count++
  }
}
console.log(`Specific fixes: ${count}`)

fs.writeFileSync(file, content, 'utf8')
console.log('Done')
