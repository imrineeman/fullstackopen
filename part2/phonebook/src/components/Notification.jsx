import React from 'react'

const Notification = ({ message }) => {

    const messageStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 20,
        backgroundColor: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        maxWidth: 300,
    }

    if (message === null) {
        return null
    } else {

        return (
            <div
                className='success'
                style={messageStyle}
            >
                {message}
            </div>
        )

    }
}

export default Notification
