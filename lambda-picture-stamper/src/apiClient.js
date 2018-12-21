const request = require('request')
const logger = require('./logger')
const { MIDDLEWARE_API_URL } = process.env


const sendPictures = (pictures) => {
  const postPicturesPromises = pictures.map(
    (properties) => new Promise((resolve, reject) => {
      request.post(`${MIDDLEWARE_API_URL}/pictures`, { form: properties }, (err, data) => {
        if(err) return reject(err)
        return resolve(data)
      })
    })
  )

  return Promise.all(postPicturesPromises)
    .then((results) => {
      results.forEach((r) => logger.info('apiClient', `${r.statusCode} ${r.body}`))
    })
    .catch((e) => logger.error('apiClient', e))
}

module.exports = { sendPictures }
