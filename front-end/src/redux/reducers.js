import actions from './actions'

const initialState = {
  sessionId: 0,
  status: '',
  picturesUrls: [],
  stampedPictures:  []
}

const reducers = (state = initialState, action) => {
  if(action.type === actions.GET_SESSION) {
    return { ...state, sessionId: action.sessionId, status: actions.GET_SESSION }
  }

  if(action.type === actions.GET_PICTURES) {
    return { ...state, status: action.type, picturesUrls: state.picturesUrls.concat(action.picturesUrls) }
  }

  if(action.type === actions.GET_STAMPED_PICTURE) {
    return { ...state, status: action.type, stampedPictures: state.stampedPictures.concat(action.stampedPicture) }
  }

  console.log('klebao')
  return state
}

export default reducers
