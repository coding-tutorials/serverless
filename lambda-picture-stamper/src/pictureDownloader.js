const https = require('https')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v1')
const logger = require('./logger')

const downloadedFiles = []

const download = (url) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(`/tmp/${uuid()}.jpg`)

  var request = https.get(url, (response) => {
    response.pipe(file)

    file.on('finish', function() {
      file.close((err, data) => {
        if(err) return reject(err)
        downloadedFiles.push(file.path)
        return resolve(file.path)
      })
    })

    response.on('error', (err) => {
      logger.error('pictureDownloader.https.response')
      reject(err)
    })
  }).on('error', (err) => {
    logger.error('pictureDownloader.https.get')
    reject(err)
  })
})

const deleteLocalFiles = () => {
  const deletePromises = downloadedFiles.map((file) => new Promise((resolve, reject) => {
    fs.unlink(file, (err) => {
      if (err){
        logger.error("pictureDownloader.deleteFile", err)
      }

      resolve(file)
    })
  }))

  return Promise.all(deletePromises).then(() => {
    logger.info('pictureDownloader.delete', `${downloadedFiles.length} file(s) deleted`)
    downloadedFiles.slice(0, downloadedFiles.length) //clear array

    fs.readdir(`/tmp`, (err, files) => {
      logger.info('pictureDownloader.filesInTemp', files.length)
    })
  })
}

module.exports = { download, deleteLocalFiles }
