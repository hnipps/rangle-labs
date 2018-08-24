import React, { Component } from "react";
import { Link } from 'react-router-dom';

class LinkButton extends Component {
  render() {
    return (
      <Link
        className="helvetica f5 b no-underline br-pill ph3 pv2 mb2 ml2 dib white bg-dark-red unselectable"
        style={{cursor: "pointer"}}
        to={this.props.to}
      >
        { this.props.children }
      </Link>
    );
  }
}

export default LinkButton;
