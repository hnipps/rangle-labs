import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AgentPreview from './AgentPreview/AgentPreview';
import './AgentListing.scss';

class AgentListing extends Component {

  async componentDidMount() {
    this.props.refreshAgents();
  }

  renderAgents = (agents) => {
    
    return agents.map(agent => {
      return (
        <AgentPreview agent={agent}/>
      );
    })
  }

  render () {
    return (
      <div className="agents-root">
        <h2>Agents</h2>
        {/* <Search onSearchChange={(e) => this.props.onSearchChange(e)} placeholder="Search for an artist"/> */}
        <div className="agents-container">
          {this.renderAgents(this.props.agents)}
        </div>
      </div>
    )
  }
}

export default AgentListing;
