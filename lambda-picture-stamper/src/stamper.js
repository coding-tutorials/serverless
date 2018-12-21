const pictureDownloader = require('./pictureDownloader')
const stampGetter = require('./stampGetter')
const sharp = require('sharp')
const logger = require('./logger')

const applyStamp = async(imageBuffer, pictureUrl, stampSize, width, height) => {
  logger.info("stamp.goingToDownloadStamp", pictureUrl)
  const stampFile = await pictureDownloader.download(pictureUrl)

  logger.info("stamp.downloadedStamp", stampFile)
  const stampResizedBuffer = await sharp(stampFile).resize({ width: stampSize }).toBuffer()
  const left = Math.floor(Math.random() * width)
  const top = Math.floor(Math.random() * height)

  return await sharp(imageBuffer)
    .overlayWith(stampResizedBuffer, { left, top })
    .toBuffer()
}

const stampBase64 = async(url) => {
  logger.info('stamper.url', url)
  const pictureToStamp = await pictureDownloader.download(url)

  logger.info('stamper.downloaded', url)
  const picturetoStampSharp = sharp(pictureToStamp)
  const { width, height } = await picturetoStampSharp.metadata()

  const stampSize = Math.floor(width / 10)
  const stampsCount = Math.floor(Math.random() * 3) + 1
  const stampUrls = stampGetter.getRandomStampsUrl(stampsCount)

  const pictureToStampBuffer = await picturetoStampSharp.toBuffer()

  const applyStampsSync = stampUrls.reduce((accumulatedPromise, { pictureUrl }) =>
    accumulatedPromise.then((newBuffer) => applyStamp(newBuffer, pictureUrl, stampSize, width, height))
  , Promise.resolve(pictureToStampBuffer))

  try{
    const appliedStampsBuffer = await applyStampsSync
    const lowQualityImage = await sharp(appliedStampsBuffer).jpeg({ quality: 10 }).toBuffer()
    await pictureDownloader.deleteLocalFiles()
    return `data:image/jpeg;base64,${lowQualityImage.toString('base64')}`

  } catch(e) {
    logger.error('stamper.applyStamps', e)
    await pictureDownloader.deleteLocalFiles()
    return
  }
}

module.exports = { stampBase64 }
