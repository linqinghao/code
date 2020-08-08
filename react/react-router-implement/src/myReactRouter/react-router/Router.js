import React from 'react'
import RouterContext from './RouterContext'
import HistoryContext from './HistoryContext'

class Router extends React.Component {
  static computeRootMatch(pathname) {
    return { path: '/', url: '/', params: {}, isExact: pathname === '/' }
  }

  constructor(props) {
    super(props)

    this.state = {
      location: props.history.location,
    }

    this._isMounted = false
    this._pendingLocation = null

    this.unlisten = props.history.listen(location => {
      if (this._isMounted) {
        this.setState({ location })
      } else {
        this._pendingLocation = location
      }
    })
  }

  componentDidMount() {
    this._isMounted = true

    if (this._pendingLocation) {
      this.setState({ location: this._pendingLocation })
    }
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten()
      this._isMounted = false
      this._pendingLocation = null
    }
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          history: this.props.history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname),
        }}
      >
        <HistoryContext.Provider
          children={this.props.children || null}
          value={this.props.history}
        ></HistoryContext.Provider>
      </RouterContext.Provider>
    )
  }
}

export default Router
