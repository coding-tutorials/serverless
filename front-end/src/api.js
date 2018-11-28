const axios = require('axios')

const url = 'https://2taws86syf.execute-api.us-west-2.amazonaws.com/prod/pictures/30161392-32c0-4fda-acdb-0db3300babd8'

const getPictures = () => axios.get(url)

module.exports = {
  getPictures
}
