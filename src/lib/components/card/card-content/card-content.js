import React, { Component } from "react";

class CardContent extends Component {
  render() {
    return <div className="tc">{ this.props.children }</div>
  }
}

export default CardContent;
