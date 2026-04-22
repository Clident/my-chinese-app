const fs = require('fs')
const path = 'C:/Users/quent/Desktop/my-chinese-app/lib/hsk-fallback-data.ts'
let c = fs.readFileSync(path, 'utf8')
c = c.replace("Nuòbèi'ěr", "Nuòbèi\\'ěr")
c = c.replace("Don't", "Don\\'t")
c = c.replace("It's", "It\\'s")
fs.writeFileSync(path, c)
console.log('done')
