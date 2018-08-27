import React from "react";

const DifficultyPips = ({ difficulty, size }) => {
  const pips = [];
  let sizeClasses;

  if (size === "L") {
    sizeClasses = "h2 w2";
  } else {
    sizeClasses = "h1 w1"
  }

  for (let i = 0; i < difficulty; i++) {
    const key = i;
    const pip = <div className={`${sizeClasses} bg-dark-blue br-100 dib`} key={key} />;
    pips.push(pip);
  }

  return <div>{pips}</div>;
};

export default DifficultyPips;
