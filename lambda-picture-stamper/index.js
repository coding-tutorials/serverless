const stamper = require('./src/stamper')
const apiClient = require('./src/apiClient')
const logger = require('./src/logger')

const getPicturesToStampFromEvent = ({ Records }) =>
  Records.map((record) => {
    const sessionId = record.messageAttributes.sessionId.stringValue
    const stampId = record.messageAttributes.stampId.stringValue
    const pictureUrl = record.messageAttributes.pictureUrl.stringValue

    return { sessionId, stampId, pictureUrl }
  })

const handleAwsEvent = async (event, context) => {

  const picturesToStamp = getPicturesToStampFromEvent(event)
  logger.info('index', `${picturesToStamp.length} picture(s) to stamp`)

  const stampedPicturesPromises = picturesToStamp.map(({ sessionId, stampId, pictureUrl }) =>
    stamper.stampBase64('https://www.w3schools.com/w3css/img_lights.jpg')
      .then((base64Picture) => ({
        sessionId, stampId, base64Picture
      }))
  )

  const stampedPictures = await Promise.all(stampedPicturesPromises)

  logger.info('index', `${stampedPictures.length} picture(s) stamped`)

  const sentPictures = await apiClient.sendPictures(stampedPictures)
  return
}

if(process.env.NODE_ENV === 'production') {
  exports.handler = handleAwsEvent
} else {
  //mock
  handleAwsEvent({
    Records: [
      { messageId: 0, messageAttributes: {
        sessionId: { stringValue: 'efc19340-03dc-11e9-8158-6b95bf3c4d05' },
        stampId: { stringValue: 'fa5abd90-03dc-11e9-8158-6b95bf3c4d05' },
        pictureUrl: { stringValue:'https://www.w3schools.com/w3css/img_lights.jpg' }
      }}
    ]
  })
}
