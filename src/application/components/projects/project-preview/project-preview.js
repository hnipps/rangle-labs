import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectStatus from "../../../../lib/components/project-status/project-status";
import DifficultyPips from "../../../../lib/components/difficulty-pips/difficulty-pips";
import TeamListing from "../../../../lib/components/team-listing/team-listing";
import TechListing from "../../../../lib/components/tech-listing/tech-listing";
import Card from "../../../../lib/components/card/card";
import CardTitle from "../../../../lib/components/card/card-title/card-title";
import CardContent from "../../../../lib/components/card/card-content/card-content";

class ProjectPreview extends Component {
  render() {
    const { project } = this.props;

    return (
      <Card>
        <div className="dtc v-mid mid-gray w-25 tl mb0">
          <ProjectStatus status={project.status} />
        </div>
        <div className="dtc v-mid w-25 tr">
          <DifficultyPips difficulty={project.difficulty} />
        </div>
        <CardContent>
          <CardTitle to={`/projects/${project._id}`}>{project.title}</CardTitle>
          <Link className="no-underline mid-gray" to={`/projects/${project._id}`}>
            <p>{project.description}</p>
          </Link>

          {/* TECH TOOL LISTING */}
          <TechListing technologies={project.technologies} />
          {/* PROJECT LEAD LISTING */}
          <TeamListing teamMembers={project.projectLead} />
          {/* TEAM LISTING*/}
          <TeamListing teamMembers={project.agents} />
        </CardContent>
      </Card>
    );
  }
}

export default ProjectPreview;
