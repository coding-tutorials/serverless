const express = require('express')
const bodyParser = require('body-parser')
//const cors = require('cors')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const app = express()

app.get('/createPhotos/:id', (req, res) => {
  res.json({
    id: req.id,
    photos: ['1', '2', '3']
  })
})

app.get('/', (req, res) => {
  res.send('invalid request')
})

// Export your express server so you can import it in the lambda function.
module.exports = app
