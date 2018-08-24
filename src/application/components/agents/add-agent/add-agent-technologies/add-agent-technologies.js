import React, { Component } from "react";

import TechnologyTag from "../../../technologies/technology-tag/technology-tag";

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
      <div name="addTechnologies">
        {this.props.technologies.map(technology => {
          return (
            <TechnologyTag
              technology={technology}
              key={technology._id}
              isActiveFilter={this.determineWhetherActive(technology._id)}
              handleTechFilter={this.props.handleTechClick}
            />
          );
        })}
      </div>
    );
  }
}

export default AddAgentTechnologies;
