import React from 'react'
import RouterContext from './RouterContext'
import matchPath from './matchPath'

class Route extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const location = context.location
          const match = this.props.computedMatch
            ? this.props.computedMatch
            : matchPath(location.pathname, this.props)
          const props = { ...context, location, match }
          let { component } = this.props
          console.log(match)
          return (
            <RouterContext.Provider value={props}>
              {props.match ? React.createElement(component, props) : null}
            </RouterContext.Provider>
          )
        }}
      </RouterContext.Consumer>
    )
  }
}

export default Route
