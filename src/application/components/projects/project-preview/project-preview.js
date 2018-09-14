import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectStatus from "../../../../lib/components/status/project-status/project-status";
import TeamListing from "../../../../lib/components/team-listing/team-listing";
import Card from "../../../../lib/components/card/card";
import CardTitle from "../../../../lib/components/card/card-title/card-title";
import CardContent from "../../../../lib/components/card/card-content/card-content";
import CardHeader from "../../../../lib/components/card/card-header/card-header";

class ProjectPreview extends Component {
  render() {
    const { project } = this.props;

    return (
      <Card>
        <CardHeader>
          <div className="dtc v-mid mid-gray mb0">
            <ProjectStatus status={project.status} />
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle to={`/projects/${project._id}`}>{project.title}</CardTitle>
          <Link
            className="no-underline mid-gray"
            to={`/projects/${project._id}`}
          >
            <p>{project.description}</p>
          </Link>
          {/* PROJECT LEAD LISTING */}
          <TeamListing teamMembers={project.projectLead}/>
          <TeamListing teamMembers={project.agents}/>
        </CardContent>
      </Card>
    );
  }
}

export default ProjectPreview;
