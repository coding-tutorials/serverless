const stamper = require('./stamper')

exports.handler = async (event, context) => {
    const { Records } = event
    const requests = Records.map(async ({ messageId, messageAttributes }) => {
      const id = messageAttributes.id.stringValue
      const pictureUrl = messageAttributes.pictureUrl.stringValue

      const stampedPicture = await stamper.stampBase64('https://www.w3schools.com/w3css/img_lights.jpg')
      return { id, stampedPicture }
    })

    console.log(1, requests)
    const awaitedRequests = Promise.all(requests)
    console.log(2, awaitedRequests)

    return "done"
}
