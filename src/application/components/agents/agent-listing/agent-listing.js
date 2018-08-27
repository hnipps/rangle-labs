import React, { Component } from "react";
import { Link } from "react-router-dom";
import AgentPreview from "../agent-preview/agent-preview";
import TechnologySidebar from "../../technologies/technology-sidebar/technology-sidebar";
import "./agent-listing.scss";
import ContentContainer from "../../../../lib/components/content-container/content-container";
import CardContainer from "../../../../lib/components/card-container/card-container";
import SidebarContainer from "../../../../lib/components/sidebar-container/sidebar-container";
import ControlContainer from "../../../../lib/components/control-container/control-container";
import LinkButton from "../../../../lib/components/link-button/link-button";

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
      <ContentContainer>
        <SidebarContainer>
          <TechnologySidebar
            history={this.props.history}
            technologies={this.props.technologies}
            activeTechnologies={this.compileAgentTechnologies()}
            techFilters={this.props.techFilters}
            handleTechFilter={techId => this.props.handleTechFilter(techId)}
            parent={"agents"}
          />
          <ControlContainer>
            <LinkButton to="/add-agent" color="dark-red" >
              Add Agent
            </LinkButton>
          </ControlContainer>
        </SidebarContainer>
        <CardContainer>
          {this.props.agents.map(agent => {
            return <AgentPreview agent={agent} key={agent._id} />;
          })}
        </CardContainer>
      </ContentContainer>
    );
  }
}

export default AgentListing;
