import React, { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '050000000'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.some(p => p['name'] === nameObject.name)) {
      window.alert(`${nameObject.name} is already included`)
    } else {
      setPersons(persons.concat(nameObject))

    }

  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  const displayNames = persons.map(
    n => <li key={n.name}
    >{n.name} , {n.number}</li>
  )


  return (
    <div>
      <h2>Phonebook</h2>
      <form>
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
      <h2>Numbers</h2>
      <ul>{displayNames}</ul>
    </div>

  )
}

export default App