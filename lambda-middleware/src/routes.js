const logger = require('./logger')
const pictureGenerator = require('./pictureGenerator')
const sessionsRepository = require('./sessionsRepository')
const stampsRepository = require('./stampsRepository')
const notification = require('./notification')
const queue = require('./queue')
const isProductionEnvironment = process.env.NODE_ENV === 'production'

const createRoutes = (app) => {
  app.get('/session', async(req, res) => {
    logger.info('routes', 'GET /session')
    const ip = isProductionEnvironment ? JSON.parse(decodeURIComponent(req.headers['x-apigateway-event'])).requestContext.identity.sourceIp : req.connection.remoteAddress
    const sessionId = await sessionsRepository.add(ip)

    return res.json({ sessionId })
  })

  app.get('/pictures/:sessionId', async (req, res) => {
    const { sessionId } = req.params
    logger.info('routes', `GET /pictures/${sessionId}`)
    const picturesUrls = await pictureGenerator.generateThreePictures()
    const stampId = await stampsRepository.add(sessionId, picturesUrls)

    await queue.sendMessage({ sessionId, stampId, picturesUrls })

    return res.json({ sessionId, stampId, picturesUrls })
  })

  app.post('/pictures', async (req, res) => {
    const { sessionId, stampId, base64Picture } = req.body
    logger.info('routes', `POST /pictures stampId:${stampId}`)

    const stampedPictureId = await stampsRepository.addPicture(stampId, base64Picture)
    await notification.notify({ sessionId, stampedPictureId })

    return res.sendStatus(200)
  })
}

module.exports = { createRoutes }
