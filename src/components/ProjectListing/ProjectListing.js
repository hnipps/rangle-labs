import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProjectPreview from './ProjectPreview/ProjectPreview';
import './ProjectListing.scss';

class ProjectListing extends Component {

  async componentDidMount() {
    this.props.refreshProjects();
  }

  renderProjects = (projects) => {
    
    return projects.map(project => {
      return (
        <ProjectPreview project={project}/>
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
