import React from 'react'

const ListDisplay = ({ people }) => {

    const displayNames =
        people.map(n => <li key={n.name}>
            {n.name} , {n.number}</li>
        )
    return <ul>{displayNames}</ul>

}

export default ListDisplay
