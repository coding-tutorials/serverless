const axios = require('axios')
const uuidv1 = require('uuid/v1')

const url = `https://2taws86syf.execute-api.us-west-2.amazonaws.com/prod`

const getPictures = (tokenId) => new Promise((resolve, reject) =>
  axios.get(`${url}/pictures/${tokenId}`)
  .then((response) => resolve(response.data.pictures))
  .catch((response) => reject(response))
)

const getToken = () => new Promise((resolve, reject) =>
  axios.get(`${url}/token`)
  .then((response) => resolve(response.data.tokenId))
  .catch((response) => reject(response))
)

module.exports = {
  getPictures,
  getToken
}
