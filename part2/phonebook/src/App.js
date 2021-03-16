import React, { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


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

  const handleFilterChange = e => {
    setFilter(e.target.value)
  }

  const peopleToShow =
    persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))


  const displayNames = peopleToShow.map(
    n => <li key={n.name}
    >{n.name} , {n.number}</li>
  )


  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          search:
          <input
            value={filter}
            onChange={handleFilterChange}
          />
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
      <h2>Numbers</h2>
      <ul>{displayNames}</ul>
    </div>

  )
}

export default App