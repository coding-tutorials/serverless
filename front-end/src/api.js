const axios = require('axios')
const uuidv1 = require('uuid/v1')

const url = `https://2taws86syf.execute-api.us-west-2.amazonaws.com/prod`

const getPictures = (id) => axios.get(`${url}/pictures/${id}`)

const getToken = () => axios.get(`${url}/token`)

module.exports = {
  getPictures,
  getToken
}
