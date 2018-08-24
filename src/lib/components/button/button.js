import React, { Component } from "react";

class Button extends Component {
  render() {
    return (
      <button
        value={ this.props.value }
        className="bn f6 b no-underline br-pill ph2 pv1 mb2 mh0 dib white bg-dark-red unselectable"
        style={{ cursor: "pointer" }}
        onClick={ this.props.onClick }
      >
        { this.props.children }
      </button>
    );
  }
}

export default Button;
