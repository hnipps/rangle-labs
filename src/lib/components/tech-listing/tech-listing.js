import React from "react";

const TechListing = ({ technologies }) => {
  const techTools = technologies.map(technology => {
    return (
      <li className="dib mr1 mb1" key={technology._id}>
        <p className="f7 f7-ns b db pa2 ma0 dark-gray ba b--black-20">{technology.name}</p>
      </li>
    );
  });

  return <ul className="list ph2 pv2">{techTools}</ul>;
};

export default TechListing;
