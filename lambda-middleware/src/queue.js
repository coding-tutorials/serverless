const AWS = require('aws-sdk')
const logger = require('./logger')
AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'us-west-2'
})

const sqs = new AWS.SQS();

const sendMessageToSqs = ({ sessionId, stampId, pictureUrl }) =>
  new Promise((resolve, reject) => {
    const message = {
     MessageAttributes: {
      "sessionId": {
        DataType: "String",
        StringValue: sessionId
      },
      "stampId": {
        DataType: "String",
        StringValue: stampId
      },
      "pictureUrl": {
        DataType: "String",
        StringValue: pictureUrl
       }
     },
     MessageBody: "picture to stamp",
     QueueUrl: process.env.AWS_QUEUE_URL
    }

    logger.info('queue', 'sending...')
    sqs.sendMessage(message, (err, data) => {
      if (err) {
        logger.error('queue', err, err.stack)
        return reject(err)
      }
      logger.info('queue', 'sent')
      return resolve(data)
    })
  })

const sendMessage = ({ sessionId, stampId, picturesUrls }) => {
  const sendMessages = picturesUrls.map(pictureUrl => sendMessageToSqs({ sessionId, stampId, pictureUrl }))
  return Promise.all(sendMessages)
}

module.exports = { sendMessage }
