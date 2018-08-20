import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./team-listing.scss";

class TeamListing extends Component {

  createTeamListing = teamMembers => {
    const team = teamMembers.map(teamMember => {
      return (
        <div>
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
          <p>{`${teamMember.firstName} ${teamMember.lastName}`}</p>
        </div>
      );
    });
  
    return <div className="project-team">{team}</div>;
  };

  render() {
    const teamListing = this.createTeamListing(this.props.teamMembers);
    return teamListing;
  }
}


export default TeamListing;
