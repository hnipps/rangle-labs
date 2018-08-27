import React, { Component } from "react";
import axios from "axios";

// TODO: Move and rename AddAgentTechnologies, to make it more reusable
import AddTechnologies from "../../../../lib/components/form/add-technologies/add-technologies.js";
import AddProjectAgents from "./add-project-agents/add-project-agents";
import TeamListing from "../../../../lib/components/team-listing/team-listing";
import { projectRoles } from "../../../constants";
import FormLabel from "../../../../lib/components/form/form-label/form-label";
import FormInput from "../../../../lib/components/form/form-input/form-input";
import Button from "../../../../lib/components/button/button";
import CenterContentWrapper from "../../../../lib/components/form/center-content-wrapper/center-content-wrapper";

class AddProject extends Component {
  statusList = ["Active", "Hiatus", "Backlog"];

  _radioInputs = [false, false, false, false, false];

  state = {
    project: {
      title: "",
      description: "",
      difficulty: 0,
      status: this.statusList[2],
      technologies: [],
      projectLead: [],
      agents: []
    }
  };

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

  handleTechClick = techId => {
    const previousTechnologies = Array.from(this.state.project.technologies);

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

  handleSubmission = event => {
    event.preventDefault();
    const project = this.state.project;

    if (this.props.edit) {
      this.editExistingProject(project);
    } else {
      this.addNewProject(project);
    }
  };

  cancelAction = event => {
    event.preventDefault();
    this.props.history.push("/projects");
  };

  addPersonToProject = role => {
    return teamMember => {
      const newPeople = [...this.state.project[role]];
      newPeople.push(teamMember);
      this.setState(prevState => ({
        project: {
          ...prevState.project,
          [role]: newPeople
        }
      }));
    };
  };

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
    };
  };

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
      <CenterContentWrapper>
        <h1>{heading}</h1>
        <FormInput
          id="title"
          name="title"
          aria-describedby="title-desc"
          placeholder="Give it a name"
          value={project.title}
          onChange={this.onInput}
          label="Title"
        />
        <FormLabel htmlFor="description">Description</FormLabel>
        <textarea
          id="description"
          name="description"
          className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb3 center"
          aria-describedby="description-desc"
          placeholder="What's it all about?"
          value={project.description}
          onChange={this.onInput}
        />
        <FormLabel htmlFor="difficulty">
          How difficult is this project?
        </FormLabel>
        <fieldset
          id="project_difficulty"
          className="bn pl0 flex justify-center mb2"
        >
          {this._radioInputs.map((item, i) => {
            const radioValue = i + 1;
            return (
              <div
                key={`difficulty_${i}`}
                className="flex items-center mb2 ph2"
              >
                <input
                  name="difficulty"
                  className="mr2"
                  type="radio"
                  id={radioValue}
                  ref={input => (this._radioInputs[i] = input)}
                  checked={
                    Number(this.state.project.difficulty) ===
                    Number(this._radioInputs[i].value)
                  }
                  value={radioValue}
                  onChange={this.onInput}
                />
                <label htmlFor={radioValue} className="lh-copy">
                  {radioValue}
                </label>
              </div>
            );
          })}
        </fieldset>
        <div className="measure mb3 center">
          <FormLabel htmlFor="status">
            What's the status of this project?
          </FormLabel>
          <select
            className="w-100 f6 h2 bg-white ma1 b--black-20 mid-gray"
            name="status"
            value={project.status}
            onChange={this.onInput}
          >
            {this.statusList.map((status, i) => {
              return (
                <option key={`status_${i}`} value={status}>
                  {status}
                </option>
              );
            })}
          </select>
        </div>

        <AddTechnologies
          technologies={this.props.technologies}
          activeTechnologies={project.technologies}
          handleTechClick={techId =>
            this.handleTechClick(techId, "currentTechnologies")
          }
          label="Which technologies are used for this project?"
        />

        <div className="measure mb2 center">
          <FormLabel>Who's the project owner?</FormLabel>
          <AddProjectAgents
            addAgentToProject={this.addPersonToProject(
              projectRoles.projectLead
            )}
          />
          <FormLabel>Current project owner:</FormLabel>
          <TeamListing
            teamMembers={this.state.project.projectLead}
            onRemoveClick={this.removePersonFromProject(
              projectRoles.projectLead
            )}
            placeholder="This project doesn't have an owner 😢"
          />
        </div>

        <div className="measure mb3 center">
          <FormLabel>Who else is on the project team?</FormLabel>
          <AddProjectAgents
            addAgentToProject={this.addPersonToProject(projectRoles.agents)}
          />
          <FormLabel>Current team members:</FormLabel>
          <TeamListing
            teamMembers={this.state.project.agents}
            onRemoveClick={this.removePersonFromProject(projectRoles.agents)}
            placeholder="This team has no members 😱"
          />
        </div>

        <Button onClick={this.handleSubmission} color="green">
          {submitButtonText}
        </Button>
        <Button onClick={this.cancelAction} color="red">
          {cancelButtonText}
        </Button>
      </CenterContentWrapper>
    );
  }
}

export default AddProject;
