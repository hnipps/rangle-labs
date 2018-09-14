import React, { Component } from "react";

class CardContent extends Component {
  render() {
    return <div className="tl">{ this.props.children }</div>
  }
}

export default CardContent;
