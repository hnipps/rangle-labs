import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./project-preview.scss";
import ProjectStatus from "../../../../lib/components/project-status/project-status";
import DifficultyPips from "../../../../lib/components/difficulty-pips/difficulty-pips";
import TeamListing from "../../../../lib/components/team-listing/team-listing";
import TechListing from "../../../../lib/components/tech-listing/tech-listing";

class ProjectPreview extends Component {
  render() {
    const { project } = this.props;

    return (
      <div className="project-box">
        <div className="project-details">
          <Link to={`/projects/${project._id}`}>
            <h3>{project.title}</h3>
          </Link>
          <ProjectStatus status={project.status} />
          <DifficultyPips difficulty={project.difficulty} />
          <Link to={`/projects/${project._id}`}>
            <p>{project.description}</p>
          </Link>

          {/* TECH TOOL LISTING */}
          <TechListing technologies={project.technologies} />
          {/* PROJECT LEAD LISTING */}
          <TeamListing teamMembers={project.projectLead} />
          {/* TEAM LISTING*/}
          <TeamListing teamMembers={project.agents} />
        </div>
      </div>
    );
  }
}

export default ProjectPreview;
