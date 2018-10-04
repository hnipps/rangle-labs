import React, { Component } from "react";
import ProjectPreview from "../mentorship-preview/mentorship-preview";
import TechnologySidebar from "../../technologies/technology-sidebar/technology-sidebar";
import CardContainer from "../../../../lib/components/card-container/card-container";
import ContentContainer from "../../../../lib/components/content-container/content-container";
import SidebarContainer from "../../../../lib/components/sidebar-container/sidebar-container";
import ControlContainer from "../../../../lib/components/control-container/control-container";
import LinkButton from "../../../../lib/components/link-button/link-button";

class MentorshipListing extends Component {
  async componentDidMount() {
    this.props.refreshProjects();
    this.props.resetTechFilters();
  }

  renderMentorships = mentorships => {
    if (!mentorships.length) {
      return <h2 className="center tc moon-gray" >Sorry, no mentorships match your criteria!</h2>;
    }

    return mentorships.map(mentorship => {
      return <ProjectPreview mentorship={mentorship} key={mentorship._id} />;
    });
  };

  compileMentorshipTechnologies = () => {
    const allMentorshipTechnologies = [];

    this.props.mentorships.forEach(mentorship => {
      allMentorshipTechnologies.push(...mentorship.technologies);
    });

    return allMentorshipTechnologies.map(technology => technology._id);
  };

  render() {
    return (
      <ContentContainer>
        <SidebarContainer>
          <TechnologySidebar
            history={this.props.history}
            technologies={this.props.technologies}
            activeTechnologies={this.compileMentorshipTechnologies()}
            techFilters={this.props.techFilters}
            handleTechFilter={techId => this.props.handleTechFilter(techId)}
            parent={"mentorships"}
          />
          <ControlContainer>
            <LinkButton to="/add-mentorship" color="dark-red">
              Add Project
            </LinkButton>
          </ControlContainer>
        </SidebarContainer>
        <CardContainer>
          {this.renderMentorships(this.props.mentorships)}
        </CardContainer>
      </ContentContainer>
    );
  }
}

export default MentorshipListing;
