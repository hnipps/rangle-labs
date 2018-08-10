import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ProjectPreview.scss';
import ProjectStatus from '../ProjectStatus/ProjectStatus';
import DifficultyPips from '../DifficultyPips/DifficultyPips';
import TeamListing from '../TeamListing/TeamListing';
import TechListing from '../TechListing/TechListing';

class ProjectPreview extends Component {

  render () {
    
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
    )
  }
}

export default ProjectPreview;
