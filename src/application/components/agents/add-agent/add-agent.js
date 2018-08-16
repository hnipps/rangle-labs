import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import AddAgentTechnologies from "./add-agent-technologies/add-agent-technologies";
import "./add-agent.scss";
import axios from "axios";

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
    console.log("here is your res data", res.data);
    return res.data;
  };

  async componentDidMount() {
    if (this.props.edit) {
      const { agent_id } = this.props.match.params;
      const agent = await this.getAgent(agent_id);

      console.log("HERE IS YOUR AGENT", agent);
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
      console.log("THAT TECH IS ALREADY IN THE LIST");
      alteredTechnologies = previousTechnologies.filter(
        tech => tech._id !== techId
      );
      console.log("we removed it", alteredTechnologies);
    } else {
      console.log("THAT TECH IS NOT IN THE LIST YET");
      alteredTechnologies = previousTechnologies;
      console.log("props technologies", this.props.technologies);

      const techToAdd = this.props.technologies.find(
        tech => tech._id === techId
      );

      console.log("tech to add", techToAdd);

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
    console.log("ADD NEW AGENT", agent);
    try {
      const res = await axios.post("/agents", agent);

      if (res) {
        // this.props.getAgents();
        console.log("RES ADD", res);
        this.props.history.push("/agents");
      }
    } catch (err) {
      console.error(err);
    }
  };

  editExistingAgent = async agent => {
    console.log("EDIT EXISTING AGENT");
    const agentId = this.props.match.params;

    console.log("AGENT ID", agentId);

    try {
      const res = await axios.patch(`/agents/${agentId}`);

      if (res) {
        console.log("RES EDIT", res);
        // this.props.getAgents();
        this.props.history.push("/agents");
      }
    } catch (err) {
      console.error(err);
    }
  };

  handleSubmission = () => {
    console.log("HANDLE SUBMISSION");
    const agent = {
      firstName: this.state.agent.firstName,
      lastname: this.state.agent.lastName,
      role: this.state.agent.role,
      image: this.state.agent.image,
      // currentTechnologies: this.state.agent.currentTechnologies.map(
      //   tech => tech._id
      // ),
      // aspirationalTechnologies: this.state.agent.aspirationalTechnologies.map(
      //   tech => tech._id
      // ),
      currentFreeAgent: this.state.agent.currentFreeAgent
    };

    console.log("NEWLY PACAKGED AGNET", agent);

    if (this.props.edit) {
      this.editExistingAgent(agent);
    } else {
      this.addNewAgent(agent);
    }
  };

  render() {
    return (
      <div className="add-agent-root">
        <p>Here is where we add an agent</p>
        <p>Editing: {this.props.edit}</p>
        <form>
          <input
            name="firstName"
            type="text"
            placeholder="first name"
            value={this.state.agent.firstName}
            onChange={this.onInput}
          />
          <input
            name="lastName"
            type="text"
            placeholder="last name"
            value={this.state.agent.lastName}
            onChange={this.onInput}
          />
          <input
            name="role"
            type="text"
            placeholder="role"
            value={this.state.agent.role}
            onChange={this.onInput}
          />
          <input
            name="image"
            type="text"
            placeholder="image"
            value={this.state.agent.image}
            onChange={this.onInput}
          />
          <p>Which technologies does this agent currently know?</p>
          <AddAgentTechnologies
            technologies={this.props.technologies}
            activeTechnologies={this.state.agent.currentTechnologies}
            handleTechClick={techId =>
              this.handleTechClick(techId, "currentTechnologies")
            }
          />

          <p>Which technologies would this agent like to learn?</p>
          <AddAgentTechnologies
            technologies={this.props.technologies}
            activeTechnologies={this.state.agent.aspirationalTechnologies}
            handleTechClick={techId =>
              this.handleTechClick(techId, "aspirationalTechnologies")
            }
          />

          <div className="is-free-agent-container">
            <label htmlFor="isFreeAgent">
              Is this person currently a free agent?
            </label>
            <input
              type="checkbox"
              id="isFreeAgent"
              name="currentFreeAgent"
              checked={this.state.agent.currentFreeAgent}
              onChange={this.onInput}
            />
          </div>
        </form>

        <div className="submit-button" onClick={this.handleSubmission}>
          Add this agent
        </div>
      </div>
    );
  }
}

export default AddAgent;
