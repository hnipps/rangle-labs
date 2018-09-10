import React, { Component } from "react";

class Button extends Component {
 
  render() {
    return (
      <button
        type="button"
        value={ this.props.value }
        className={`bn f5 b no-underline br-pill ph3 pv2 mb2 ml2 dib white bg-${ this.props.color } unselectable`}
        style={{ cursor: "pointer" }}
        onClick={this.props.onClick}
      >
        { this.props.children }
      </button>
    );
  }
}

export default Button;
