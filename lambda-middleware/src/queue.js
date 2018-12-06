const AWS = require('aws-sdk')
AWS.config.update({
  accessKeyId: process.env.TF_VAR_aws_access_key,
  secretAccessKey: process.env.TF_VAR_aws_secret_key,
  region: 'us-west-2'
})

const sqs = new AWS.SQS();

const sendMessageToSqs = (id, picture) =>
  new Promise((resolve, reject) => {
    const message = {
     MessageAttributes: {
      "id": {
        DataType: "String",
        StringValue: id
      },
      "pictureUrl": {
        DataType: "String",
        StringValue: picture
       }
     },
     MessageBody: "picture",
     QueueUrl: "https://sqs.us-west-2.amazonaws.com/810028704317/aws-example-queue"
    }

    sqs.sendMessage(message, (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })

const sendMessage = (id, pictures) => {
  const sendMessages = pictures.map(picture => sendMessageToSqs(id, picture))
  return Promise.all(sendMessages)
}

module.exports = { sendMessage }
