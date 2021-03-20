import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'


const App = () => {

  const [persons, setPersons] = useState([])

  const handleFormSubmit = childData => {
    if (persons.some(p => p['name'] === childData.name)) {
      window.alert(`${childData.name} is already included`)
    } else {
      setPersons(persons.concat(childData))

    }
  }

  useEffect(() => {
    personService.get()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

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
