import React, { Component } from 'react'
import axios from 'axios'
import './add-agent.scss'
import FormInput from '../../../../lib/components/form/form-input/form-input'
import Button from '../../../../lib/components/button/button'
import AddTechnologies from '../../../../lib/components/form/add-technologies/add-technologies'
import CenterContentWrapper from '../../../../lib/components/form/center-content-wrapper/center-content-wrapper'

class AddAgent extends Component {
  state = {
    agent: {
      firstName: '',
      lastName: '',
      position: '',
      image: '',
      currentTechnologies: [],
      aspirationalTechnologies: [],
      available: false,
    },
  }

  getAgent = async agent_id => {
    const res = await axios.get(`/agents/${agent_id}`)
    return res.data
  }

  async componentDidMount() {
    // if we are on the "Edit an Agent" page, get the agent to edit by id
    if (this.props.edit) {
      const { agent_id } = this.props.match.params
      const agent = await this.getAgent(agent_id)
      this.setState({ agent })
    }
  }

  handleTechClick = (techId, currentOrAspirational) => {
    const previousTechnologies = Array.from(this.state.agent[currentOrAspirational])

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
      agent: {
        ...prevState.agent,
        [currentOrAspirational]: alteredTechnologies,
      },
    }))
  }

  onInput = event => {
    const name = event.target.name
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value

    this.setState(prevState => ({
      agent: {
        ...prevState.agent,
        [name]: value,
      },
    }))
  }

  addNewAgent = async agent => {
    try {
      const res = await axios.post('/agents', agent)

      if (res) {
        const agent = res.data.payload
        this.props.history.push(`/agents/${agent._id}`)
      }
    } catch (err) {
      console.error('There was an error adding a new agent:', err)
    }
  }

  editExistingAgent = async agent => {
    const { agent_id } = this.props.match.params

    try {
      const res = await axios.patch(`/agents/${agent_id}`, agent)

      if (res) {
        this.props.history.push(`/agents/${agent_id}`)
      }
    } catch (err) {
      console.error('There was an error editing an existing agent', err)
    }
  }

  handleSubmission = event => {
    event.preventDefault()
    const agent = this.state.agent

    if (this.props.edit) {
      this.editExistingAgent(agent)
    } else {
      this.addNewAgent(agent)
    }
  }

  cancelAction = event => {
    event.preventDefault()
    const agent = this.state.agent
    this.props.history.push(`/agents/${agent._id}`)
  }

  render() {
    const { agent } = this.state

    // get the agent name for headings - if one exists
    const agentAppellation = agent.firstName.length ? `${agent.firstName}` : 'this agent'

    // determine which heading to show
    const heading = this.props.edit ? `Edit Details for ${agentAppellation}` : `Add an Agent`

    // determine which text to show in the submit and cancel buttons
    const submitButtonText = this.props.edit ? 'Submit Edits' : 'Add this Agent'
    const cancelButtonText = 'Cancel Without Saving'

    return (
      <CenterContentWrapper>
        <h1>{heading}</h1>
        <FormInput
          id="firstName"
          name="firstName"
          aria-describedby="firstName-desc"
          placeholder="What's their first name?"
          value={agent.firstName}
          onChange={this.onInput}
          label="First Name"
        />
        <FormInput
          id="lastName"
          name="lastName"
          aria-describedby="lastName-desc"
          placeholder="What's their last name?"
          value={agent.lastName}
          onChange={this.onInput}
          label="Last Name"
        />
        <FormInput
          id="position"
          name="position"
          aria-describedby="position-desc"
          placeholder="What do they do?"
          value={agent.position}
          onChange={this.onInput}
          label="Position"
        />
        <FormInput
          id="image"
          name="image"
          placeholder="Enter a URL"
          value={agent.image}
          onChange={this.onInput}
          label="Image"
        />
        <AddTechnologies
          technologies={this.props.technologies}
          activeTechnologies={agent.currentTechnologies}
          handleTechClick={techId => this.handleTechClick(techId, 'currentTechnologies')}
          label={`Which technologies does ${agentAppellation} currently know?`}
        />

        <AddTechnologies
          technologies={this.props.technologies}
          activeTechnologies={agent.aspirationalTechnologies}
          handleTechClick={techId => this.handleTechClick(techId, 'aspirationalTechnologies')}
          label={`Which technologies would ${agentAppellation} like to learn?`}
        />

        <div className="mb3">
          <input
            className="mr2"
            type="checkbox"
            id="available"
            name="available"
            checked={agent.available}
            onChange={this.onInput}
          />
          <label htmlFor="available" className="f5 b mb2 lh-copy">
            {`Is ${agentAppellation} available to mentor?`}
          </label>
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

export default AddAgent
