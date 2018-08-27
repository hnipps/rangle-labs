import React, { Component } from "react";

class CardContainer extends Component {
  render() {
    return <div className="helvetica db flex flex-wrap w-100">{ this.props.children }</div>;
  }
}

export default CardContainer;
