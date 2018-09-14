import React from "react";

const DifficultyPips = ({ difficulty, size }) => {
  const pips = [];
  const maxpips = 5;
  let sizeClasses;
  let pipColourClass;

  if (size === "L") {
    sizeClasses = "h2 w2";
  } else {
    sizeClasses = "h1 w1";
  }

  for (let i = 0; i < maxpips; i++) {
    const key = i;
    pipColourClass = i < difficulty ? 'dark' : 'light';
    const pip = (
      <div className={`${sizeClasses} v-mid bg-${pipColourClass}-blue br-100 dib`} key={key} />
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
