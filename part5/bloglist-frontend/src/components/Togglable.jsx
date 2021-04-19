import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {

  Togglable.displayName = 'Togglable'
  const [vis, setVis] = useState(false)
  const hideWhenVisible = { display: vis ? 'none' : '' }
  const showWhenVisible = { display: vis ? '' : 'none' }

  const toggleVis = () => {
    setVis(!vis)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVis
    }
  })

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVis}>{props.buttonLable}</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVis}>Cancel</button>
        {props.children}
      </div>
    </div>
  )
})

export default Togglable
