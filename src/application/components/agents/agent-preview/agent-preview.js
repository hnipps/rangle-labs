import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./agent-preview.scss";
import TechnologyTag from "../../technologies/technology-tag/technology-tag";
import Card from "../../../../lib/components/card/card";
import CardTitle from "../../../../lib/components/card/card-title/card-title";
import CardContent from "../../../../lib/components/card/card-content/card-content";

class AgentPreview extends Component {
  render() {
    const { agent } = this.props;

    const technologies = agent.currentTechnologies.map(tech => {
      return (
        <TechnologyTag
          technology={tech}
          key={tech._id}
          isActiveFilter={false}
          isDisabled={false}
          handleTechFilter={techId => {
            return;
          }}
        />
      );
    });

    return (
      <Card>
        <CardContent>
          <Link className="no-underline" to={`/agents/${agent._id}`}>
            <img
              className="br-100 h4 w4 dib ba b--black-05 pa2"
              alt={`${agent.firstName} ${agent.lastName}`}
              src={agent.image}
            />
          </Link>
          <CardTitle to={`/agents/${agent._id}`}>
            {`${agent.firstName} ${agent.lastName}`}
          </CardTitle>
          <p>{agent.role}</p>
          {technologies}
        </CardContent>
      </Card>
    );
  }
}

export default AgentPreview;
