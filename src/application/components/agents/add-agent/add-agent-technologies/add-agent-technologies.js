import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import "./add-agent-technologies.scss";
// import axios from "axios";

class AddAgentTechnologies extends Component {
  determineWhetherActive = techId => {
    const { activeTechnologies } = this.props;

    let found = false;

    for (let i = 0; i < activeTechnologies.length; i++) {
      if (activeTechnologies[i]._id === techId) {
        found = true;
        break;
      }
    }

    return found;
  };

  render() {
    return (
      <div className="add-agent-technologies-root">
        {this.props.technologies.map(technology => {
          const activeClass = this.determineWhetherActive(technology._id)
            ? "active"
            : "";
          return (
            <div
              className={`technology-item ${activeClass}`}
              onClick={() => this.props.handleTechClick(technology._id)}
              key={technology._id}
            >
              {technology.name}
            </div>
          );
        })}
      </div>
    );
  }
}

export default AddAgentTechnologies;
