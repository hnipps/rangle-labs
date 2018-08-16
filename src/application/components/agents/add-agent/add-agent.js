import React, { Component } from "react";
import axios from "axios";

import AddAgentTechnologies from "./add-agent-technologies/add-agent-technologies";
import "./add-agent.scss";

class AddAgent extends Component {
  state = {
    agent: {
      firstName: "",
      lastName: "",
      role: "",
      image: "",
      currentTechnologies: [],
      aspirationalTechnologies: [],
      currentFreeAgent: false
    }
  };

  getAgent = async agent_id => {
    const res = await axios.get(`/agents/${agent_id}`);
    return res.data;
  };

  async componentDidMount() {
    // if we are on the "Edit an Agent" page, get the agent to edit by id
    if (this.props.edit) {
      const { agent_id } = this.props.match.params;
      const agent = await this.getAgent(agent_id);
      this.setState({ agent });
    }
  }

  handleTechClick = (techId, currentOrAspirational) => {
    const previousTechnologies = Array.from(
      this.state.agent[currentOrAspirational]
    );

    const matchingTech = previousTechnologies.filter(
      tech => tech._id === techId
    );

    let alteredTechnologies;

    if (matchingTech.length) {
      alteredTechnologies = previousTechnologies.filter(
        tech => tech._id !== techId
      );
    } else {
      alteredTechnologies = previousTechnologies;

      const techToAdd = this.props.technologies.find(
        tech => tech._id === techId
      );
      alteredTechnologies.push(techToAdd);
    }

    this.setState(prevState => ({
      agent: {
        ...prevState.agent,
        [currentOrAspirational]: alteredTechnologies
      }
    }));
  };

  onInput = event => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState(prevState => ({
      agent: {
        ...prevState.agent,
        [name]: value
      }
    }));
  };

  addNewAgent = async agent => {
    try {
      const res = await axios.post("/agents", agent);

      if (res) {
        // this.props.refreshAgents(); - is it necessary to do this here?
        this.props.history.push("/agents");
      }
    } catch (err) {
      console.error("There was an error adding a new agent:", err);
    }
  };

  editExistingAgent = async agent => {
    const { agent_id } = this.props.match.params;

    try {
      const res = await axios.patch(`/agents/${agent_id}`, agent);

      if (res) {
        // this.props.refreshAgents(); - is it necessary to do this here?
        this.props.history.push("/agents");
      }
    } catch (err) {
      console.error("There was an error editing an existing agent", err);
    }
  };

  handleSubmission = () => {
    const agent = this.state.agent;

    if (this.props.edit) {
      this.editExistingAgent(agent);
    } else {
      this.addNewAgent(agent);
    }
  };

  cancelAction = () => {
    this.props.history.push("/agents");
  };

  render() {
    const { agent } = this.state;

    // get the agent name for headings - if one exists
    const agentAppellation =
      agent.firstName.length && agent.lastName.length
        ? `${agent.firstName} ${agent.lastName}`
        : "this agent";

    // determine which heading to show
    const heading = this.props.edit
      ? `Edit Details for ${agentAppellation}`
      : `Add an Agent`;

    // determine which text to show in the submit and cancel buttons
    const submitButtonText = this.props.edit
      ? "Submit Edits"
      : "Add this Agent";
    const cancelButtonText = "Cancel Without Saving";

    return (
      <div className="add-agent-root">
        <p>{heading}</p>
        <form>
          <input
            name="firstName"
            type="text"
            placeholder="first name"
            value={agent.firstName}
            onChange={this.onInput}
          />
          <input
            name="lastName"
            type="text"
            placeholder="last name"
            value={agent.lastName}
            onChange={this.onInput}
          />
          <input
            name="role"
            type="text"
            placeholder="role"
            value={agent.role}
            onChange={this.onInput}
          />
          <input
            name="image"
            type="text"
            placeholder="image"
            value={agent.image}
            onChange={this.onInput}
          />
          <p>{`Which technologies does ${agentAppellation} currently know?`}</p>
          <AddAgentTechnologies
            technologies={this.props.technologies}
            activeTechnologies={agent.currentTechnologies}
            handleTechClick={techId =>
              this.handleTechClick(techId, "currentTechnologies")
            }
          />

          <p>{`Which technologies would ${agentAppellation} like to learn?`}</p>
          <AddAgentTechnologies
            technologies={this.props.technologies}
            activeTechnologies={agent.aspirationalTechnologies}
            handleTechClick={techId =>
              this.handleTechClick(techId, "aspirationalTechnologies")
            }
          />

          <div className="is-free-agent-container">
            <label htmlFor="isFreeAgent">
              {`Is ${agentAppellation} currently a free agent?`}
            </label>
            <input
              type="checkbox"
              id="isFreeAgent"
              name="currentFreeAgent"
              checked={agent.currentFreeAgent}
              onChange={this.onInput}
            />
          </div>
        </form>

        <div className="button submit-button" onClick={this.handleSubmission}>
          {submitButtonText}
        </div>
        <div className="button cancel-button" onClick={this.cancelAction}>
          {cancelButtonText}
        </div>
      </div>
    );
  }
}

export default AddAgent;
