const stamper = require('./src/stamper')
const apiClient = require('./src/apiClient')

const mockEvent = {
  Records: [
    { messageId: 0, messageAttributes: { id: 1, pictureUrl: 'https://www.w3schools.com/w3css/img_lights.jpg' }}
  ]
}

const getPicturesToStampFromEvent = ({ Records }) =>
  Records.map(({ messageId, messageAttributes }) => {
    const id = messageAttributes.id.stringValue
    const pictureUrl = messageAttributes.pictureUrl.stringValue
    return { id, stampedPicture }
  })


exports.handler = async (awsEvent, context) => {
  const event = process.env.NODE_ENV === 'production' ? awsEvent : mockEvent
  const picturesToStamp = getPicturesToStampFromEvent(event)

  logger.info('index', `${picturesToStamp.length} picture(s) to stamp`)

  const stampedPicturesPromises = picturesToStamp.map(({ id, pictureUrl }) =>
    stamper.stampBase64('https://www.w3schools.com/w3css/img_lights.jpg')
  )

  const stampedPictures = await Promise.all(stampedPicturesPromises)
  logger.info('index', `${stampedPictures.length} picture(s) stamped`)

  const sentPictures = await apiClient.sendPictures(stampedPictures)
  return
}
