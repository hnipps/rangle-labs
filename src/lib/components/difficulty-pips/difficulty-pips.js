import React from "react";

const DifficultyPips = ({ difficulty }) => {
  const pips = [];

  for (let i = 0; i < difficulty; i++) {
    const key = i;
    const pip = <div className="h1 w1 bg-dark-blue br-100 dib" key={key} />;
    pips.push(pip);
  }

  return <div>{pips}</div>;
};

export default DifficultyPips;
