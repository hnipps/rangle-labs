import React, { Component } from "react";
import "./agent-detail.scss";
import axios from "axios";
import TechListing from "../../../../lib/components/tech-listing/tech-listing";
import ContentContainer from "../../../../lib/components/content-container/content-container";
import CenterContentWrapper from "../../../../lib/components/form/center-content-wrapper/center-content-wrapper";
import Button from "../../../../lib/components/button/button";
import LinkButton from "../../../../lib/components/link-button/link-button";
import AgentStatus from "../../../../lib/components/status/agent-status/agent-status";
import DetailCard from "../../../../lib/components/detail-card/detail-card";
import DetailCardImage from "../../../../lib/components/detail-card/detail-card-image/detail-card-image";
import DetailCardSubtitle from "../../../../lib/components/detail-card/detail-card-subtitle/detail-card-subtitle";
import ConfirmationButton from "../../../../lib/components/confirmation-button/confirmation-button";

class AgentDetail extends Component {
  state = {
    agent: null
  };

  getAgent = async agent_id => {
    const res = await axios.get(`/agents/${agent_id}`);
    return res.data;
  };

  async componentDidMount() {
    const { agent_id } = this.props.match.params;
    const agent = await this.getAgent(agent_id);
    this.setState({ agent });
  }

  renderAgentTechnologies(technologies) {
    return technologies.map(technology => {
      return (
        <div className="technology-tag" key={technology._id}>
          {technology.name}
        </div>
      );
    });
  }

  deleteAgent = async id => {
    try {
      const res = await axios.delete(`/agents/${id}`);

      if (res) {
        this.props.history.push("/agents");
      }
    } catch (err) {
      console.error("There was an error deleting an agent", err);
    }
  };

  render() {
    const { agent } = this.state;

    if (!this.state.agent) return <h2 className="helvetica center tc moon-gray" >Loading...</h2>;

    const status = agent.currentFreeAgent ? "Free Agent" : "Staffed to Project";

    return (
      <ContentContainer>
        <CenterContentWrapper>
          <DetailCard>
            <AgentStatus status={status} size="L" />
            <DetailCardImage
              alt={`${agent.firstName} ${agent.lastName}`}
              src={agent.image}
            />
            <h1>{`${agent.firstName} ${agent.lastName}`}</h1>
            <DetailCardSubtitle>{agent.role}</DetailCardSubtitle>
            <p>Current skills:</p>
            <TechListing technologies={agent.currentTechnologies} />
            <p>Wants to learn:</p>
            <TechListing technologies={agent.aspirationalTechnologies} />
            <LinkButton to={`/edit-agent/${agent._id}`} color="green">
              {`Edit Details for ${agent.firstName} ${agent.lastName}`}
            </LinkButton>
            <ConfirmationButton onClick={event => {
                  event.preventDefault();
                  this.deleteAgent(agent._id);
                }}>
              <Button
                color="red"
              >
                {`Delete ${agent.firstName} ${agent.lastName}`}
            </Button>
            </ConfirmationButton>
          </DetailCard>
        </CenterContentWrapper>
      </ContentContainer>
    );
  }
}

export default AgentDetail;
