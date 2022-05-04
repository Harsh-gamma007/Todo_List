import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import rootReducers from './reducers/index'

const reducer = combineReducers(
  {
    rootReducers,
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const store = configureStore({ reducer })

export default store
