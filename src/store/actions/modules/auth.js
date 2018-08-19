import * as actionTypes from '../actionTypes'

export const authStart = () => ({
  type: actionTypes.AUTH_START
})

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token: token,
  userId: userId
})

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error: error
})

export const logout = () => ({
  type: actionTypes.AUTH_INITIATE_LOGOUT
})

export const logoutSucceed = () => ({
  type: actionTypes.AUTH_LOGOUT
})

export const checkAuthTimeout = (expirationTime) => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  expirationTime: expirationTime
})

export const auth = (email, password, isSignup) => ({
  type: actionTypes.AUTH_USER,
  email: email,
  password: password,
  isSignup: isSignup
})


export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path: path
})


export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate > new Date()) {
        dispatch(authSuccess(token, localStorage.getItem('userId')))
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
      } else {
        dispatch(logout())
      }
    }
  }
}