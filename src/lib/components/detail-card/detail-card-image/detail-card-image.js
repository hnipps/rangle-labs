import React, { Component } from "react";

class DetailCardImage extends Component {
  render() {
    return (
      <img
        className="br-100 h5 w5 dib ba b--black-05 pa2"
        alt={this.props.alt}
        src={this.props.src}
      />
    );
  }
}

export default DetailCardImage;
