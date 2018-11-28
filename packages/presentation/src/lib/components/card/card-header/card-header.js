import React, { Component } from 'react'

class CardHeader extends Component {
  render() {
    return <div className="flex justify-between">{this.props.children}</div>
  }
}

export default CardHeader
