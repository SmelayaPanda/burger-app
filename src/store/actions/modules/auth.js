import axios from 'axios'
import * as actionTypes from '../actionTypes'

const authStart = () => ({
  type: actionTypes.AUTH_START
})

const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token: token,
  userId: userId
})

const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error: error
})

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')
  return ({
    type: actionTypes.AUTH_LOGOUT
  });
}

const checkAuthTimeout = (expirationTime) => dispatch => {
  setTimeout(() => {
    dispatch(logout())
  }, expirationTime * 1000)
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart())
    const API_KEY = 'AIzaSyABXW7iliSGcp4vkrkVcruk_5ZRDM5IOSU'
    const baseUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
    const method = isSignup ? 'signupNewUser' : 'verifyPassword';
    const URL = `${baseUrl}/${method}?key=${API_KEY}`;
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    axios.post(`${URL}`, authData)
      .then(res => {
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000).toString()
        localStorage.setItem('userId', res.data.localId)
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('expirationDate', expirationDate)
        dispatch(authSuccess(res.data.idToken, res.data.localId))
        dispatch(checkAuthTimeout(res.data.expiresIn))
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error))
      })
  }
}

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