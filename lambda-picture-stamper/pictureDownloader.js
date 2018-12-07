const https = require('https')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v1')

const downloadedFiles = []

const download = (url) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(path.resolve(__dirname, 'tmp', `${uuid()}.jpg`))

  var request = https.get(url, (response) => {
    response.pipe(file)

    response.on('end', () => {
      downloadedFiles.push(file.path)
      resolve(file.path)
    });
    response.on('error', (err) => {
      reject(err)
    })
  }).on('error', (err) => {
    reject(err)
  })
})

const deleteLocalFiles = () => {
  const deletePromises = downloadedFiles.map((file) => new Promise((resolve, reject) => {
    fs.unlink(file, (err) => {
      if (err) console.log("error while deleting file", err)
      resolve(file)
    })
  }))

  return Promise.all(deletePromises).then(() => {
    console.log(`${downloadedFiles.length} file(s) deleted`)
    downloadedFiles.slice(0, downloadedFiles.length) //clear array
  })
}

module.exports = { download, deleteLocalFiles }
