import axios from 'axios'
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
    const API_KEY = 'AIzaSyABXW7iliSGcp4vkrkVcruk_5ZRDM5IOSU'
    const URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    console.log(authData);
    axios.post(`${URL}/signupNewUser?key=${API_KEY}`, authData)
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(authFail(err))
      })
  }
}