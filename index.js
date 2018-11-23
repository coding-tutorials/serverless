module.exports.handler = (event, context) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Tacallypau!!',
      input: event,
    }),
  }

}
