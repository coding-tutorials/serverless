const axios = require('axios')
const uuidv1 = require('uuid/v1')

const url = process.env.MIDDLEWARE_API_URL

const getPictures = (sessionId) => new Promise((resolve, reject) =>
  axios.get(`${url}/pictures/${sessionId}`)
  .then((response) => resolve(response.data.picturesUrls))
  .catch((err) => reject(err))
)

const getPicture = (pictureId) => new Promise((resolve, reject) =>
  axios.get(`${url}/picture/${pictureId}`)
  .then((response) => resolve(response.data))
  .catch((err) => reject(err))
)

const getSession = () => new Promise((resolve, reject) =>
  axios.get(`${url}/session`)
  .then((response) => resolve(response.data.sessionId))
  .catch((err) => reject(err))
)

module.exports = {
  getPictures,
  getSession,
  getPicture
}
