const fs = require('fs')
const path = require('path')

async function readFolder(folderPath) {
  return new Promise((resolve, reject) => {
    try {
      const files = fs.readdirSync(folderPath).map(file => path.join(folderPath, file))

      resolve(files)
    } catch (error) {
      reject(error)
    }
  })
}

function removeIfInTheEndContains(pattern) {
  return array => array.filter(item => !item.endsWith(pattern))
}

async function readFiles(files) {
  return new Promise((resolve, reject) => {
    try {
      const readFiles = files.map(file => {
        return fs.readFileSync(file, { encoding: 'utf-8' })
      })

      resolve(readFiles)
    } catch (error) {
      reject(error)
    }
  })
}

function removeIfEmpty(array) {
  return array.filter(item => item.length > 0)
}

function removeIfIsNumber(array) {
  return array.filter(item => isNaN(item))
}

function removeIfContains(pattern) {
  return array => array.filter(item => !item.includes(pattern))
}

function removeSymbols(symbols) {
  return array => array.map(item => {
    return symbols.reduce((final, symbol) => {
      return final.split(symbol).join('')
    }, item)
  })
}

function bundler(array) {
  const map = new Map()

  array
  .map(item => item.toLowerCase())
  .forEach(item => {
    if (map.has(item)) {
      map.set(item, map.get(item) + 1)
    } else {
      map.set(item, 1)
    }
  })

  return toJSON(map)
}

function toJSON(map) {
  const obj = {}

  for (let key of map.keys()) {
    obj[key] = map.get(key)
  }

  return obj
}

function sortByAscending(object) {
  let newObject = {}

  Object.keys(object).sort((o1, o2) => {
    return object[o2] - object[o1]
  }).forEach(item => {
    newObject[item] = object[item]
  })

  return newObject
}

function toJSONFile(fileName) {
  return function(object) {
    return new Promise((resolve, reject) => {
      let finalFileName = fileName
      finalFileName = finalFileName.includes('.json') ? finalFileName : finalFileName.concat('.json')

      const strJSON = JSON.stringify(object, null, 2)
  
      try {
        fs.writeFileSync(finalFileName, strJSON, { encoding: 'utf-8' })

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}

module.exports = {
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
}