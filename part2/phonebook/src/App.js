import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'



const App = () => {

  const [persons, setPersons] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)

  const handleFormSubmit = childData => {
    if (persons.some(p => p['name'] === childData.name)) {
      if (window.confirm(`Replace ${childData.name}'s number?`)) {
        replacePerson(childData)
      }
    } else {
      personService.create(childData)
        .then(res => res.data)
        .then(data => {
          setPersons(persons.concat(data))
          showSuccessMsg('Successfuly added', data)
        })
        .catch(err => {
          showSuccessMsg('Validation error', err)
          console.log(err.message)
        })
    }
  }

  const showSuccessMsg = (msg, data) => {
    setSuccessMessage(`${msg} ${data.name}`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 2000)

  }

  const replacePerson = (dupe) => {
    let newState = [...persons]
    const dupePerson = persons.find(p => p['name'] === dupe.name)
    dupePerson.number = dupe.number
    personService.update(dupePerson.id, dupePerson)
      .then(setPersons(newState))
      .then(showSuccessMsg('updated', dupePerson))
      .catch(err => {
        showSuccessMsg('Already deleted', dupePerson)
        const newArr = persons.filter(n => n.name !== dupePerson.name)
        setPersons(newArr)
      })
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
      <Notification
        message={successMessage}
      />
    </div>

  )
}

export default App
