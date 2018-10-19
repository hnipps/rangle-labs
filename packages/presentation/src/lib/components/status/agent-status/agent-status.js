import constants from '../../../../application/constants'
import Status from '../status'

class AgentStatus extends Status {
  determineColor = () => {
    switch (this.props.status) {
      case 'Unavailable to Mentor':
        this.color = constants.colors.unavailableColor
        break
      case 'Available to Mentor':
        this.color = constants.colors.availableColor
        break
      default:
        this.color = constants.colors.unavailableColor
    }
  }
}

export default AgentStatus
