import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./agent-preview.scss";

class AgentPreview extends Component {
  render() {
    const { agent } = this.props;
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
      </div>
    );
  }
}

export default AgentPreview;
