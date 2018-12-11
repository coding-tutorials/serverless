const pictureDownloader = require('./pictureDownloader')
const stampGetter = require('./stampGetter')
const sharp = require('sharp')

const stampBase64 = async(url) => {
  console.log("stamper.goingToDonwload", url)
  const pictureToStamp = await pictureDownloader.download(url)
  console.log("stamper.downloaded", pictureToStamp)
  const picturetoStampSharp = sharp(pictureToStamp)
  const { width, height } = await picturetoStampSharp.metadata()

  const stampSize = Math.floor(width / 10)

  const stampsCount = Math.floor(Math.random() * 3) + 1
  const stampUrls = stampGetter.getRandomStampsUrl(stampsCount)

  const pictureToStampBuffer = await picturetoStampSharp.toBuffer()

  /* this reducer is grouping promises like: Promise.resolve().then().then().then()..
     because we need to do multiple stamps in a picture
     however we can't do multiple stamps at once, we need to do a single stamp in picture (new buffer)
     and the next stamp is done at this new buffer.. not on the original picture
     that's why we can't place this in a Promise.all() and do async
  */
  const applyStampsSync = stampUrls.reduce(async(accumulatedPromise, { pictureUrl }) => {
    console.log("stamp.goingToDownloadStamp", pictureUrl)
    const stampFile = await pictureDownloader.download(pictureUrl)
    console.log("stamp.downloadedStamp", pictureUrl)

    const stampResizedBuffer = await sharp(stampFile).resize({ width: stampSize }).toBuffer()
    const left = Math.floor(Math.random() * width)
    const top = Math.floor(Math.random() * height)

    console.log("stamp.goingToStamp")
    return accumulatedPromise.then(async (newBuffer) =>
      await sharp(newBuffer)
          .overlayWith(stampResizedBuffer, { left, top })
          .toBuffer()
    )
  }, Promise.resolve(pictureToStampBuffer))

  const appliedStampsBuffer = await applyStampsSync
  const lowQualityImage = await sharp(appliedStampsBuffer).jpeg({ quality: 10 }).toBuffer()
  console.log("stamp.goingToDelete")
  await pictureDownloader.deleteLocalFiles()
  console.log("stamp.deleted")
  return `data:image/jpeg;base64,${lowQualityImage.toString('base64')}`
}

module.exports = { stampBase64 }
