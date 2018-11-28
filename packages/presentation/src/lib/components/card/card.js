import React, { Component } from 'react'

class Card extends Component {
  render() {
    return (
      <article className="helvetica w5 center bg-white br3 pa3 mb3 ba b--black-10">
        {this.props.children}
      </article>
    )
  }
}

export default Card
