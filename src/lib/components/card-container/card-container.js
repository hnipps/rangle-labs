import React, { Component } from "react";

class CardContainer extends Component {
  render() {
    return <div className="db flex flex-wrap w-75">{ this.props.children }</div>;
  }
}

export default CardContainer;
