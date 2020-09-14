import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import authReducer from './authReducer'

export default createStore(
  authReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware))
)