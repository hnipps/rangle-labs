import React, { Component } from 'react'
import FormLabel from '../form-label/form-label'

class FormInput extends Component {
  render() {
    return (
      <div className="measure center mb3">
        <FormLabel htmlFor={this.props.name}>{this.props.label}</FormLabel>
        <input
          id={this.props.id}
          name={this.props.name}
          className="input-reset ba b--black-20 pa2 mb2 db br2 w-100"
          type="text"
          aria-describedby={this.props['aria-describedby']}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    )
  }
}

export default FormInput
