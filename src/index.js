import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { io } from 'socket.io-client'

const socket = io(process.env.REACT_APP_BACKEND_ENDPOINT, { autoConnect: false })

ReactDOM.render(
  <React.StrictMode>
    <App socket={socket}/>
  </React.StrictMode>,
  document.getElementById('root')
)
