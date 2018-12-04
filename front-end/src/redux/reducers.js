import actions from './actions'

const initialState = {
  tokenId: 0,
  status: 0,
  pictures: [undefined, undefined, undefined]
}

const reducers = (state = initialState, action) => {
  if(action.type === actions.GET_TOKEN) {
    return { ...state, tokenId: action.tokenId, status: actions.GET_TOKEN }
  }

  if(action.type === actions.GET_TOKEN_ERROR) {
    console.log("OE?")
    return state
  }

  if(action.type === actions.GET_PICTURES) {
    return { ...state, status: action.type, pictures: action.pictures }
  }

  if(action.type === actions.GET_PICTURES_ERROR) {
    return { ...state, error: action.error}
  }

  return state
}

export default reducers
