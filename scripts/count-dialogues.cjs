const fs = require('fs')
const content = fs.readFileSync('C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts', 'utf8')

// Count dialogues by counting scene: entries in each section
const hsk12Matches = content.match(/export const hsk12Dialogues[\s\S]*?(?=export const hsk34Dialogues)/)
const hsk34Matches = content.match(/export const hsk34Dialogues[\s\S]*?(?=export const hsk56Dialogues)/)
const hsk56Matches = content.match(/export const hsk56Dialogues[\s\S]*?(?=\/\/ Helper)/)

function countScenes(section) {
  if (!section) return 0
  return (section.match(/scene: '/g) || []).length
}

console.log('HSK1-2:', countScenes(hsk12Matches?.[0]))
console.log('HSK3-4:', countScenes(hsk34Matches?.[0]))
console.log('HSK5-6:', countScenes(hsk56Matches?.[0]))
console.log('Total:', countScenes(hsk12Matches?.[0]) + countScenes(hsk34Matches?.[0]) + countScenes(hsk56Matches?.[0]))
