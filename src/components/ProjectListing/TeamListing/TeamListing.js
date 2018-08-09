import React from 'react';
import './TeamListing.scss';

const TeamListing = ({teamMembers}) => {

    const team = teamMembers.map(teamMember => {
      return (
        <div className="project-team-member" key={teamMember._id}>{`${teamMember.firstName} ${teamMember.lastName}`}</div>
      );
    });

    return (
        <div className="project-team">
            {team}
        </div>
    );
}

export default TeamListing;
