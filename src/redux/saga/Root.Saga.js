import { all } from 'redux-saga/effects'
import { authsaga } from './Auth.Saga'

export function* rootSaga(){
    yield all([
        authsaga()
    ])
}