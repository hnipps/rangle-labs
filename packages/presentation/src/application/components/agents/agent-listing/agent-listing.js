import React, { Component } from 'react'
import { CSVLink } from 'react-csv'
import AgentPreview from '../agent-preview/agent-preview'
import TechnologySidebar from '../../technologies/technology-sidebar/technology-sidebar'
import './agent-listing.scss'
import ContentContainer from '../../../../lib/components/content-container/content-container'
import CardContainer from '../../../../lib/components/card-container/card-container'
import SidebarContainer from '../../../../lib/components/sidebar-container/sidebar-container'
import ControlContainer from '../../../../lib/components/control-container/control-container'
import LinkButton from '../../../../lib/components/link-button/link-button'
import Button from '../../../../lib/components/button/button'

class AgentListing extends Component {
  constructor() {
    super()

    this.state = {
      agentSortType: 'alphabetical',
    }
  }

  async componentDidMount() {
    this.props.refreshAgents()
    this.props.resetTechFilters()
  }

  compileAgentTechnologies = () => {
    const allAgentTechnologies = []

    this.props.agents.forEach(agent => {
      allAgentTechnologies.push(...agent.currentTechnologies)
    })

    return allAgentTechnologies.map(technology => technology._id)
  }

  renderAgents = agents => {
    if (!agents.length) {
      return <h2 className="center tc moon-gray">Sorry, no agents match your criteria!</h2>
    }

    return agents.map(agent => {
      return <AgentPreview agent={agent} key={`${agent._id}`} />
    })
  }

  // headers for export
  exportHeader = [
    { label: 'Name', key: 'name' },
    { label: 'Are they available for mentorship?', key: 'available' },
    { label: 'Position', key: 'position' },
    { label: 'Current Tech', key: 'currentTechnologies' },
    { label: 'Aspirational Tech', key: 'aspirationalTechnologies' },
  ]

  // creating a new array meant for exporting
  exportAgents = agents => {
    return agents.map(agent => {
      let exportAgent = { ...agent }
      exportAgent.name = exportAgent.firstName + ' ' + exportAgent.lastName
      delete exportAgent._id
      delete exportAgent.userId
      delete exportAgent.__v
      delete exportAgent.image
      delete exportAgent.firstName
      delete exportAgent.lastName
      exportAgent.currentTechnologies = exportAgent.currentTechnologies.map(tech => tech.name)
      exportAgent.aspirationalTechnologies = exportAgent.aspirationalTechnologies.map(
        tech => tech.name,
      )
      return exportAgent
    })
  }

  render() {
    return (
      <ContentContainer>
        <SidebarContainer>
          <TechnologySidebar
            history={this.props.history}
            technologies={this.props.technologies}
            activeTechnologies={this.compileAgentTechnologies()}
            techFilters={this.props.techFilters}
            handleTechFilter={techId => this.props.handleTechFilter(techId)}
            parent={'agents'}
            countAgentsWithTech={this.props.countAgentsWithTech}
            agents={this.props.agents}
          />
          <ControlContainer>
            <LinkButton to="/add-agent" color="dark-red">
              Add Agent
            </LinkButton>
            <Button onClick={this.props.toggleAvailableMentors} color="green">
              Toggle Available Mentors
            </Button>
            <CSVLink
              data={this.exportAgents(this.props.agents)}
              headers={this.exportHeader}
              className="helvetica bn f5 b no-underline br-pill ph3 pv2 mb2 ml2 dib white bg-green unselectable"
            >
              Export Agents To CSV
            </CSVLink>
            <select
              className="mb2 ml2 f5 b bn white bg-green"
              name="sort-by"
              onChange={event => this.props.handleSortBy(event.target.value)}
            >
              <option value="alphabetical">alphabetical</option>
              <option value="availability">availability</option>
            </select>
          </ControlContainer>
        </SidebarContainer>
        <CardContainer>{this.renderAgents(this.props.agents)}</CardContainer>
      </ContentContainer>
    )
  }
}

export default AgentListing
