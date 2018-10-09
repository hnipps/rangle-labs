import React, { Component } from "react";

import TechnologyTag from "../../../../application/components/technologies/technology-tag/technology-tag";
import FormLabel from "../form-label/form-label";

class AddTechnologies extends Component {
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
      <div className="measure mb3 center">
        <FormLabel htmlFor="addTechnologies">
          { this.props.label }
        </FormLabel>
        <div name="addTechnologies" className="mt3">
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
      </div>
    );
  }
}

export default AddTechnologies;
