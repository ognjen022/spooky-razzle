import React from 'react'
import { hydrate } from 'react-dom'

import Root from './Root'

hydrate(<Root />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
