import * as actionTypes from '../../actions/actionTypes'

const initState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
  case actionTypes.AUTH_START:
    return {...state, error: null, loading: true}
  case actionTypes.AUTH_FAIL:
    return {...state, error: action.error, loading: false}
  case actionTypes.AUTH_SUCCESS:
    return {
      ...state,
      error: null,
      loading: false,
      token: action.token,
      userId: action.userId
    }
  default:
    return state
  }
}


export default authReducer