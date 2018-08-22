import React, { Component } from "react";
import { Link } from 'react-router-dom';
import ProjectPreview from "../project-preview/project-preview";
import TechnologySidebar from "../../technologies/technology-sidebar/technology-sidebar";
import "./project-listing.scss";

class ProjectListing extends Component {
  async componentDidMount() {
    this.props.refreshProjects();
    this.props.resetTechFilters();
  }

  renderProjects = projects => {
    if (!projects.length) {
      return <p>Sorry, no projects match your criteria!</p>;
    }

    return projects.map(project => {
      return <ProjectPreview project={project} key={project._id} />;
    });
  };

  compileProjectTechnologies = () => {
    const allProjectTechnologies = [];

    this.props.projects.forEach(project => {
      allProjectTechnologies.push(...project.technologies);
    });

    return allProjectTechnologies.map(technology => technology._id);
  };

  render() {
    return (
      <div className="project-listing-root">
        <Link className="header-link" to="/add-project">
          <div className="add-project-button">Add a project</div>
        </Link>
        <div className="projects-container">
          {this.renderProjects(this.props.projects)}
        </div>
        <TechnologySidebar
          technologies={this.props.technologies}
          activeTechnologies={this.compileProjectTechnologies()}
          techFilters={this.props.techFilters}
          handleTechFilter={techId => this.props.handleTechFilter(techId)}
        />
      </div>
    );
  }
}

export default ProjectListing;
