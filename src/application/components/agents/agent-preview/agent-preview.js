import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./agent-preview.scss";
import TechnologyTag from "../../technologies/technology-tag/technology-tag"

class AgentPreview extends Component {
  render() {
    const { agent } = this.props;
    
    const technologies = agent.currentTechnologies.map(tech => {
      return (<TechnologyTag
        technology={tech}
        key={tech._id}
        isActiveFilter={false}
        isDisabled={false}
        handleTechFilter={techId => {return;}}
      />);
    });

    return (
      <div className="agent-box">
        <Link to={`/agents/${agent._id}`}>
          <div className="agent-image">
            <img
              alt={`${agent.firstName} ${agent.lastName}`}
              src={agent.image}
            />
          </div>
          <div className="agent-details">
            <h3>{`${agent.firstName} ${agent.lastName}`}</h3>
            <h4>{agent.role}</h4>
          </div>
        </Link>
        <br></br>
        {technologies}
      </div>
    );
  }
}

export default AgentPreview;
