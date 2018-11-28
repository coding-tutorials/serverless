const request = require('request')

const PICTURE_SIZE_WIDTH = 300
const PICTURE_SIZE_HEIGHT = 400
const MAX_PICTURE_ID = 1084

const generatePicture = () => {
  const randomPictureId = Math.floor(Math.random() * MAX_PICTURE_ID)
  return `https://picsum.photos/${PICTURE_SIZE_WIDTH}/${PICTURE_SIZE_HEIGHT}/?image=${randomPictureId}`
}

const generateThreePictures = () => {
  const picturesUrls = [generatePicture(), generatePicture(), generatePicture()]
  return picturesUrls
}

module.exports = {
  generateThreePictures
}
