import React, { Component } from 'react';

class FormWrapper extends Component {
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

export default FormWrapper;
