import React from 'react'
import ReactDOM from 'react-dom'

import { EPanels } from 'constants/panels'

import App from './App'
import { RouterServiceProvider } from './services/router-service'

import './init'

ReactDOM.render(
  <RouterServiceProvider initPanel={EPanels.FIGHT}>
    <App />
  </RouterServiceProvider>,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'development') {
  import('./eruda').then(({ default: eruda }) => {}) //runtime download
}
