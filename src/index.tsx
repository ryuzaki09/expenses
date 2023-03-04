import React from 'react'
import ReactDOM from 'react-dom'

import { Main } from "./main";


// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept()
}


function App() {
  return <Main />
}

ReactDOM.render(<App />, document.getElementById('root'))
