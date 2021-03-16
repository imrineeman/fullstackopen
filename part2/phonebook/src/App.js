import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const handleFormSubmit = childData => {
    if (persons.some(p => p['name'] === childData.name)) {
      window.alert(`${childData.name} is already included`)
    } else {
      setPersons(persons.concat(childData))

    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        parentCallback={handleFormSubmit}
      />
      <h2>Numbers</h2>
      <Filter
        people={persons}
      />
    </div>

  )
}

export default App