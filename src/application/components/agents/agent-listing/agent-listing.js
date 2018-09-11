import React, { Component } from "react";
import AgentPreview from "../agent-preview/agent-preview";
import TechnologySidebar from "../../technologies/technology-sidebar/technology-sidebar";
import "./agent-listing.scss";
import ContentContainer from "../../../../lib/components/content-container/content-container";
import CardContainer from "../../../../lib/components/card-container/card-container";
import SidebarContainer from "../../../../lib/components/sidebar-container/sidebar-container";
import ControlContainer from "../../../../lib/components/control-container/control-container";
import LinkButton from "../../../../lib/components/link-button/link-button";
import Button from "../../../../lib/components/button/button";

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

  renderAgents = agents => {
    if (!agents.length) {
      return (
        <h2 className="center tc moon-gray">
          Sorry, no agents match your criteria!
        </h2>
      );
    }

    return agents.map(agent => {
      return <AgentPreview agent={agent} key={agent._id} />;
    });
  };

  render() {
    return (
      <ContentContainer>
        <SidebarContainer>
          <TechnologySidebar
            history={this.props.history}
            technologies={this.props.technologies}
            activeTechnologies={this.compileAgentTechnologies()}
            techFilters={this.props.techFilters}
            handleTechFilter={techId => this.props.handleTechFilter(techId)}
            parent={"agents"}
            countAgentsWithTech={this.props.countAgentsWithTech}
            agents={this.props.agents}
          />
          <ControlContainer>
            <LinkButton to="/add-agent" color="dark-red">
              Add Agent
            </LinkButton>
            <Button onClick={this.props.toggleActiveAgentFilter} color="green">
              Toggle Active Agents
            </Button>
          </ControlContainer>
        </SidebarContainer>
        <CardContainer>{this.renderAgents(this.props.agents)}</CardContainer>
      </ContentContainer>
    );
  }
}

export default AgentListing;
