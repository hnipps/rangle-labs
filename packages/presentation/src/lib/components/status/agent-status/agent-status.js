import constants from "../../../../application/constants";
import Status from '../status';

class AgentStatus extends Status {

  determineColor = () => {
    switch (this.props.status) {
      case "Staffed to Project":
        this.color = constants.colors.staffedAgentColor;
        break;
      case "Free Agent":
        this.color = constants.colors.freeAgentColor;
        break;
      default:
        this.color = constants.colors.staffedAgentColor;
    }
  }
}

export default AgentStatus;