import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'


const App = () => {

  const [persons, setPersons] = useState([])

  const handleFormSubmit = childData => {
    if (persons.some(p => p['name'] === childData.name)) {
      if (window.confirm(`Replace ${childData.name}'s number?`)) {
        replacePerson(childData)
      }
    } else {
      personService.create(childData)
        .then(setPersons(persons.concat(childData)))
    }
  }

  const replacePerson = (dupe) => {
    let newState = [...persons]
    const dupePerson = persons.find(p => p['name'] === dupe.name)
    dupePerson.number = dupe.number
    personService.update(dupePerson.id, dupePerson)
      .then(setPersons(newState))
  }


  const handleDelete = (deletedId) => {
    setPersons(persons.filter(
      p => p.id !== deletedId
    ))
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
        handleDelete={handleDelete}
      />
    </div>

  )
}

export default App
