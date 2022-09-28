import { call, takeEvery, put, all } from 'redux-saga/effects'
import { signInApi, Signupapi } from '../../common/apis/Auth.Api';
import { SIGNIN_ACTION, SIGNUP_ACTION } from '../Actiontypes';


function* SignUp(action) {
  try {
    const user = yield call(Signupapi, action.payload)
    console.log(user);
  } catch (e) {
        let errorMessage = e.message 
        console.error(errorMessage);
  }
}

function* watchSignUp() {
  yield takeEvery(SIGNUP_ACTION, SignUp);
}

export function* signUpSaga() {
  yield all([
    watchSignUp(),
  ])
}