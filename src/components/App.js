import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios'
import ProjectListing from './ProjectListing/ProjectListing';
import ProjectDetail from './ProjectListing/ProjectDetail/ProjectDetail';
import AgentListing from './AgentListing/AgentListing';
import AgentDetail from './AgentListing/AgentDetail/AgentDetail';
import { doesArrayContainAllItems } from '../helpers';
import './App.scss';

class App extends Component {

  state = {
    projects: [],
    agents: [],
    technologies: [],
    filters: {
      techTags: [],
    },
  }

  // get projects from database
  getProjects = async () => {
    try {
      const res = await axios.get('/projects');
      const projects = res.data.docs;
      this.setState({ projects });
    } catch(e) {
      console.error("Something went wrong with getting the projects", e);
    }
  }

  // get agents from database
  getAgents = async () => {
    try {
      const res = await axios.get('/agents');
      const agents = res.data;
      this.setState({ agents });
    } catch(e) {
      console.error("Something went wrong with getting the agents", e);
    }
  }

  // get technologies from database
  getTechnologies = async () => {
    try {
      const res = await axios.get('/technologies');
      const technologies = res.data.docs;
      this.setState({ technologies });
    } catch(e) {
      console.error("Something went wrong with getting the technologies", e);
    }
  }

  async componentDidMount () {

    // get all the data from the database
    this.getProjects();
    this.getTechnologies();
    this.getAgents();
  }
  
  // determine which projects should be displayed based on filters
  assembleProjectListing = () => {

    const allProjects = Array.from(this.state.projects);
    let currentlyDisplayedProjects = Array.from(this.state.projects);

    // filter projects by tech filter tags if there are any active ones
    if (this.state.filters.techTags.length) {

      currentlyDisplayedProjects = allProjects.filter((project) => {
        const projectTechIds = project.technologies.map(tech => tech._id);
        return doesArrayContainAllItems(projectTechIds, this.state.filters.techTags);
      });
    }

    return currentlyDisplayedProjects;
  }

  handleTechFilter = (techId) => {

    const filterTags = Array.from(this.state.filters.techTags);

    let tagPresent = false;
    let tagIndex = -1;;
    let count = 0;

    filterTags.forEach((tag) => {
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
          techTags: filterTags,
      }
    }));
  }

  render () {
    return (
      <Router>
        <div className='app'>

          {/* LINKS */}
          <Link className="header-link" to='/projects'>Projects</Link>
          <Link className="header-link" to='/agents'>Agents</Link>

          {/* ROUTES */}
          {/* how to reroute '/' to the same place as '/projects' without duplicating the ProjectListing component call? */}
          <Route path='/' exact render={(props)=><ProjectListing {...props} projects={this.assembleProjectListing()} technologies={this.state.technologies} techFilters={this.state.filters.techTags} refreshProjects={() => this.getProjects()} handleTechFilter={(techId) => this.handleTechFilter(techId)}/>}/>
          <Route path='/projects' exact render={(props)=><ProjectListing {...props} projects={this.assembleProjectListing()} technologies={this.state.technologies} techFilters={this.state.filters.techTags} refreshProjects={() => this.getProjects()} handleTechFilter={(techId) => this.handleTechFilter(techId)}/>}/>
          <Route path='/projects/:project_id' exact render={(props)=><ProjectDetail {...props}/>}/>
          <Route path='/agents' exact render={(props)=><AgentListing {...props} agents={this.state.agents}  refreshAgents={() => this.getAgents()}/>}/>
          <Route path='/agents/:agent_id' exact render={(props)=><AgentDetail {...props}/>}/>

        </div>
      </Router>
    ); 
  }
}

export default App;
