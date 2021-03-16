import React, { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const nameObject = {
      name: newName,
    }
    setPersons(persons.concat(nameObject))
  }

  const handleChange = e => {
    setNewName(e.target.value)
  }

  const displayNames = persons.map(
    n => <li key={n.name}
    >{n.name}</li>
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:
          <input
            value={newName}
            onChange={handleChange}
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