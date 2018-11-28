import React, { Component } from 'react'
import constants from '../../../application/constants'

class Status extends Component {
  color

  determineColor = () => {
    this.color = constants.colors.haitusColor
  }

  render() {
    this.determineColor()
    let sizeClasses
    let fontSize
    if (this.props.size === 'L') {
      sizeClasses = 'h2 w2'
      fontSize = 'f3'
    } else {
      sizeClasses = 'h1 w1'
      fontSize = 'f5'
    }
    return (
      <div className={`${fontSize} fw4 gray mt0 flex items-center`}>
        <div className={`${sizeClasses} br-100 dib mr2`} style={{ backgroundColor: this.color }} />
        <p className="dib mv1 moon-gray">{this.props.status}</p>
      </div>
    )
  }
}

export default Status
