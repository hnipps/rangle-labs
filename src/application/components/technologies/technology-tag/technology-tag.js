import React, { Component } from "react";
import "./technology-tag.scss";

class TechnologyTag extends Component {
  handleTagClick = () => {
    if (this.props.isDisabled || this.props.isBeingEdited) return;
    this.props.handleTechFilter(this.props.technology._id);
  };

  deleteTechnology = (event) => {
    console.log(event);
    event.preventDefault();
    
    const technologyId = event.target.value;
    this.props.deleteTechnology(technologyId)
  }

  render() {
    const activeClass = this.props.isActiveFilter ? "active" : "";
    const disabledClass = this.props.isDisabled ? "disabled" : "";

    let removeButton;
    if (this.props.isBeingEdited) {
      removeButton = <button style={{display:"inline", marginLeft:"0.5em"}} value={this.props.technology._id} onClick={this.deleteTechnology} >-</button>;
    }

    return (
      <div
        key={`technology-tag-${this.props.technology.name}`}
        className={`technology-tag ${activeClass} ${disabledClass}`}
        onClick={this.handleTagClick}
      >
        {this.props.technology.name}
        {removeButton}
      </div>
    );
  }
}

export default TechnologyTag;
