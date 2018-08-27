import React, { Component } from "react";
import { Link } from "react-router-dom";
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

    if (!this.state.project) return <div className="loading">Loading</div>;

    return (
      <ContentContainer>
        <CenterContentWrapper>
          <DetailCard>
            <div className="dtc v-mid mid-gray w-25 tl mb0">
              <ProjectStatus status={project.status} size="L" />
            </div>
            <div className="dtc v-mid w-25 tr">
              <DifficultyPips difficulty={project.difficulty} size="L" />
            </div>
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
              onClick={() => this.deleteProject(project._id)}
              color="dark-red"
            >{`Delete ${project.title}`}</Button>
          </DetailCard>
        </CenterContentWrapper>
      </ContentContainer>
    );
  }
}

export default ProjectDetail;
