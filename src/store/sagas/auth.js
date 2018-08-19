import {delay} from 'redux-saga'
import {put} from 'redux-saga/effects'
import * as actions from '../actions'
import axios from "axios";

export function* logoutSaga() {
  yield localStorage.removeItem('token')
  yield localStorage.removeItem('expirationDate')
  yield localStorage.removeItem('userId')
  yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000)
  yield put(actions.logout())
}

export function* authUserSaga(action) {
  yield put(actions.authStart())
  const API_KEY = 'AIzaSyABXW7iliSGcp4vkrkVcruk_5ZRDM5IOSU'
  const baseUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
  const method = action.isSignup ? 'signupNewUser' : 'verifyPassword'
  const URL = `${baseUrl}/${method}?key=${API_KEY}`

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }

  try {
    const res = yield axios.post(`${URL}`, authData)
    const expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000).toString()
    yield localStorage.setItem('userId', res.data.localId)
    yield localStorage.setItem('token', res.data.idToken)
    yield localStorage.setItem('expirationDate', expirationDate)
    yield put(actions.authSuccess(res.data.idToken, res.data.localId))
    yield put(actions.checkAuthTimeout(res.data.expiresIn))
  } catch (err) {
    yield put(actions.authFail(err.response.data.error))
  }
}