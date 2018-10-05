import React, { Component } from "react";

class CardContent extends Component {
  render() {
    return <div className={this.props.alignment}>{ this.props.children }</div>
  }
}

export default CardContent;
