import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ProjectPreview.scss';

class ProjectPreview extends Component {

  componentDidMount() {
  }

  determineStatusColor = (status) => {

    const activeColor = "#5f9e40";
    const hiatusColor = "#f79442";
    const backlogColor = "#6c41f7";

    let color;

    switch (status) {
      case 'Active':
        color = activeColor;
        break;
      case 'Hiatus':
        color = hiatusColor;
        break;
      case 'Backlog':
        color = backlogColor;
        break;
      default:
        color = backlogColor;
    } 

    return color;
  }

  renderProjectDifficulty = (difficulty) => {
    const pips = [];

    for(let i = 0; i < difficulty; i++) {
    const pip = (<div className='pip'></div>);
      pips.push(pip);
    }

    return pips;
  }

  assembleProjectTeam = (teamMembers) => {

    return teamMembers.map(teamMember => {
      return (
        <div className="project-team-member">{`${teamMember.firstName} ${teamMember.lastName}`}</div>
      );
    });
  }

  render () {
    const { project } = this.props;
    return (
        <div className="project-box">
            <div className="project-details">
                <h3>{project.title}</h3>
                <div className="project-status-container">
                    <div className="project-status" style={{backgroundColor: this.determineStatusColor(project.status)}}>
                    </div>
                    <p className="project-status">{project.status}</p>

                </div>
                <div className="project-difficulty">
                    {this.renderProjectDifficulty(project.difficulty)}
                </div>
                <p>{project.description}</p>
                <div className="project-team">
                    {this.assembleProjectTeam(project.agents)}
                </div>
            </div>
        </div>
    )
  }
}

export default ProjectPreview;