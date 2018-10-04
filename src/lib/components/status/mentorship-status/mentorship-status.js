import constants from "../../../../application/constants";
import Status from '../status';

class MentorshipStatus extends Status {

  determineColor = () => {
    switch (this.props.status) {
      case "Active":
        this.color = constants.colors.activeColor;
        break;
      case "Hiatus":
        this.color = constants.colors.hiatusColor;
        break;
      case "Backlog":
        this.color = constants.colors.backlogColor;
        break;
      default:
        this.color = constants.colors.backlogColor;
    }
  }
}

export default MentorshipStatus;