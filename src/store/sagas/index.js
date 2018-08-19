import {takeEvery, all} from 'redux-saga/effects'
import {authCheckStateSaga, authUserSaga, checkAuthTimeoutSaga, logoutSaga} from './auth'
import * as actionTypes from '../actions/actionTypes'

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_INIT_STATE, authCheckStateSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga)
  ])
}