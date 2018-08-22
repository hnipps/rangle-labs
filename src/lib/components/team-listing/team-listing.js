import React, { Component } from "react";
import { Link } from "react-router-dom";

class TeamListing extends Component {

  createTeamListing = teamMembers => {

    const team = teamMembers.map((teamMember, i) => {
      let addButton;
      let removeButton;
      if (this.props.onAddClick) {
        addButton = <button value={i} onClick={this.props.onAddClick}>+</button>
      }
      if (this.props.onRemoveClick) {
        removeButton = <button value={i} onClick={this.props.onRemoveClick}>-</button>
      }
      return (
        <li className="dib mr1 mb1" key={teamMember._id}>
          <Link
            className=""
            to={`/agents/${teamMember._id}`}
          >
            <div>
              <img className="mw3 br-100"
                src={teamMember.image}
                alt={`${teamMember.firstName} ${teamMember.lastName}`}
              />
            </div>
          </Link>
          <h2 className="mv0 f7 mw3 center">{`${teamMember.firstName} ${teamMember.lastName}`}</h2>
          {addButton}
          {removeButton}
        </li>
      );
    });
  
    return <ul className="list ph2 pv1 ma0">{team}</ul>;
  };

  render() {
    const teamListing = this.createTeamListing(this.props.teamMembers);
    return teamListing;
  }
}


export default TeamListing;
