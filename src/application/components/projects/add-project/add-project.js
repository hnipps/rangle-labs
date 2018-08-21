import React, { Component } from "react";
import axios from "axios";

// TODO: Move and rename AddAgentTechnologies, to make it more reusable
import AddAgentTechnologies from "../../agents/add-agent/add-agent-technologies/add-agent-technologies";
import "./add-project.scss";
import AddProjectAgents from "./add-project-agents/add-project-agents";
import TeamListing from "../../../../lib/components/team-listing/team-listing"
import { projectRoles } from "../../../constants"

class AddProject extends Component {
  state = {
    project: {
      title: "",
      description: "",
      difficulty: 0,
      status: "",
      technologies: [],
      projectLead: [],
      agents: []
    }
  };

  statusList = ["Active", "Hiatus", "Backlog"];

  _radioInputs = [ false, false, false, false, false ];

  getProject = async project_id => {
    const res = await axios.get(`/projects/${project_id}`);
    return res.data;
  };

  async componentDidMount() {
    // if we are on the "Edit an Agent" page, get the agent to edit by id
    if (this.props.edit) {
      const { project_id } = this.props.match.params;
      const project = await this.getProject(project_id);
      this.setState({ project });
    }
  }

  handleTechClick = (techId) => {
    const previousTechnologies = Array.from(
      this.state.project.technologies
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
      project: {
        ...prevState.project,
        technologies: alteredTechnologies
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
      project: {
        ...prevState.project,
        [name]: value
      }
    }));
  };

  addNewProject = async project => {
    try {
      const res = await axios.post("/projects", project);

      if (res) {
        this.props.history.push("/projects");
      }
    } catch (err) {
      console.error("There was an error adding a new project:", err);
    }
  };

  editExistingProject = async project => {
    const { project_id } = this.props.match.params;

    try {
      const res = await axios.patch(`/projects/${project_id}`, project);

      if (res) {
        this.props.history.push("/projects");
      }
    } catch (err) {
      console.error("There was an error editing an existing project", err);
    }
  };

  handleSubmission = () => {
    const project = this.state.project;

    if (this.props.edit) {
      this.editExistingProject(project);
    } else {
      this.addNewProject(project);
    }
  };

  cancelAction = () => {
    this.props.history.push("/projects");
  };

  addPersonToProject = role => {
    return teamMember => {
      const newPeople = [...this.state.project[role]];
      newPeople.push(teamMember)
      this.setState(prevState => ({
        project: {
          ...prevState.project,
          [role]: newPeople
        }
      }));
    };
  }

  removePersonFromProject = role => {
    return event => {
      event.preventDefault();
      const personIndex = event.target.value;
      const newPeople = [...this.state.project[role]];
      newPeople.splice(personIndex, 1);
      this.setState(prevState => ({
        project: {
          ...prevState.project,
          [role]: newPeople
        }
      }));
    }
  }

  render() {
    const { project } = this.state;

    // get the agent name for headings - if one exists
    const projectAppellation = project.title ? project.title : "this project";

    // determine which heading to show
    const heading = this.props.edit
      ? `Edit Details for ${projectAppellation}`
      : `Add a Project`;

    // determine which text to show in the submit and cancel buttons
    const submitButtonText = this.props.edit
      ? "Submit Edits"
      : "Add this Project";
    const cancelButtonText = "Cancel Without Saving";

    return (
      <div className="add-project-root">
        <p>{heading}</p>
        <form>
          <input
            name="title"
            type="text"
            placeholder="title"
            value={project.title}
            onChange={this.onInput}
          />
          <textarea
            name="description"
            placeholder="description"
            value={project.description}
            onChange={this.onInput}
          /><br></br>
          <p>How difficult is this project?</p>
          <input
            name="difficulty"
            type="radio"
            ref={input => this._radioInputs[0] = input}
            checked={this.state.project.difficulty === this._radioInputs[0].value}
            value={1}
            onChange={this.onInput}
          />1
          <input
            name="difficulty"
            type="radio"
            ref={input => this._radioInputs[1] = input}
            checked={this.state.project.difficulty === this._radioInputs[1].value}
            value={2}
            onChange={this.onInput}
          />2
          <input
            name="difficulty"
            type="radio"
            ref={input => this._radioInputs[2] = input}
            checked={this.state.project.difficulty === this._radioInputs[2].value}
            value={3}
            onChange={this.onInput}
          />3
          <input
            name="difficulty"
            type="radio"
            ref={input => this._radioInputs[3] = input}
            checked={this.state.project.difficulty === this._radioInputs[3].value}
            value={4}
            onChange={this.onInput}
          />4
          <input
            name="difficulty"
            type="radio"
            ref={input => this._radioInputs[4] = input}
            checked={this.state.project.difficulty === this._radioInputs[4].value}
            value={5}
            onChange={this.onInput}
          />5<br></br>
          <p>What's the status of this project?</p>
          <select
            name="status"
            value={project.status}
            onChange={this.onInput}
          >
            {this.statusList.map((status, i) => {
              return <option key={`status_${i}`} value={status}>{status}</option>
            })}
          </select>

          <p>Which technologies are used for this project?</p>
          <AddAgentTechnologies
            technologies={this.props.technologies}
            activeTechnologies={project.technologies}
            handleTechClick={techId =>
              this.handleTechClick(techId, "currentTechnologies")
            }
          />

          <p>Who's the project lead?</p>
          <AddProjectAgents
            addAgentToProject={this.addPersonToProject(projectRoles.projectLead)}
          /><br></br>
          <p>Current project lead:</p><br></br>  
          <TeamListing
            teamMembers={this.state.project.projectLead}
            onRemoveClick={this.removePersonFromProject(projectRoles.projectLead)}
          />

          <p>Which agents are on this project?</p>
          <AddProjectAgents
            addAgentToProject={this.addPersonToProject(projectRoles.agents)}
          /><br></br>
          <p>Current team members:</p><br></br>  
          <TeamListing
            teamMembers={this.state.project.agents}
            onRemoveClick={this.removePersonFromProject(projectRoles.agents)}
          />
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

export default AddProject;
