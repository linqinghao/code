import React from 'react'
import RouterContext from '../react-router/RouterContext'

function LinkAnchor({ navigate, ...rest }) {
  let props = {
    ...rest,
    onClick: event => {
      event.preventDefault()
      navigate()
    },
  }
  return <a {...props}>{props.children}</a>
}

function Link({ component = LinkAnchor, to, ...rest }) {
  return (
    <RouterContext.Consumer>
      {context => {
        const { history } = context
        const props = {
          ...rest,
          href: to,
          navigate() {
            history.push(to)
          },
        }
        return React.createElement(component, props)
      }}
    </RouterContext.Consumer>
  )
}

export { Link }
