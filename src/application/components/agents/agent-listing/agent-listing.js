import React, { Component } from "react";
import { Link } from "react-router-dom";
import AgentPreview from "../agent-preview/agent-preview";
import TechnologySidebar from "../../technologies/technology-sidebar/technology-sidebar";
import "./agent-listing.scss";

class AgentListing extends Component {
  async componentDidMount() {
    this.props.refreshAgents();
    this.props.resetTechFilters();
  }

  compileAgentTechnologies = () => {
    const allAgentTechnologies = [];

    this.props.agents.forEach(agent => {
      allAgentTechnologies.push(...agent.currentTechnologies);
    });

    return allAgentTechnologies.map(technology => technology._id);
  };

  render() {
    return (
      <div className="agent-listing-root">
        <Link className="header-link" to="/add-agent">
          <div className="add-agent-button">Add an agent</div>
        </Link>
        <div className="agent-listing-main">
          <div className="agents-container">
            {this.props.agents.map(agent => {
              return <AgentPreview agent={agent} />;
            })}
          </div>
          <TechnologySidebar
            history={this.props.history}
            technologies={this.props.technologies}
            activeTechnologies={this.compileAgentTechnologies()}
            techFilters={this.props.techFilters}
            handleTechFilter={techId => this.props.handleTechFilter(techId)}
            parent={"agents"}
          />
        </div>
      </div>
    );
  }
}

export default AgentListing;
