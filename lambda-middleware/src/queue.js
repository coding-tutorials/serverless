const AWS = require('aws-sdk')
AWS.config.update({
  accessKeyId: process.env.TF_VAR_aws_access_key,
  secretAccessKey: process.env.TF_VAR_aws_secret_key,
  region: 'us-west-2'
})

const sqs = new AWS.SQS();

const sendMessage = (id) => {
  const message = {
   MessageAttributes: {
    "id": {
      DataType: "String",
      StringValue: "The Whistler"
     }
   },
   MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
   QueueUrl: "https://sqs.us-west-2.amazonaws.com/810028704317/aws-example-queue"
  }

  return new Promise((resolve, reject) =>
    sqs.sendMessage(message, (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  )
}

module.exports = { sendMessage }
