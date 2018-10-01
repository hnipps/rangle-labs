import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../button/button";
import './team-listing.scss'
class TeamListing extends Component {

  createTeamListing = teamMembers => {
    let team;

    if (teamMembers.length > 0) {
      team = teamMembers.map((teamMember, i) => {
        let addButton;
        let removeButton;
        if (this.props.onAddClick) {
          addButton = <Button value={i} color={"green"} onClick={this.props.onAddClick}>Add</Button>
        }
        if (this.props.onRemoveClick) {
          removeButton = <Button value={i} color={"dark-red"} onClick={this.props.onRemoveClick}>Remove</Button>
        }
        return (
          <li className="dib ma1 tc h1" key={teamMember._id}>
            <Link
              to={`/agents/${teamMember._id}`}
            >
              <div className="z-1 relative">
                <img className="agent-size br-100 relative z-2"
                  src={teamMember.image}
                  alt={`${teamMember.firstName} ${teamMember.lastName}`}
                />
                {this.props.leadFlag && <span role="img" aria-label="flag" className="v-mid dib absolute top-0 z-3 lead-flag">🚩</span>}
              </div>
            </Link>
            { this.props.renderName && <h2 className="f7 mw3 center mt0 mb2">{`${teamMember.firstName} ${teamMember.lastName}`}</h2> } 
            {addButton}
            {removeButton}
          </li>
        );
      });
    } else {
      team = (
        <div className="dtc v-mid tc moon-gray ph3 ph4-l h-100">
          <p className="f4 f3-ns fw6 tc">{ this.props.placeholder }</p>
        </div>
      )
    }

  
    return <ul className="list ph0 pv0 ma0 h3 mb2 di w-100">{team}</ul>;
  };

  render() {
    const teamListing = this.createTeamListing(this.props.teamMembers);
    return teamListing;
  }
}


export default TeamListing;
