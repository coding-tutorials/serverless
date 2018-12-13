const logger = require('./logger')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { createRoutes } = require('./routes')

const isProductionEnvironment = process.env.NODE_ENV === 'production'

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))

createRoutes(app)

app.get('/', (req, res) => {
  res.send('invalid request')
})

module.exports = app
