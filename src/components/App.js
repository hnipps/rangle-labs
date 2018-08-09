import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios'
import ProjectListing from './ProjectListing/ProjectListing';
import ProjectDetail from './ProjectListing/ProjectDetail/ProjectDetail';
import AgentListing from './AgentListing/AgentListing';

import './App.scss';


class App extends Component {

  state = {
    projects: [],
    agents: [],
    technologies: [],
  }

  getProjects = async () => {
    try {
      const res = await axios.get('/projects');
      const projects = res.data.docs;
      this.setState({ projects });
    } catch(e) {
      console.error("Something went wrong with getting the projects", e);
    }
  }

  getAgents = async () => {
    try {
      const res = await axios.get('/agents');
      const agents = res.data;
      this.setState({ agents });
    } catch(e) {
      console.error("Something went wrong with getting the agents", e);
    }
  }

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

    this.getProjects();
    this.getTechnologies();
    this.getAgents();

  }

  render () {
    return (
      <Router>
        <div className='app'>
          {/* LINKS */}
          <Link className="header-link" to='/projects'>Projects</Link>
          <Link className="header-link" to='/agents'>Agents</Link>

          {/* ROUTES */}
          <Route path='/' exact render={(props)=><ProjectListing {...props} projects={this.state.projects}  refreshProjects={() => this.getProjects()}/>}/>
          <Route path='/projects' exact render={(props)=><ProjectListing {...props} projects={this.state.projects}  refreshProjects={() => this.getProjects()}/>}/>
          <Route path='/projects/:project_id' exact render={(props)=><ProjectDetail {...props}/>}/>
          <Route path='/agents' exact render={(props)=><AgentListing {...props} agents={this.state.agents}  refreshAgents={() => this.getAgents()}/>}/>
          {/* <Route path='/agents/:agent_id' exact render={(props)=><AgentDetail {...props}/>}/> */}
        </div>
      </Router>
    ); 
  }
}

export default App;
