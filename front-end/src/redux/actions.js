const api = require('../domain/api')

const actions = {
  GET_TOKEN: 'GET_TOKEN',
  GET_TOKEN_ERROR: 'GET_TOKEN_ERROR',
  GET_PICTURES: 'GET_PICTURES',
  GET_PICTURES_ERROR: 'GET_PICTURES_ERROR',
}

const getPictures = (tokenId, dispatch) => api.getPictures(tokenId)
  .then((response) => dispatch({
    type: actions.GET_PICTURES,
    pictures: response
  }))
  .catch((response) => dispatch({
    type: actions.GET_PICTURES_ERROR,
    error: response
  }))

export const getToken = (cookieId) => (dispatch) =>
  api.getToken()
  .then((tokenId) => {
    getPictures(tokenId, dispatch)

    dispatch({
     type: actions.GET_TOKEN,
     tokenId: tokenId
   })
  })
  .catch((response) => dispatch({
    type: actions.GET_TOKEN_ERROR,
    error: error
  }))

export default actions
