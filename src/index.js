const path = require('path')
const { 
  readFolder, 
  removeIfInTheEndContains, 
  readFiles, 
  removeIfEmpty, 
  removeIfIsNumber, 
  removeIfContains, 
  removeSymbols,
  bundler,
  toJSONFile,
  sortByAscending
} = require('./core')

const symbols = [
  '?', ',', '.', '-', '♪', '<i>', '</i>', '"', '!', '_'
]

readFolder(path.join(__dirname, 'legendas'))
.then(removeIfInTheEndContains('.txt'))
.then(readFiles)
.then(files => files.join(''))
.then(files => files.split('\r\n'))
.then(removeIfEmpty)
.then(removeIfIsNumber)
.then(removeIfContains('-->'))
.then(removeIfContains('font'))
.then(removeSymbols(symbols))
.then(content => content.join(' '))
.then(content => content.split(' '))
.then(removeIfEmpty)
.then(removeIfIsNumber)
.then(bundler)
.then(sortByAscending)
.then(toJSONFile('output'))
.catch(error => {
  console.log('ERROR', error)
})