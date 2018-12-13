const Pusher = require('pusher')
const logger = require('./logger')

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'us2'
});

const notify = ({ sessionId, pictureId }) => new Promise((resolve, reject) => {
  logger.info('notify', 'sending...')
  pusher.trigger(`channel-${sessionId}`, 'pictureStampEvent', `{ "sessionId": "${sessionId}", "pictureId": "${pictureId}" }`, undefined, (err, data) => {
    if(err){
      logger.error('notify', err)
      return reject(err)
    }
    logger.info('notify', 'sent')
    resolve(data)
  })
})

module.exports = { notify }
