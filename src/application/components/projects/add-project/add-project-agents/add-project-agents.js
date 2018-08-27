import React, { Component } from 'react';

import axios from "axios";

import TeamListing from "../../../../../lib/components/team-listing/team-listing";
import FormInput from '../../../../../lib/components/form/form-input/form-input';

class AddProjectAgents extends Component {

  state;

  constructor(props) {
    super(props);
    this.state = {
      search: {
        searchResult: [],
        searchValue: "",
      }
    }
  }

  onInput = event => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState(prevState => ({
      search: {
        ...prevState.search,
        [name]: value
      },
    }));
  };

  addAgentToProject = event => {
    event.preventDefault();
    const teamMemberIndex = event.target.value;
    const teamMember = (this.state.search.searchResult[teamMemberIndex]);
    this.props.addAgentToProject(teamMember);
  }

  searchForAgent = async event => {
    this.onInput(event);
    const searchTerm = event.target.value;

    if (!searchTerm) {
      this.setState(prevState => ({
        search: {
          ...prevState.search,
          searchResult: [],
        }
      }));
      return;
    }
    const res = await axios.get(`/agents/search/${searchTerm}`);
    
    this.setState(prevState => ({
      search: {
        ...prevState.search,
        searchResult: res.data,
      }
    }));
  }

  render() {
    return(
      <div>
        <FormInput
          name="searchValue"
          placeholder="Start typing a name..."
          value={this.state.search.searchValue}
          onChange={this.searchForAgent}
        />
        <TeamListing
          teamMembers={this.state.search.searchResult}
          onAddClick={this.addAgentToProject}
          placeholder="Search results will appear here... 🕵️‍♀️"
        />
      </div>
    );
  }
}

export default AddProjectAgents;
