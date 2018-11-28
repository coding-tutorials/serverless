const request = require('request')

const PICTURE_SIZE_WIDTH = 300
const PICTURE_SIZE_HEIGHT = 400

const pictureGeneratorUrl = `https://picsum.photos/${PICTURE_SIZE_WIDTH}/${PICTURE_SIZE_HEIGHT}/?random`

const generatePicture = () => new Promise((resolve, reject) => {
  request(pictureGeneratorUrl, (error, response, body) => {
    if(error){
      return reject(error)
    }

    return resolve(response)
  })
})


const generateThreePictures = async() => {
  const picturesResponse = await Promise.all([generatePicture(), generatePicture(), generatePicture()])
  const urls = picturesResponse.map((pictureResponse) => pictureResponse.request.uri.href)
  return urls
}

module.exports = {
  generateThreePictures
}
