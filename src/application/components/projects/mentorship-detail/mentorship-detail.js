import React, { Component } from "react";
import axios from "axios";
<<<<<<< HEAD:src/application/components/projects/mentorship-detail/mentorship-detail.js
import MentorshipStatus from "../../../../lib/components/status/Mentorship-status/Mentorship-status";
=======
import ProjectStatus from "../../../../lib/components/status/project-status/mentorship-status";
>>>>>>> :recycle: listing,preview,detail,status:src/application/components/projects/project-detail/project-detail.js
import DifficultyPips from "../../../../lib/components/difficulty-pips/difficulty-pips";
import TeamListing from "../../../../lib/components/team-listing/team-listing";
import TechListing from "../../../../lib/components/tech-listing/tech-listing";
import "./mentorship-detail.scss";
import ContentContainer from "../../../../lib/components/content-container/content-container";
import CenterContentWrapper from "../../../../lib/components/form/center-content-wrapper/center-content-wrapper";
import DetailCard from "../../../../lib/components/detail-card/detail-card";
import LinkButton from "../../../../lib/components/link-button/link-button";
import Button from "../../../../lib/components/button/button";
import CardHeader from "../../../../lib/components/card/card-header/card-header";
import ConfirmationButton from "../../../../lib/components/confirmation-button/confirmation-button";

class MentorshipDetail extends Component {
  state = {
    mentorship: null
  };

  getMentorship = async mentorship_id => {
    const res = await axios.get(`/mentorships/${mentorship_id}`);
    return res.data;
  };

  async componentDidMount() {
    const { mentorship_id } = this.props.match.params;
    const mentorship = await this.getMentorship(mentorship_id);
    this.setState({ mentorship });
  }

  deleteMentorship = async id => {
    await axios.delete(`/mentorships/${id}`);
    this.props.history.push("/mentorships");
  };

  render() {
    const { mentorship } = this.state;

    if (!this.state.mentorship)
      return <h2 className="helvetica center tc moon-gray">Loading...</h2>;

    let trelloBoardLink;
    if (mentorship.trelloBoardUrl) {
      trelloBoardLink = (
        <div className="mb3">
          <a href={mentorship.trelloBoardUrl}>
            <img
              className="h2"
              src="../assets/trello/trello-mark-blue.png"
              alt="Trello"
            />
          </a>
        </div>
      );
    }

    let githubUrl;
    if (mentorship.githubUrl) {
      // GitHub-Mark-64px
      githubUrl = (
        <div className="mb3">
          <a href={mentorship.githubUrl}>
            <img
              className="h2"
              src="../assets/github/GitHub-Mark-64px.png"
              alt="GitHub"
            />
          </a>
        </div>
      );
    }

    return (
      <ContentContainer>
        <CenterContentWrapper>
          <DetailCard>
            <CardHeader>
              <div className="dtc v-mid mid-gray mb0">
                <MentorshipStatus status={mentorship.status} size="L" />
              </div>
              {trelloBoardLink}
              {githubUrl}
              <DifficultyPips difficulty={mentorship.difficulty} size="L" />
            </CardHeader>
            <h1>{mentorship.title}</h1>
            <p>{mentorship.description}</p>
            <p>Difficulty:</p>
            <DifficultyPips difficulty={mentorship.difficulty} size="L" />
            <p>Technologies Used:</p>
            {/* TECH TOOL LISTING */}
            <TechListing technologies={mentorship.technologies} />
            {/* MENTORSHIP LEAD LISTING */}
            <p>Mentorship Owner:</p>
            <TeamListing teamMembers={mentorship.mentorshipLead} />
            {/* TEAM LISTING*/}
            <p>Team:</p>
            <TeamListing teamMembers={mentorship.agents} />
            <LinkButton to={`/edit-mentorship/${mentorship._id}`} color="green">
              {`Edit Details for ${mentorship.title}`}
            </LinkButton>
            <ConfirmationButton
              onClick={event => {
                event.preventDefault();
                this.deleteMentorship(mentorship._id);
              }}
            >
              <Button className="delete-mentorship-button" color="dark-red">
                {`Delete ${mentorship.title}`}
              </Button>
            </ConfirmationButton>
          </DetailCard>
        </CenterContentWrapper>
      </ContentContainer>
    );
  }
}

export default MentorshipDetail;
