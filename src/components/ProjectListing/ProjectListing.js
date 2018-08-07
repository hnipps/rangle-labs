import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProjectPreview from './ProjectPreview/ProjectPreview';
// import Search from '../Search/Search';
// import axios from 'axios';
import './ProjectListing.scss';

class ProjectListing extends Component {

  async componentDidMount() {
    this.props.refreshProjects();
  }

  renderProjects = (projects) => {
    
    return projects.map(project => {
      return (
      //   <Link to={`/projects/${project._id}`}>
          <ProjectPreview project={project}/>
      //   </Link>

      );
    })
  }

  render () {
    return (
      <div className="projects-root">
        <h2>Projects</h2>
        {/* <Search onSearchChange={(e) => this.props.onSearchChange(e)} placeholder="Search for an artist"/> */}
        <div className="projects-container">
          {this.renderProjects(this.props.projects)}
        </div>
      </div>
    )
  }
}

export default ProjectListing;