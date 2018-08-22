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
        <div className="db projects-container">
          {this.renderProjects(this.props.projects)}
        </div>
        <div>
          <Link className="db header-link mv3" to="/add-project">
            <div
              className="helvetica f5 no-underline br-pill ph2 pv1 mb2 ml2 dib white bg-dark-red unselectable"
              style={{cursor: "pointer"}}
            >
              Add a project
            </div>
          </Link>
          <TechnologySidebar
            history={this.props.history}
            technologies={this.props.technologies}
            activeTechnologies={this.compileProjectTechnologies()}
            techFilters={this.props.techFilters}
            handleTechFilter={techId => this.props.handleTechFilter(techId)}
            parent={"projects"}
          />
        </div>
      </div>
    );
  }
}

export default ProjectListing;
