import * as actionTypes from '../actionTypes'


const authStart = () => ({
  type: actionTypes.AUTH_START
})

const authSuccess = payload => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: payload
})

const authFail = payload => ({
  type: actionTypes.AUTH_FAIL,
  payload: payload
})


export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart())
  }
}