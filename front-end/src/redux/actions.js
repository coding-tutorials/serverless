const api = require('../domain/api')
const Pusher = require('pusher-js')

const actions = {
  GET_SESSION: 'GET_SESSION',
  GET_TOKEN_ERROR: 'GET_TOKEN_ERROR',
  GET_PICTURES: 'GET_PICTURES',
  GET_PICTURES_ERROR: 'GET_PICTURES_ERROR',
  GET_STAMPED_PICTURE: 'GET_STAMPED_PICTURE'
}

export const listenNotification = (sessionId) => (dispatch) => {
  Pusher.logToConsole = true
  const pusher = new Pusher('5b3f7f34937efe18bd63', { cluster: 'us2', forceTLS: true })
  const channel = pusher.subscribe(`channel-${sessionId}`)
  channel.bind('pictureStampEvent', ({ pictureId }) =>
    api.getPicture(pictureId).then((stampedPicture) => dispatch({
      type: actions.GET_STAMPED_PICTURE,
      stampedPicture
    }))
  )
}

export const getPictures = (sessionId) => (dispatch) =>
  api.getPictures(sessionId)
  .then((picturesUrls) => dispatch({
    type: actions.GET_PICTURES,
    picturesUrls
  }))
  .catch((error) => dispatch({
    type: actions.GET_PICTURES_ERROR,
    error
  }))

export const getSession = (cookieId) => (dispatch) =>
  api.getSession()
  .then((sessionId) => dispatch({
     type: actions.GET_SESSION,
     sessionId
   }))
  .catch((error) => dispatch({
    type: actions.GET_TOKEN_ERROR,
    error
  }))

export default actions
