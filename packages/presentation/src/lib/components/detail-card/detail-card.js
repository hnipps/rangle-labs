import React, { Component } from 'react'

class DetailCard extends Component {
  render() {
    return <article className="mw6 center ba b--black-10 br3 pa3">{this.props.children}</article>
  }
}

export default DetailCard
