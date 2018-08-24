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
    <div className="f5 fw4 gray mt0 flex items-center">
      <div className="h1 w1 br-100 dib mr1" style={{ backgroundColor: color }} />
      <p className="dib mv1">{status}</p>
    </div>
  );
};

export default ProjectStatus;
