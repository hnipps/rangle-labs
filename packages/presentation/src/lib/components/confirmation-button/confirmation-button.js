import React, { Component } from 'react'

class ConfirmationButton extends Component {
  onClickConfirmation = event => {
    if (window.confirm('Are you sure?')) {
      this.props.onClick(event)
    }
  }
  render() {
    return (
      <React.Fragment>
        {React.cloneElement(this.props.children, {
          onClick: this.onClickConfirmation,
        })}
      </React.Fragment>
    )
  }
}

export default ConfirmationButton
