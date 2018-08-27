import React, { Component } from 'react';

class CenterContentWrapper extends Component {
  render() {
    return (
      <div className="helvetica tc">
        <form className="ph4 pb4 black-80">
          { this.props.children }
        </form>
      </div>
    );
  }
}

export default CenterContentWrapper;
