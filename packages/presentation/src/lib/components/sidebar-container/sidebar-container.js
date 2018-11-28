import React, { Component } from 'react'

class SidebarContainer extends Component {
  render() {
    return <div className="w-100">{this.props.children}</div>
  }
}

export default SidebarContainer
