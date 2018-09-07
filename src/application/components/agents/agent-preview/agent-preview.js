import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./agent-preview.scss";
import Card from "../../../../lib/components/card/card";
import CardTitle from "../../../../lib/components/card/card-title/card-title";
import CardContent from "../../../../lib/components/card/card-content/card-content";

class AgentPreview extends Component {
  render() {
    const { agent } = this.props;

    const technologies = agent.currentTechnologies.map(tech => {
      switch (tech.name) {
        case "Angular":
          return (
            <img
              className="h2"
              src="../assets/angular/angular.png"
              alt="Angular logo"
            />
          );

        case "React":
          return (
            <img
              className="h2"
              src="../assets/react/react-logo.png"
              alt="ReactJS logo"
            />
          );

        default:
          return null;
      }
    });

    let technologyBar;
    if (
      agent.currentTechnologies.find(tech => {
        return tech.name === "Angular" || tech.name === "React";
      }) !== undefined
    ) {
      technologyBar = (
        <div className="dib nt4 flex justify-end w4 center">{technologies}</div>
      );
    }

    return (
      <Card>
        <CardContent>
          <Link className="no-underline" to={`/agents/${agent._id}`}>
            <img
              className="br-100 h4 w4 dib ba b--black-05 pa2"
              alt={`${agent.firstName} ${agent.lastName}`}
              src={agent.image}
            />
            {technologyBar}
          </Link>
          <CardTitle to={`/agents/${agent._id}`}>
            {`${agent.firstName} ${agent.lastName}`}
          </CardTitle>
          <p>{agent.role}</p>
        </CardContent>
      </Card>
    );
  }
}

export default AgentPreview;
