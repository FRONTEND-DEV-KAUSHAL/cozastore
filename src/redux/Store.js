import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import { rootreducer } from './reducer/Root.Reducer'
// import { rootSaga } from './saga/Root.action'


const sagaMiddleware = createSagaMiddleware()

const middlewares = [thunk, sagaMiddleware];

export const store = createStore(
  rootreducer,
  applyMiddleware(...middlewares)
)

// sagaMiddleware.run(rootSaga)