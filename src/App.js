import React from 'react'
import AuthHeader from './Components/AuthHeader'
import routes from './routes'
import './App.css'

function App(props) {
  return (
    <div className="App">
      <AuthHeader />
      {routes}
    </div>
  )
}

export default App
