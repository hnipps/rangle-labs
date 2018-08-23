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
      <div className="ph2 ph4-ns flex">
        <div className="db flex flex-wrap w-75">
          {this.renderProjects(this.props.projects)}
        </div>
        <div className="w-25">
          <TechnologySidebar
            history={this.props.history}
            technologies={this.props.technologies}
            activeTechnologies={this.compileProjectTechnologies()}
            techFilters={this.props.techFilters}
            handleTechFilter={techId => this.props.handleTechFilter(techId)}
            parent={"projects"}
          />
          <div className="db header-link mv3">
            <Link className="helvetica f5 b no-underline br-pill ph3 pv2 mb2 ml2 dib white bg-dark-red unselectable" style={{cursor: "pointer"}} to="/add-project">
              Add Project
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectListing;
