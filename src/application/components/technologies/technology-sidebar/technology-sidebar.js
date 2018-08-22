import React, { Component } from "react";

import axios from "axios";

import "./technology-sidebar.scss";
import TechnologyTag from "../technology-tag/technology-tag";
import { doesArrayContainItem } from "../../../helpers";

class TechnologySidebar extends Component {
  state = {
    isBeingEdited: false,
    newTechnology: ""
  };

  determineIfTagIsActiveFilter = tagId => {
    return doesArrayContainItem(this.props.techFilters, tagId);
  };

  determineIfTagIsDisabled = techId => {
    return !doesArrayContainItem(this.props.activeTechnologies, techId);
  };

  editTechnologies = () => {
    this.setState(prevState => ({
      ...prevState,
      isBeingEdited: true
    }));
  };

  acceptChanges = () => {
    this.setState(prevState => ({
      ...prevState,
      isBeingEdited: false,
    }));
  };

  discardChanges = this.acceptChanges;

  onInput = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  addTechnology = (event) => {
    event.preventDefault();
    const newTechnologyName = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      newTechnology: "",
    }));
    this.addNewTechnology({name: newTechnologyName});
  }

  keyUpAddTechnology = (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      this.addTechnology(event);
    }
  }

  addNewTechnology = async technology => {
    try {
      const res = await axios.post("/technologies", technology);

      if (res) {
        this.props.technologies.push(res.data.payload);
        this.props.history.push("/projects");
      }
    } catch (err) {
      console.error("There was an error adding a new technology:", err);
    }
  };

  deleteTechnology = async technologyId => {
    try {
      const res = await axios.delete(`/technologies/${technologyId}`);
      if (res) {
        const indexToRemove = this.props.technologies.findIndex(tech => {
          return tech._id === technologyId;
        });
        this.props.technologies.splice(indexToRemove, 1);
        this.props.history.push("/projects");
      }
    } catch (err) {
      console.error("There was an error deleting a new technology:", err);
    }
  }

  renderTechnologyTags = technologies => {
    return technologies.map(technology => {
      return (
        <TechnologyTag
          technology={technology}
          key={technology._id}
          isActiveFilter={this.determineIfTagIsActiveFilter(technology._id)}
          isDisabled={this.determineIfTagIsDisabled(technology._id)}
          handleTechFilter={techId => this.props.handleTechFilter(techId)}
          isBeingEdited={this.state.isBeingEdited}
          deleteTechnology={this.deleteTechnology}
        />
      );
    });
  };

  render() {
    const { technologies } = this.props;

    let editButton;
    let doneButton;
    let addTechnologyInput;
    if (this.state.isBeingEdited) {
      editButton = undefined;
      doneButton = <div onClick={this.acceptChanges}>Done</div>;
      addTechnologyInput = (
        <div>
          <input
            name="newTechnology"
            type="text"
            placeholder="New technology"
            value={this.state.newTechnology}
            onChange={this.onInput}
            onKeyUp={this.keyUpAddTechnology}
          />
          <button value={this.state.newTechnology} onClick={this.addTechnology} >Add</button>
        </div>
      );
    } else {
      editButton = <div onClick={this.editTechnologies}>Edit</div>;
      doneButton = undefined;
    }

    return (
      <aside className="technology-sidebar">
        <h2>Tech</h2>
        <div className="tag-container">
          {this.renderTechnologyTags(technologies)}
        </div>
        {editButton}
        {addTechnologyInput}
        {doneButton}
      </aside>
    );
  }
}

export default TechnologySidebar;
