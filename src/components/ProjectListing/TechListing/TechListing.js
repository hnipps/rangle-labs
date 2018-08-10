import React from 'react';
import './TechListing.scss';

const TechListing = ({technologies}) => {

    const techTools = technologies.map(technology => {
      return (
        <div className="technology-list-item" key={technology._id}>
            <p>{technology.name}</p>
        </div>
      );
    });

    return (
        <div className="tech-tool-listing">
            {techTools}
        </div>
    );
}

export default TechListing;
