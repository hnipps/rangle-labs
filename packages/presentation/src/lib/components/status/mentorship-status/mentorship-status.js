import constants from '../../../../application/constants'
import Status from '../status'

class MentorshipStatus extends Status {
  determineColor = () => {
    switch (this.props.status) {
      case 'Active':
        this.color = constants.colors.activeColor
        break
      case 'Hiatus':
        this.color = constants.colors.hiatusColor
        break
      default:
        this.color = constants.colors.haitusColor
    }
  }
}

export default MentorshipStatus
