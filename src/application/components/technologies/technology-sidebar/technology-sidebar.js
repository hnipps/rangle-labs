import React, { Component } from "react";

import axios from "axios";

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
      isBeingEdited: false
    }));
  };

  onInput = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  addTechnology = event => {
    event.preventDefault();
    const newTechnologyName = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      newTechnology: ""
    }));
    this.addNewTechnology({ name: newTechnologyName });
  };

  keyUpAddTechnology = event => {
    event.preventDefault();
    if (event.keyCode === 13) {
      this.addTechnology(event);
    }
  };

  addNewTechnology = async technology => {
    try {
      const res = await axios.post("/technologies", technology);

      if (res) {
        this.props.technologies.push(res.data.payload);
        this.props.history.push(this.props.parent);
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
        this.props.history.push(this.props.parent);
      }
    } catch (err) {
      console.error("There was an error deleting a new technology:", err);
    }
  };

  renderTechnologyTags = technologies => {
    return technologies.map(technology => {
      let agentCount;
      if (this.props.countAgentsWithTech) {
        agentCount = this.props.countAgentsWithTech(
          technology._id,
          this.props.agents
        );
      }

      return (
        <TechnologyTag
          technology={technology}
          key={technology._id}
          isActiveFilter={this.determineIfTagIsActiveFilter(technology._id)}
          isDisabled={this.determineIfTagIsDisabled(technology._id)}
          handleTechFilter={techId => this.props.handleTechFilter(techId)}
          isBeingEdited={this.state.isBeingEdited}
          deleteTechnology={this.deleteTechnology}
          agentCount={agentCount}
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
      doneButton = (
        <a
          className="f7 no-underline br-pill ph2 pv1 mb2 ml2 dib white bg-dark-red unselectable"
          style={{ cursor: "pointer" }}
          onClick={this.acceptChanges}
        >
          Done
        </a>
      );
      addTechnologyInput = (
        <div className="ml2">
          <input
            name="newTechnology"
            type="text"
            placeholder="New technology"
            value={this.state.newTechnology}
            onChange={this.onInput}
            onKeyUp={this.keyUpAddTechnology}
          />
        </div>
      );
    } else {
      editButton = (
        <a
          className="f7 no-underline br-pill ph2 pv1 mb2 ml2 dib white bg-black unselectable"
          style={{ cursor: "pointer" }}
          onClick={this.editTechnologies}
        >
          Edit
        </a>
      );
      doneButton = undefined;
    }

    return (
      <aside className="helvetica db w-100 mb3">
        <div className="flex items-center">
          <h2 className="dib mv1 ml2">Tech</h2>
          {editButton}
          {doneButton}
        </div>
        <ul className="list ph2 pv2 mv0">
          {this.renderTechnologyTags(technologies)}
        </ul>
        {addTechnologyInput}
      </aside>
    );
  }
}

export default TechnologySidebar;
