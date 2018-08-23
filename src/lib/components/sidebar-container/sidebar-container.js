import React, { Component } from "react";

class SidebarContainer extends Component {
  render() {
    return <div className="w-100 w-25-ns">{ this.props.children }</div>;
  }
}

export default SidebarContainer;
