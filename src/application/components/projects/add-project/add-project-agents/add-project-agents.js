import React, { Component } from 'react';

import TeamListing from "../../../../../lib/components/team-listing/team-listing";

class AddProjectAgents extends Component {

  render() {
    return(
      <div>
        <input
          name="searchValue"
          type="text"
          placeholder="Start typing a name..."
          value={this.props.search.searchValue}
          onChange={this.props.searchForAgent}
        />
        <TeamListing
          teamMembers={this.props.search.searchResult}
          onAddClick={this.props.addAgentToProject}
        />
      </div>
    );
  }
}

export default AddProjectAgents;
