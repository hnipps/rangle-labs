import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from "axios";
import ProjectListing from "./projects/project-listing/project-listing";
import ProjectDetail from "./projects/project-detail/project-detail";
import AgentListing from "./agents/agent-listing/agent-listing";
import AgentDetail from "./agents/agent-detail/agent-detail";
import AddAgent from "./agents/add-agent/add-agent";
import AddProject from "./projects/add-project/add-project";
import { doesArrayContainAllItems } from "../helpers";
import "./app.scss";
import "./normalize.scss";
import "./borderbox.scss";
import Login from "./login/login";

class App extends Component {
  state = {
    projects: [],
    agents: [],
    technologies: [],
    filters: {
      projects: {
        techTags: []
      },
      agents: {
        techTags: []
      }
    },
    user: {
      id: "",
      accessToken: ""
    }
  };

  // get projects from database
  getProjects = async () => {
    try {
      const res = await axios.get("/projects");
      const projects = res.data.docs;
      this.setState({ projects });
    } catch (e) {
      console.error("Something went wrong with getting the projects", e);
    }
  };

  // get agents from database
  getAgents = async () => {
    try {
      const res = await axios.get("/agents");
      const agents = res.data;
      this.setState({ agents });
    } catch (e) {
      console.error("Something went wrong with getting the agents", e);
    }
  };

  // get technologies from database
  getTechnologies = async () => {
    try {
      const res = await axios.get("/technologies");
      const technologies = res.data.docs;
      this.setState({ technologies });
    } catch (e) {
      console.error("Something went wrong with getting the technologies", e);
    }
  };

  async componentDidMount() {
    // get all the data from the database
    this.getProjects();
    this.getTechnologies();
    this.getAgents();
  }

  // determine which agents should be displayed based on filters
  assembleAgentListing = () => {
    const allAgents = Array.from(this.state.agents);
    let currentlyDisplayedAgents = Array.from(this.state.agents);

    // filter agents by tech filter tags if there are any active ones
    if (this.state.filters.agents.techTags.length) {
      currentlyDisplayedAgents = allAgents.filter(agent => {
        const agentTechIds = agent.currentTechnologies.map(tech => tech._id);
        return doesArrayContainAllItems(
          agentTechIds,
          this.state.filters.agents.techTags
        );
      });
    }

    return currentlyDisplayedAgents;
  };

  // determine which projects should be displayed based on filters
  assembleProjectListing = () => {
    const allProjects = Array.from(this.state.projects);
    let currentlyDisplayedProjects = Array.from(this.state.projects);

    // filter projects by tech filter tags if there are any active ones
    if (this.state.filters.projects.techTags.length) {
      currentlyDisplayedProjects = allProjects.filter(project => {
        const projectTechIds = project.technologies.map(tech => tech._id);
        return doesArrayContainAllItems(
          projectTechIds,
          this.state.filters.projects.techTags
        );
      });
    }

    return currentlyDisplayedProjects;
  };

  resetTechFilters = entityType => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [entityType]: {
          ...prevState.filters[entityType],
          techTags: []
        }
      }
    }));
  };

  // make whichever filter was clicked active or inactive as necessary
  handleTechFilter = (techId, entityType) => {
    const filterTags = Array.from(this.state.filters[entityType].techTags);

    let tagPresent = false;
    let tagIndex = -1;
    let count = 0;

    filterTags.forEach(tag => {
      if (tag === techId) {
        tagPresent = true;
        tagIndex = count;
      }
      count++;
    });

    if (tagPresent && tagIndex !== -1) {
      filterTags.splice(tagIndex, 1);
    } else {
      filterTags.push(techId);
    }

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [entityType]: {
          ...prevState.filters[entityType],
          techTags: filterTags
        }
      }
    }));
  };

  updateUser = user => {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        id: user.id,
        accessToken: user.accessToken
      }
    }));
  };

  render() {
    const loggedIn = window.sessionStorage.getItem("jwt") ? true : false;
    return (
      <Router>
        <div className="app">
          <nav className="helvetica pa3 pa4-ns">
            <Link className="link dim black b f6 f5-ns dib mr3" to="/projects">
              Rangle Labs
            </Link>
            {/* LINKS */}
            <Link className="link dim gray f6 f5-ns dib mr3" to="/projects">
              Projects
            </Link>
            <Link className="link dim gray f6 f5-ns dib mr3" to="/agents">
              Agents
            </Link>
          </nav>

          {/* ROUTES */}
          <Route
            path="/"
            exact
            render={() =>
              loggedIn ? <Redirect to="/projects" /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/projects"
            exact
            render={props =>
              loggedIn ? (
                <ProjectListing
                  {...props}
                  projects={this.assembleProjectListing()}
                  technologies={this.state.technologies}
                  techFilters={this.state.filters.projects.techTags}
                  refreshProjects={() => this.getProjects()}
                  handleTechFilter={techId =>
                    this.handleTechFilter(techId, "projects")
                  }
                  resetTechFilters={() => this.resetTechFilters("projects")}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/projects/:project_id"
            exact
            render={props => <ProjectDetail {...props} />}
          />
          <Route
            path="/agents"
            exact
            render={props =>
              loggedIn ? (
                <AgentListing
                  {...props}
                  agents={this.assembleAgentListing()}
                  refreshAgents={() => this.getAgents()}
                  technologies={this.state.technologies}
                  techFilters={this.state.filters.agents.techTags}
                  handleTechFilter={techId =>
                    this.handleTechFilter(techId, "agents")
                  }
                  resetTechFilters={() => this.resetTechFilters("agents")}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/add-agent"
            exact
            render={props =>
              loggedIn ? (
                <AddAgent
                  {...props}
                  technologies={this.state.technologies}
                  refreshAgents={() => this.getAgents()}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/agents/:agent_id"
            exact
            render={props => <AgentDetail {...props} />}
          />
          <Route
            path="/edit-agent/:agent_id"
            exact
            render={props =>
              loggedIn ? (
                <AddAgent
                  {...props}
                  edit={true}
                  technologies={this.state.technologies}
                  refreshAgents={() => this.getAgents()}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/add-project"
            exact
            render={props =>
              loggedIn ? (
                <AddProject
                  {...props}
                  technologies={this.state.technologies}
                  refreshAgents={() => this.getProjects()}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/edit-project/:project_id"
            exact
            render={props =>
              loggedIn ? (
                <AddProject
                  {...props}
                  edit={true}
                  technologies={this.state.technologies}
                  refreshAgents={() => this.getProjects()}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/login"
            exact
            render={props => <Login {...props} updateUser={this.updateUser} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
