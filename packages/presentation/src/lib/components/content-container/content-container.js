import React, { Component } from 'react'

class ContentContainer extends Component {
  render() {
    return <div className="ph2 ph4-ns flex flex-column">{this.props.children}</div>
  }
}

export default ContentContainer
