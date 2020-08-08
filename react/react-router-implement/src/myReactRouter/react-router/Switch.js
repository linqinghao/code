import React from 'react'
import RouterContext from './RouterContext'
import matchPath from './matchPath'

class Switch extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const location = context.location
          let element, match
          React.Children.forEach(this.props.children, child => {
            if (!match && React.isValidElement(child)) {
              element = child
              match = matchPath(location.pathname, child.props)
            }
          })
          return match
            ? React.cloneElement(element, { location, computedMatch: match })
            : null
        }}
      </RouterContext.Consumer>
    )
  }
}

export default Switch