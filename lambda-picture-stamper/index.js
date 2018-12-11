const stamper = require('./stamper')

exports.handler = async (event, context) => {
    const { Records } = event
    const requests = Records.map(async ({ messageId, messageAttributes }) => {
      const id = messageAttributes.id.stringValue
      const pictureUrl = messageAttributes.pictureUrl.stringValue
      console.log("index.records", pictureUrl)
      const stampedPicture = await stamper.stampBase64('https://www.w3schools.com/w3css/img_lights.jpg')
      return { id, stampedPicture }
    })

    console.log(1, requests)
    try{
       const awaitedRequests = await Promise.all(requests)
       console.log(2, awaitedRequests)
     }catch(e){
       console.log(3, e.stack)
     }

    return "done"
}
