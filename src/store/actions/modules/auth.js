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
    console.log(authData);

    axios.post(`${URL}`, authData)
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data.idToken, res.data.localId))
      })
      .catch(err => {
        console.log(err)
        dispatch(authFail(err))
      })
  }
}