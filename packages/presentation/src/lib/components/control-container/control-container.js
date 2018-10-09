import React, { Component } from "react";

class ControlContainer extends Component {
  render() {
    return <div className="db header-link mv3">{ this.props.children }</div>;
  }
}

export default ControlContainer;
