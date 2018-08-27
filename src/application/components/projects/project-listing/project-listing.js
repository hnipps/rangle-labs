import React, { Component } from "react";
import ProjectPreview from "../project-preview/project-preview";
import TechnologySidebar from "../../technologies/technology-sidebar/technology-sidebar";
import CardContainer from "../../../../lib/components/card-container/card-container";
import ContentContainer from "../../../../lib/components/content-container/content-container";
import SidebarContainer from "../../../../lib/components/sidebar-container/sidebar-container";
import ControlContainer from "../../../../lib/components/control-container/control-container";
import LinkButton from "../../../../lib/components/link-button/link-button";

class ProjectListing extends Component {
  async componentDidMount() {
    this.props.refreshProjects();
    this.props.resetTechFilters();
  }

  renderProjects = projects => {
    if (!projects.length) {
      return <h2 className="center tc moon-gray" >Sorry, no projects match your criteria!</h2>;
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
      <ContentContainer>
        <SidebarContainer>
          <TechnologySidebar
            history={this.props.history}
            technologies={this.props.technologies}
            activeTechnologies={this.compileProjectTechnologies()}
            techFilters={this.props.techFilters}
            handleTechFilter={techId => this.props.handleTechFilter(techId)}
            parent={"projects"}
          />
          <ControlContainer>
            <LinkButton to="/add-project">
              Add Project
            </LinkButton>
          </ControlContainer>
        </SidebarContainer>
        <CardContainer>
          {this.renderProjects(this.props.projects)}
        </CardContainer>
      </ContentContainer>
    );
  }
}

export default ProjectListing;
