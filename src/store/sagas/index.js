import {takeEvery} from 'redux-saga/effects'
import {authCheckStateSaga, authUserSaga, checkAuthTimeoutSaga, logoutSaga} from './auth'
import * as actionTypes from '../actions/actionTypes'

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga)
  yield takeEvery(actionTypes.AUTH_CHECK_INIT_STATE, authCheckStateSaga)
}