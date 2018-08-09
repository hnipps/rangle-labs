import React from 'react';
import './DifficultyPips.scss';

const DifficultyPips = ({difficulty}) => {
    const pips = [];

    for(let i = 0; i < difficulty; i++) {
        const key = i;
        const pip = (<div className='pip' key={key}></div>);
        pips.push(pip);
    }

    return (
        <div className="project-difficulty">
            {pips}
        </div>
    );
}

export default DifficultyPips;
