import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./agent-detail.scss";
import axios from "axios";
import TechListing from "../../../../lib/components/tech-listing/tech-listing";
import ContentContainer from "../../../../lib/components/content-container/content-container";
import CenterContentWrapper from "../../../../lib/components/form/center-content-wrapper/center-content-wrapper";
import Button from "../../../../lib/components/button/button";
import LinkButton from "../../../../lib/components/link-button/link-button";

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
    await axios.delete(`/agents/${id}`);
    this.props.history.push("/agents");
  };

  render() {
    const { agent } = this.state;

    if (!this.state.agent) return <div className="loading">Loading</div>;

    return (
      <ContentContainer>
        <CenterContentWrapper>
        <div className="">
          <div className="">
            <img
              className="br-100 h5 w5 dib ba b--black-05 pa2"
              alt={`${agent.firstName} ${agent.lastName}`}
              src={agent.image}
            />
          </div>
          <div>
            <h1>{`${agent.firstName} ${agent.lastName}`}</h1>
            <h2 className="mid-gray" >{agent.role}</h2>
          </div>
        </div>
        <div className="">
          <div className="">
            <p>Current skills</p>
            <TechListing technologies={agent.currentTechnologies} />
          </div>
          <div className="">
            <p>Wants to learn</p>
            <TechListing technologies={agent.aspirationalTechnologies} />
          </div>

          <div>
            <p>
              Currently on the bench:
              <span>{agent.currentFreeAgent ? " Yes" : " No"}</span>
            </p>
          </div>
        </div>
        <LinkButton
          to={`/edit-agent/${agent._id}`}
          color="green"
        >
          { `Edit Details for ${agent.firstName} ${ agent.lastName }` }
        </LinkButton>
        <Button
          onClick={() => this.deleteAgent(agent._id)}
          color="red"
        >
          {`Delete ${agent.firstName} ${agent.lastName}`}
        </Button>
        </CenterContentWrapper>
      </ContentContainer>
    );
  }
}

export default AgentDetail;
