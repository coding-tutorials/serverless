const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const isProductionEnvironment = process.env.NODE_ENV === 'production'

const app = express()
app.use(cors())

const pictureGenerator = require('./pictureGenerator')
const database = require('./database')

app.get('/pictures/:id', async (req, res) => {
  const id = req.params.id
  const pictures = pictureGenerator.generateThreePictures()
  const ip = isProductionEnvironment ? JSON.parse(decodeURIComponent(req.headers['x-apigateway-event'])).identity.sourceIp : req.connection.remoteAddress

  await database.savePictures(id, pictures)

  res.json({
    id,
    pictures,
    user: req.apiGateway.event.requestContext.identity
  })
})

app.get('/', (req, res) => {
  res.send('invalid request')
})

// Export your express server so you can import it in the lambda function.
module.exports = app
