import React from 'react'

function Button({ value, color, onClick, children }) {
  return (
    <button
      type="button"
      value={value}
      className={`helvetica bn f5 b no-underline br-pill ph3 pv2 mb2 ml2 dib white bg-${color} unselectable`}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export default Button
