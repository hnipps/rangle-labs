import React from "react";

const DifficultyPips = ({ difficulty, size }) => {
  const pips = [];
  const maxpips = 5;
  let sizeClasses;

  if (size === "L") {
    sizeClasses = "h2 w2";
  } else {
    sizeClasses = "h1 w1";
  }

  for (let i = 0; i < difficulty; i++) {
    const key = i;
    const pip = (
      <div className={`${sizeClasses} v-mid bg-dark-blue br-100 dib`} key={key} />
    );
    pips.push(pip);
  }

  for (let i = difficulty; i < maxpips; i++) {
    const key = i;
    const pip = (
      <div className={`${sizeClasses} v-mid bg-light-blue br-100 dib`} key={key} />
    );
    pips.push(pip);
  }

  return (
    <div className="dtc v-mid">
      {pips}
    </div>
  );
};

export default DifficultyPips;
