import React, { Component } from 'react'
import axios from 'axios'

// TODO: Move and rename AddAgentTechnologies, to make it more reusable
import AddTechnologies from '../../../../lib/components/form/add-technologies/add-technologies.js'
import AddMentorshipAgents from './add-mentorship-agents/add-mentorship-agents'
import TeamListing from '../../../../lib/components/team-listing/team-listing.js'
import { mentorshipRoles } from '../../../constants.js'
import FormLabel from '../../../../lib/components/form/form-label/form-label.js'
import FormInput from '../../../../lib/components/form/form-input/form-input.js'
import Button from '../../../../lib/components/button/button.js'
import CenterContentWrapper from '../../../../lib/components/form/center-content-wrapper/center-content-wrapper.js'

class AddMentorship extends Component {
  statusList = ['Active', 'Hiatus']

  _radioInputs = [false, false, false, false, false]

  state = {
    mentorship: {
      title: '',
      description: '',
      status: this.statusList[2],
      technologies: [],
      mentorshipLead: [],
      agents: [],
      trelloBoardUrl: '',
      githubUrl: '',
    },
  }

  getMentorship = async mentorship_id => {
    const res = await axios.get(`/mentorships/${mentorship_id}`)
    return res.data
  }

  async componentDidMount() {
    // if we are on the "Edit an Agent" page, get the agent to edit by id
    if (this.props.edit) {
      const { mentorship_id } = this.props.match.params
      const mentorship = await this.getMentorship(mentorship_id)
      this.setState({ mentorship })
    }
  }

  handleTechClick = techId => {
    const previousTechnologies = Array.from(this.state.mentorship.technologies)

    const matchingTech = previousTechnologies.filter(tech => tech._id === techId)

    let alteredTechnologies

    if (matchingTech.length) {
      alteredTechnologies = previousTechnologies.filter(tech => tech._id !== techId)
    } else {
      alteredTechnologies = previousTechnologies

      const techToAdd = this.props.technologies.find(tech => tech._id === techId)
      alteredTechnologies.push(techToAdd)
    }

    this.setState(prevState => ({
      mentorship: {
        ...prevState.mentorship,
        technologies: alteredTechnologies,
      },
    }))
  }

  onInput = event => {
    const name = event.target.name
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value

    this.setState(prevState => ({
      mentorship: {
        ...prevState.mentorship,
        [name]: value,
      },
    }))
  }

  addNewMentorship = async mentorship => {
    try {
      const res = await axios.post('/mentorships', mentorship)

      if (res) {
        this.props.history.push('/mentorships')
      }
    } catch (err) {
      console.error('There was an error adding a new mentorship:', err)
    }
  }

  editExistingMentorship = async mentorship => {
    const { mentorship_id } = this.props.match.params

    try {
      const res = await axios.patch(`/mentorships/${mentorship_id}`, mentorship)

      if (res) {
        this.props.history.push(`/mentorships/${mentorship_id}`)
      }
    } catch (err) {
      console.error('There was an error editing an existing mentorship', err)
    }
  }

  handleSubmission = event => {
    event.preventDefault()
    const mentorship = this.state.mentorship

    if (this.props.edit) {
      this.editExistingMentorship(mentorship)
    } else {
      this.addNewMentorship(mentorship)
    }
  }

  cancelAction = event => {
    event.preventDefault()
    const { mentorship_id } = this.props.match.params
    this.props.history.push(`/mentorships/${mentorship_id}`)
  }

  addPersonToMentorship = role => {
    return teamMember => {
      const newPeople = [...this.state.mentorship[role]]
      newPeople.push(teamMember)
      this.setState(prevState => ({
        mentorship: {
          ...prevState.mentorship,
          [role]: newPeople,
        },
      }))
    }
  }

  removePersonFromMentorship = role => {
    return event => {
      event.preventDefault()
      const personIndex = event.target.value
      const newPeople = [...this.state.mentorship[role]]
      newPeople.splice(personIndex, 1)
      this.setState(prevState => ({
        mentorship: {
          ...prevState.mentorship,
          [role]: newPeople,
        },
      }))
    }
  }

