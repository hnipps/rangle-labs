import React from 'react';
import { colors } from '../../../constants';

const ProjectStatus = ({status}) => {

    let color;

    switch (status) {
      case 'Active':
        color = colors.activeColor;
        break;
      case 'Hiatus':
        color = colors.hiatusColor;
        break;
      case 'Backlog':
        color = colors.backlogColor;
        break;
      default:
        color = colors.backlogColor;
    } 

    return (
        <div className="project-status-container">
            <div className="project-status" style={{backgroundColor: color}}></div>
            <p className="project-status">{status}</p>
        </div>
    )
}

export default ProjectStatus;
