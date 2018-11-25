const awsServerlessExpress = require('aws-serverless-express')
const app = require('./src/server')

const isProductionEnvironment = process.env.NODE_ENV === 'production'

const startAwsLambdaServer = () => {
  const server = awsServerlessExpress.createServer(app)
  exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)
}

const startLocalServer = () => {
  app.listen('3000', () => {
    console.log('lambda-middleware listening at :3000')
  })
}

if(isProductionEnvironment) {
  return startAwsLambdaServer()
}

return startLocalServer()
