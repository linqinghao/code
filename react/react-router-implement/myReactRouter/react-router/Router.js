import React from 'react';

class Router extends React.Component {
  static computeRootMatch(pathname) {
    return { path: '/',  url: "/", params: {}, isExact: pathname === "/"}
  }

  constructor(props) {
    super(props)

    this.state = {
      location: props.history.location,
    }
  }

}