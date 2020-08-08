import React from 'react'
import Router from '../react-router/Router'
import createHistory from '../history'

class BrowserRouter extends React.Component {
  history = createHistory(this.props)

  render() {
    return <Router history={this.history} children={this.props.children} />
  }
}

export default BrowserRouter
