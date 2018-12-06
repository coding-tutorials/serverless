const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const isProductionEnvironment = process.env.NODE_ENV === 'production'

const app = express()
app.use(cors())

const pictureGenerator = require('./pictureGenerator')
const database = require('./database')
const queue = require('./queue')

const getIp = (req) => isProductionEnvironment ? JSON.parse(decodeURIComponent(req.headers['x-apigateway-event'])).requestContext.identity.sourceIp : req.connection.remoteAddress


app.get('/pictures/:id', async (req, res) => {
  const id = req.params.id
  const pictures = await pictureGenerator.generateThreePictures()

  await database.savePictures(id, pictures)

  await queue.sendMessage(id, pictures)

  res.json({
    id,
    pictures,
    ip: getIp(req)
  })
})

app.get('/token', async(req, res) => {
  const ip = getIp(req)

  const tokenId = await database.saveToken(ip)


  res.json({
    tokenId
  })
})

app.get('/', (req, res) => {


  res.send('invalid request')
})

// Export your express server so you can import it in the lambda function.
module.exports = app
