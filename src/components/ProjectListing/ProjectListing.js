import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import ProjectPreview from './ProjectPreview/ProjectPreview';
import './ProjectListing.scss';
import TechnologySidebar from '../Technology/TechnologySidebar/TechnologySidebar';
class ProjectListing extends Component {

  async componentDidMount() {
    this.props.refreshProjects();
  }

  renderProjects = (projects) => {

    if (!projects.length) {
      return (
        <p>Sorry, no projects match your criteria!</p>
      );
    }
    
    return projects.map(project => {
      return (
        <ProjectPreview project={project} key={project._id}/>
      );
    })
  }

  compileProjectTechnologies = () => {

    const allProjectTechnologies = [];

    this.props.projects.forEach(project => {
      allProjectTechnologies.push(...project.technologies);
    });

    return allProjectTechnologies.map(technology => technology._id);
  }

  render () {
    return (
      <div className="project-listing-root">
        <div className="projects-container">
          {this.renderProjects(this.props.projects)}
        </div>
        <TechnologySidebar technologies={this.props.technologies} activeProjectTechnologies={this.compileProjectTechnologies()} techFilters={this.props.techFilters} handleTechFilter={(techId) => this.props.handleTechFilter(techId)}/>
      </div>
    )
  }
}

export default ProjectListing;