  render() {
    const { mentorship } = this.state

    // get the agent name for headings - if one exists
    const mentorshipAppellation = mentorship.title ? mentorship.title : 'this mentorship'

    // determine which heading to show
    const heading = this.props.edit
      ? `Edit Details for ${mentorshipAppellation}`
      : `Add a Mentorship`

    // determine which text to show in the submit and cancel buttons
    const submitButtonText = this.props.edit ? 'Submit Edits' : 'Add this Mentorship'
    const cancelButtonText = 'Cancel Without Saving'

    return (
      <CenterContentWrapper>
        <h1>{heading}</h1>
        <FormInput
          id="title"
          name="title"
          aria-describedby="title-desc"
          placeholder="Give it a name"
          value={mentorship.title}
          onChange={this.onInput}
          label="Title"
        />
        <FormLabel htmlFor="description">Description</FormLabel>
        <textarea
          id="description"
          name="description"
          className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb3 center"
          aria-describedby="description-desc"
          placeholder="What's it all about?"
          value={mentorship.description}
          onChange={this.onInput}
        />
        <div className="measure mb3 center">
          <FormLabel htmlFor="status">What's the status of this mentorship?</FormLabel>
          <select
            className="w-100 f6 h2 bg-white ma1 b--black-20 mid-gray"
            name="status"
            value={mentorship.status}
            onChange={this.onInput}
          >
            {this.statusList.map((status, i) => {
              return (
                <option key={`status_${i}`} value={status}>
                  {status}
                </option>
              )
            })}
          </select>
        </div>

        <FormInput
          id="trelloBoardUrl"
          name="trelloBoardUrl"
          aria-describedby="trelloBoardUrl-desc"
          placeholder="Where can you find the Trello board?"
          value={mentorship.trelloBoardUrl}
          onChange={this.onInput}
          label="Trello Board URL"
        />

        <FormInput
          id="githubUrl"
          name="githubUrl"
          aria-describedby="githubUrl-desc"
          placeholder="Does this mentorship have a GitHub repository?"
          value={mentorship.githubUrl}
          onChange={this.onInput}
          label="GitHub URL"
        />

        <AddTechnologies
          technologies={this.props.technologies}
          activeTechnologies={mentorship.technologies}
          handleTechClick={techId => this.handleTechClick(techId, 'currentTechnologies')}
          label="Which technologies are used for this mentorship?"
        />

        <div className="measure mb2 center">
          <FormLabel>Who's the mentorship owner?</FormLabel>
          <AddMentorshipAgents
            addAgentToMentorship={this.addPersonToMentorship(mentorshipRoles.mentorshipLead)}
          />
          <FormLabel>Current mentorship owner:</FormLabel>
          <TeamListing
            teamMembers={this.state.mentorship.mentorshipLead}
            onRemoveClick={this.removePersonFromMentorship(mentorshipRoles.mentorshipLead)}
            placeholder="This mentorship doesn't have an owner 😢"
            renderName
          />
        </div>

        <div className="measure mb3 center">
          <FormLabel>Who else is on the mentorship team?</FormLabel>
          <AddMentorshipAgents
            addAgentToMentorship={this.addPersonToMentorship(mentorshipRoles.agents)}
          />
          <FormLabel>Current team members:</FormLabel>
          <TeamListing
            teamMembers={this.state.mentorship.agents}
            onRemoveClick={this.removePersonFromMentorship(mentorshipRoles.agents)}
            renderName
            placeholder="This team has no members 😱"
          />
        </div>

        <Button onClick={this.handleSubmission} color="green">
          {submitButtonText}
        </Button>
        <Button onClick={this.cancelAction} color="red">
          {cancelButtonText}
        </Button>
      </CenterContentWrapper>
    )
  }
}

export default AddMentorship
