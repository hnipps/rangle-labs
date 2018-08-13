import React from "react";
import { Link } from "react-router-dom";
import "./team-listing.scss";

const TeamListing = ({ teamMembers }) => {
  const team = teamMembers.map(teamMember => {
    return (
      <Link
        className="header-link"
        to={`/agents/${teamMember._id}`}
        key={teamMember._id}
      >
        <div className="project-team-member-image">
          <img
            src={teamMember.image}
            alt={`${teamMember.firstName} ${teamMember.lastName}`}
          />
        </div>
      </Link>
    );
  });

  return <div className="project-team">{team}</div>;
};

export default TeamListing;
