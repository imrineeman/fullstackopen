import React, { useState } from 'react'
import personService from '../services/persons'


const PersonForm = (props) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = e => {
        setNewName(e.target.value)
    }

    const handleNumberChange = e => {
        setNewNumber(e.target.value)
    }

    const handleSubmit = (e) => {
        const newObj = {
            name: newName,
            number: newNumber
        }
        e.preventDefault()
        props.parentCallback(newObj)
        personService.create(newObj)
    }

    return (
        <form>
            <div>

            </div>
            <div>
                name:
          <input
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                number:
          <input
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button
                    type="submit"
                    onClick={handleSubmit}
                >add</button>
            </div>
        </form>

    )
}

export default PersonForm
