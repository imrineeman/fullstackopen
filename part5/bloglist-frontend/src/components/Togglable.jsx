import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {

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
