const request = require('request')
const logger = require('./logger')

const PICTURE_SIZE_WIDTH = 300
const PICTURE_SIZE_HEIGHT = 400

const pictureGeneratorUrl = `https://picsum.photos/${PICTURE_SIZE_WIDTH}/${PICTURE_SIZE_HEIGHT}/?random`

const generatePicture = () => new Promise((resolve, reject) => {
  request(pictureGeneratorUrl, (error, response, body) => {
    if(error) return reject(error)
    return resolve(response)
  })
})

const generateThreePictures = () =>
  Promise.all([generatePicture(), generatePicture(), generatePicture()])
    .then((picturesResponse) => picturesResponse.map((pictureResponse) => pictureResponse.request.uri.href))
    .catch((e) => logger.error('pictureGenerator', e, e.stack))

module.exports = { generateThreePictures }
