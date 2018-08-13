import React from "react";
import constants from "../../../application/constants";

const ProjectStatus = ({ status }) => {
  let color;

  switch (status) {
    case "Active":
      color = constants.colors.activeColor;
      break;
    case "Hiatus":
      color = constants.colors.hiatusColor;
      break;
    case "Backlog":
      color = constants.colors.backlogColor;
      break;
    default:
      color = constants.colors.backlogColor;
  }

  return (
    <div className="project-status-container">
      <div className="project-status" style={{ backgroundColor: color }} />
      <p className="project-status">{status}</p>
    </div>
  );
};

export default ProjectStatus;
