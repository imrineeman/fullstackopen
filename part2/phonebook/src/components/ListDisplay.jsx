import React from 'react'
import personService from '../services/persons'

const ListDisplay = ({ people, handleDelete }) => {
    const handleDeletionClick = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService.remove(person.id)
                .then(handleDelete(person.id))
        }
        else {
        }

    }

    const displayNames =
        people.map(n => <li key={n.name}>
            {n.name} , {n.number}
            <button
                onClick={() => handleDeletionClick(n)}>
                Delete
            </button>
        </li>
        )
    return <ul>{displayNames}</ul>

}

export default ListDisplay
