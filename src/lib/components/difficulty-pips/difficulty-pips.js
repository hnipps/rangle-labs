import React from "react";
import "./difficulty-pips.scss";

const DifficultyPips = ({ difficulty }) => {
  const pips = [];

  for (let i = 0; i < difficulty; i++) {
    const key = i;
    const pip = <div className="pip" key={key} />;
    pips.push(pip);
  }

  return <div className="project-difficulty">{pips}</div>;
};

export default DifficultyPips;
