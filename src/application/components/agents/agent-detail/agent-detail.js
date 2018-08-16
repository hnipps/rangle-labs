import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./agent-detail.scss";
import axios from "axios";

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
      <div className="agent-detail-box">
        <div className="detail-header">
          <div className="agent-image">
            <img
              alt={`${agent.firstName} ${agent.lastName}`}
              src={agent.image}
            />
          </div>
          <div>
            <h3>{`${agent.firstName} ${agent.lastName}`}</h3>
            <h4>{agent.role}</h4>
          </div>
        </div>
        <div className="agent-details">
          <div className="current-technologies">
            <p>Current skills</p>
            {this.renderAgentTechnologies(agent.currentTechnologies)}
          </div>
          <div className="aspirational-technologies">
            <p>Wants to learn</p>
            {this.renderAgentTechnologies(agent.aspirationalTechnologies)}
          </div>

          <div>
            <p>
              Currently on the bench:
              <span>{agent.currentFreeAgent ? " Yes" : " No"}</span>
            </p>
          </div>
        </div>
        <div className="button-container">
          <Link to={`/edit-agent/${agent._id}`}>
            <button>{`Edit Details for ${agent.firstName} ${
              agent.lastName
            }`}</button>
          </Link>
          <button
            className="delete-agent-button"
            onClick={() => this.deleteAgent(agent._id)}
          >{`Delete ${agent.firstName} ${agent.lastName}`}</button>
        </div>
      </div>
    );
  }
}

export default AgentDetail;
