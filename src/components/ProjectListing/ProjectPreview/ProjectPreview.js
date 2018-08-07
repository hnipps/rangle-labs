import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ProjectPreview.scss';
import ProjectStatus from '../../ProjectStatus/ProjectStatus';
import DifficultyPips from '../../DifficultyPips/DifficultyPips';
import TeamListing from '../../TeamListing/TeamListing';
class ProjectPreview extends Component {

  render () {
    const { project } = this.props;
    return (
      <div className="project-box">
        <Link to={`/projects/${project._id}`}>
          <div className="project-details">
            <h3>{project.title}</h3>
            <ProjectStatus status={project.status} />
            <DifficultyPips difficulty={project.difficulty} />
            <p>{project.description}</p>
            <TeamListing teamMembers={project.agents} />
          </div>
        </Link>
      </div>
    )
  }
}

export default ProjectPreview;
