import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectStatus from "../../../../lib/components/project-status/project-status";
import DifficultyPips from "../../../../lib/components/difficulty-pips/difficulty-pips";
import TeamListing from "../../../../lib/components/team-listing/team-listing";
import TechListing from "../../../../lib/components/tech-listing/tech-listing";

class ProjectPreview extends Component {
  render() {
    const { project } = this.props;

    return (
      <article className="helvetica mw5 center bg-white br3 pa3 mv3 ba b--black-10">
      <div className="dtc v-mid mid-gray w-25 tl mb0">
        <ProjectStatus status={project.status} />
      </div>
      <div className="dtc v-mid w-25 tr">
        <DifficultyPips difficulty={project.difficulty} />
      </div>
        <div className="tc">
          <Link className="no-underline dark-gray hover-blue" to={`/projects/${project._id}`}>
            <h1 className="f3 mb2" >{project.title}</h1>
          </Link>
          <Link className="no-underline mid-gray" to={`/projects/${project._id}`}>
            <p>{project.description}</p>
          </Link>

          {/* TECH TOOL LISTING */}
          <TechListing technologies={project.technologies} />
          {/* PROJECT LEAD LISTING */}
          <TeamListing teamMembers={project.projectLead} />
          {/* TEAM LISTING*/}
          <TeamListing teamMembers={project.agents} />
        </div>
      </article>
    );
  }
}

export default ProjectPreview;
