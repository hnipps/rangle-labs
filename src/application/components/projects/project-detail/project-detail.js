import React, { Component } from "react";
import axios from "axios";
import ProjectStatus from "../../../../lib/components/status/project-status/project-status";
import DifficultyPips from "../../../../lib/components/difficulty-pips/difficulty-pips";
import TeamListing from "../../../../lib/components/team-listing/team-listing";
import TechListing from "../../../../lib/components/tech-listing/tech-listing";
import "./project-detail.scss";
import ContentContainer from "../../../../lib/components/content-container/content-container";
import CenterContentWrapper from "../../../../lib/components/form/center-content-wrapper/center-content-wrapper";
import DetailCard from "../../../../lib/components/detail-card/detail-card";
import LinkButton from "../../../../lib/components/link-button/link-button";
import Button from "../../../../lib/components/button/button";
import CardHeader from "../../../../lib/components/card/card-header/card-header";

class ProjectDetail extends Component {
  state = {
    project: null
  };

  getProject = async project_id => {
    const res = await axios.get(`/projects/${project_id}`);
    return res.data;
  };

  async componentDidMount() {
    const { project_id } = this.props.match.params;
    const project = await this.getProject(project_id);
    this.setState({ project });
  }

  deleteProject = async id => {
    await axios.delete(`/projects/${id}`);
    this.props.history.push("/projects");
  };

  render() {
    const { project } = this.state;

    if (!this.state.project)
      return <h2 className="helvetica center tc moon-gray">Loading...</h2>;

    let trelloBoardLink;
    if (project.trelloBoardUrl) {
      trelloBoardLink = (
        <div className="mb3">
          <a href={project.trelloBoardUrl}>
            <img
              className="h2"
              src="../assets/trello/trello-mark-blue.png"
              alt="Trello"
            />
          </a>
        </div>
      );
    }

    let githubUrl;
    if (project.githubUrl) {
      // GitHub-Mark-64px
      githubUrl = (
        <div className="mb3">
          <a href={project.githubUrl}>
            <img
              className="h2"
              src="../assets/github/GitHub-Mark-64px.png"
              alt="GitHub"
            />
          </a>
        </div>
      );
    }

    return (
      <ContentContainer>
        <CenterContentWrapper>
          <DetailCard>
            <CardHeader>
              <div className="dtc v-mid mid-gray mb0">
                <ProjectStatus status={project.status} size="L" />
              </div>
              {trelloBoardLink}
              {githubUrl}
              <DifficultyPips difficulty={project.difficulty} size="L" />
            </CardHeader>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <p>Technologies Used:</p>
            {/* TECH TOOL LISTING */}
            <TechListing technologies={project.technologies} />
            {/* PROJECT LEAD LISTING */}
            <p>Project Owner:</p>
            <TeamListing teamMembers={project.projectLead} />
            {/* TEAM LISTING*/}
            <p>Team:</p>
            <TeamListing teamMembers={project.agents} />
            <LinkButton to={`/edit-project/${project._id}`} color="green">
              {`Edit Details for ${project.title}`}
            </LinkButton>
            <Button
              className="delete-project-button"
              onClick={event => {
                event.preventDefault();
                this.deleteProject(project._id);
              }}
              color="dark-red"
              confirm
            >{`Delete ${project.title}`}</Button>
          </DetailCard>
        </CenterContentWrapper>
      </ContentContainer>
    );
  }
}

export default ProjectDetail;
