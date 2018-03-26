import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root/Root'
import { Provider } from 'react-redux'
import store from './configureStore'

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root'),
)
