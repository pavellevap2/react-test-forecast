import React from 'react'
import ReactDOM from 'react-dom'
import RootContainer from './containers/RootContainer'
import { Provider } from 'react-redux'
import store from './configureStore'

ReactDOM.render(
  <Provider store={store}>
    <RootContainer />
  </Provider>,
  document.getElementById('root'),
)
