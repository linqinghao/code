import React from 'react'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Router from './myReactRouter/react-router-dom/BrowserRouter'
import Route from './myReactRouter/react-router/Route'
import Switch from './myReactRouter/react-router/Switch'
import Login from './Login'
import Home from './Home'

function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
    </Router>
  )
}

export default App
