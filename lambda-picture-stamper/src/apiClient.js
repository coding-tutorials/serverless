const https = require('https')
const MIDDLEWARE_API_URL = process.env.MIDDLEWARE_API_URL

const postPicture = (id, base64Picture) => {
  const content = querystring.stringify({
    id, base64Picture
  })

  const request = http.request({
    hostname: MIDDLEWARE_API_URL,
    path: `/oi`,
    headers: {
     'Content-Type': 'application/x-www-form-urlencoded',
     'Content-Length': content.length
    }
  },(res) => {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      })

      req.on('error', (e) => {
        console.error(e);
      })
  });
}

const sendPictures = (pictures) => {
  const postPictures = pictures.map(({ id, base64Picture }) => postPicture(id, base64Picture))
}

module.exports = { sendPictures }
