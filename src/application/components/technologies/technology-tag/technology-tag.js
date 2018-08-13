import React, { Component } from "react";
import "./technology-tag.scss";

class TechnologyTag extends Component {
  handleTagClick = () => {
    if (this.props.isDisabled) return;
    this.props.handleTechFilter(this.props.technology._id);
  };

  render() {
    const activeClass = this.props.isActiveFilter ? "active" : "";
    const disabledClass = this.props.isDisabled ? "disabled" : "";

    return (
      <div
        className={`technology-tag ${activeClass} ${disabledClass}`}
        onClick={this.handleTagClick}
      >
        {this.props.technology.name}
      </div>
    );
  }
}

export default TechnologyTag;
