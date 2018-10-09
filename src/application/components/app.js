import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from "axios";
import MentorshipListing from "./mentorships/mentorship-listing/mentorship-listing";
import MentorshipDetail from "./mentorships/mentorship-detail/mentorship-detail";
import AgentListing from "./agents/agent-listing/agent-listing";
import AgentDetail from "./agents/agent-detail/agent-detail";
import AddAgent from "./agents/add-agent/add-agent";
import AddMentorship from "./mentorships/add-mentorship/add-mentorship";
import { doesArrayContainAllItems, sortAgents } from "../helpers";
import "./app.scss";
import "./normalize.scss";
import "./borderbox.scss";
import Login from "./login/login";
import QRAuth from "./qr-auth/qr-auth";

class App extends Component {
  constructor(props) {
    super(props);

    if (window.sessionStorage.state) {
      const sessionState = JSON.parse(window.sessionStorage.state);
      this.state = sessionState;
    } else {
      this.state = {
        mentorships: [],
        agents: [],
        technologies: [],
        filters: {
          mentorships: {
            techTags: []
          },
          agents: {
            active: false,
            techTags: [],
            sortBy: 'alphabetical'
          }
        },
        user: {
          loggedIn: false
        }
      };
    }
  }

  // get mentorships from database
  getMentorships = async () => {
    try {
      const res = await axios.get("/mentorships");
      const mentorships = res.data.docs;
      this.setState({ mentorships });
    } catch (e) {
      console.error("Something went wrong with getting the mentorships", e);
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
    this.getTechnologies();
  }

  // determine which agents should be displayed based on filters
  assembleAgentListing = () => {
    let currentlyDisplayedAgents = Array.from(this.state.agents);

    // filter agents by tech filter tags if there are any active ones
    if (this.state.filters.agents.techTags.length) {
      currentlyDisplayedAgents = currentlyDisplayedAgents.filter(agent => {
        const agentTechIds = agent.currentTechnologies.map(tech => tech._id);
        return doesArrayContainAllItems(
          agentTechIds,
          this.state.filters.agents.techTags
        );
      });
    }

    // filter agents if they are active
    if (this.state.filters.agents.active) {
      currentlyDisplayedAgents = currentlyDisplayedAgents.filter(agent => {
        return agent.currentFreeAgent;
      });
    }
    sortAgents(currentlyDisplayedAgents, this.state.filters.agents.sortBy);

    return currentlyDisplayedAgents;
  };

  // determine which mentorships should be displayed based on filters
  assembleMentorshipListing = () => {
    const allMentorships = Array.from(this.state.mentorships);
    let currentlyDisplayedMentorships = Array.from(this.state.mentorships);

    // filter mentorships by tech filter tags if there are any active ones
    if (this.state.filters.mentorships.techTags.length) {
      currentlyDisplayedMentorships = allMentorships.filter(mentorship => {
        const mentorshipTechIds = mentorship.technologies.map(tech => tech._id);
        return doesArrayContainAllItems(
          mentorshipTechIds,
          this.state.filters.mentorships.techTags
        );
      });
    }

    return currentlyDisplayedMentorships;
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

  handleSortBy = (sortBy) => {
    this.setState({ filters: {
      ...this.state.filters,
      agents: {
        ...this.state.filters.agents,
        sortBy: sortBy
      }}});
  }

  toggleActiveAgentFilter = () => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        filters: {
          ...prevState.filters,
          agents: {
            ...prevState.filters.agents,
            active: !this.state.filters.agents.active
          }
        }
      };

      return newState;
    });
  };

  logUserIn = () => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        user: {
          ...prevState.user,
          loggedIn: true
        }
      };
      window.sessionStorage.state = JSON.stringify(newState);
      return newState;
    });
  };

  countAgentsWithTech = (techId, agents) => {
    const agentsWithTech = agents.filter(agent => {
      return agent.currentTechnologies.some(tech => {
        return tech._id === techId;
      });
    });
    return agentsWithTech.length;
  };

  render() {
    const loggedIn = this.state.user.loggedIn;
    return (
      <Router>
        <div className="app">
          <nav className="helvetica pa3 pa4-ns">
            <img
              className="w3-ns h3-ns w2 h2 mr2 mr3-ns dib v-mid"
              alt="Rangle Labs"
              src="/assets/labs_logo/rangle-labs-icon.png"
            />
            <div className="black b f6 f5-ns dib mr3 v-mid">Rangle Labs</div>
            {/* LINKS */}
            <Link
              className="link dim gray f6 f5-ns dib mr3 v-mid"
              to="/mentorships"
              >
              Mentorships
            </Link>
            <Link className="link dim gray f6 f5-ns dib mr3 v-mid" to="/agents">
              Agents
            </Link>
          </nav>

          {/* ROUTES */}
          <Route
            path="/"
            exact
            render={() =>
              loggedIn ? <Redirect to="/mentorships" /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/mentorships"
            exact
            render={props =>
              loggedIn ? (
                <MentorshipListing
                  {...props}
                  mentorships={this.assembleMentorshipListing()}
                  technologies={this.state.technologies}
                  techFilters={this.state.filters.mentorships.techTags}
                  refreshMentorships={() => this.getMentorships()}
                  handleTechFilter={techId =>
                    this.handleTechFilter(techId, "mentorships")
                  }
                  resetTechFilters={() => this.resetTechFilters("mentorships")}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/mentorships/:mentorship_id"
            exact
            render={props =>
              loggedIn ? <MentorshipDetail {...props} /> : <Redirect to="/login" />
            }
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
                  handleSortBy={(sortBy) => this.handleSortBy(sortBy)}
                  toggleActiveAgentFilter={this.toggleActiveAgentFilter}
                  resetTechFilters={() => this.resetTechFilters("agents")}
                  countAgentsWithTech={this.countAgentsWithTech}
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
            render={props =>
              loggedIn ? <AgentDetail {...props} /> : <Redirect to="/login" />
            }
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
            path="/add-mentorship"
            exact
            render={props =>
              loggedIn ? (
                <AddMentorship
                  {...props}
                  technologies={this.state.technologies}
                  refreshAgents={() => this.getMentorships()}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/edit-mentorship/:mentorship_id"
            exact
            render={props =>
              loggedIn ? (
                <AddMentorship
                  {...props}
                  edit={true}
                  technologies={this.state.technologies}
                  refreshAgents={() => this.getMentorships()}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/login"
            exact
            render={props => (
              <Login
                {...props}
                logUserIn={this.logUserIn}
                loggedIn={loggedIn}
              />
            )}
          />
          <Route
            path="/qrauth"
            exact
            render={props => (
              <QRAuth
                {...props}
              />
            )}
            />
        </div>
      </Router>
    );
  }
}

export default App;
