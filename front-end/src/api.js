const axios = require('axios')
const uuidv1 = require('uuid/v1')

const url = `https://2taws86syf.execute-api.us-west-2.amazonaws.com/prod/pictures/${uuidv1()}`

const getPictures = () => axios.get(url)

module.exports = {
  getPictures
}
