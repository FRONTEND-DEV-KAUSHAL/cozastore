import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import { forgotApi, signInApi, signOutApi, signUpApi } from '../../common/apis/Auth.Api';
import { history } from '../../History';
import { loggedInAction, logoutAction } from '../action/Auth.Action';
import * as Actiontypes from "../Actiontypes"

function* signUp(action) {
  try {
    const user = yield call(signUpApi, action.payload);
    console.log(user);
    //   yield put({type: "USER_FETCH_SUCCEEDED", user: user});
  } catch (e) {
    console.log(e.message);
    //   yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

export function* watchSignup() {
  yield takeEvery(Actiontypes.SIGNUP_ACTION, signUp);
}

function* signin(action) {
  try {
    const user = yield call(signInApi , action.payload);
    console.log(user);
      yield put(loggedInAction(user));
      history.push('/')
  } catch (e) {
    console.log(e);
    //   yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}


export function* watchSignin() {
  yield takeEvery(Actiontypes.SIGNIN_ACTION, signin);
}

function* forgot(action) {
  try {
    const user = yield call(forgotApi, action.payload);
    console.log(user);
    yield put(Actiontypes.LOGGEDIN_ACTION(user))
    history.push('/')
    
  } catch (e) {
    console.log(e);
    // yield put(setAlert({ text: e.payload, color: "error" }))
  }
}

export function* watchForgot() {
  yield takeEvery(Actiontypes.FORGOT_ACTION, forgot);
}

function* signOut(action) {
  try {
      const user = yield call(signOutApi)
      console.log(user);
      yield put(logoutAction(user))
      history.push('/')

  } catch (error) {
      console.log(error);
      // yield put(setAlert({ text: error.payload, color: "error" }))
  }
}
export function* watchSignout() {
  yield takeEvery(Actiontypes.LOGOUT_ACTION, signOut);
}

export function* authsaga() {
  yield all([
    watchSignup(),
    watchSignin(),
    watchForgot(),
    watchSignout()
  ])
}