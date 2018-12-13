const app = require('./src/server')
const logger = require('./src/logger')
const isProductionEnvironment = process.env.NODE_ENV === 'production'

const startAwsLambdaServer = () => {
  const awsServerlessExpress = require('aws-serverless-express')

  const server = awsServerlessExpress.createServer(app)
  exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)
}

const startLocalServer = () => {
  app.listen('3000', () => {
    logger.info('index', 'local server listening at :3000')
  })
}

if(isProductionEnvironment) {
  logger.info('index', 'starting server on AWS')
  return startAwsLambdaServer()
}

logger.info('index', 'starting local server')
return startLocalServer()
