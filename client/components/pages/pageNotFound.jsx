import React, { Component } from 'react';
import { render } from 'react-dom'

export default class PageNotFound extends Component {

  render() {
    return (<div>
      <div className="not-found">
        <h1>404 - Page Not Found</h1>
      </div>
    </div>)
  }
}
render(<PageNotFound />, document.getElementById('app'));