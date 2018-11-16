exports.handler = (event, context) => {
  console.log("tacale")
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Tacallypau!!',
      input: event,
    }),
  }

}
