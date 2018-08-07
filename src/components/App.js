import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios'
import ProjectListing from './ProjectListing/ProjectListing';
import ProjectDetail from './ProjectDetail/ProjectDetail';
class App extends Component {

  state = {
    projects: [],
  }

  getProjects = async () => {
    try {
      const res = await axios.get('/projects');
      const projects = res.data.docs;
      console.log(projects);
      this.setState({ projects });
    } catch(e) {
      console.error("Something went wrong with getting the projects", e);
    }
  }

  async componentDidMount () {

    this.getProjects();

  }

  render () {
    return (
      <Router>
        <div className='app'>
          <Link className="header-link" to='/projects'>Projects</Link>
          <Route path='/' exact render={(props)=><ProjectListing {...props} projects={this.state.projects}  refreshProjects={() => this.getProjects()}/>}/>
          <Route path='/projects' exact render={(props)=><ProjectListing {...props} projects={this.state.projects}  refreshProjects={() => this.getProjects()}/>}/>
          <Route path='/projects/:project_id' exact render={(props)=><ProjectDetail {...props}/>}/>
        </div>
      </Router>
    ); 
  }
}

export default App;
