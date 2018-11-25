const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const pictureGenerator = require('./pictureGenerator')
const database = require('./database')

app.get('/pictures/:id', async (req, res) => {
  const id = req.params.id
  console.log('vai gerar pics')
  const pictures = await pictureGenerator.generateThreePictures()
  console.log('vai gerar data')
  await database.savePictures(id, pictures)

  res.json({
    id,
    pictures
  })
})

app.get('/', (req, res) => {
  res.send('invalid request')
})

// Export your express server so you can import it in the lambda function.
module.exports = app
