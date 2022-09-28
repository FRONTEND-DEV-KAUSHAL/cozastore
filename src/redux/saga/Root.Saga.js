import { all } from 'redux-saga/effects'
import { signUpSaga } from './Auth.Saga'

export function* rootSaga(){
    yield all([
        signUpSaga()
    ])
}