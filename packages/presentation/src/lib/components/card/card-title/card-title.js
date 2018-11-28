import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CardTitle extends Component {
  render() {
    return (
      <Link className="no-underline dark-gray hover-blue" to={this.props.to}>
        <h1 className="f3 mb2">{this.props.children}</h1>
      </Link>
    )
  }
}

export default CardTitle
