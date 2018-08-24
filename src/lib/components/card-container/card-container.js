import React, { Component } from "react";

class CardContainer extends Component {
  render() {
    return <div className="db flex flex-wrap w-100 w-75-ns">{ this.props.children }</div>;
  }
}

export default CardContainer;
