import { useState, useEffect, Button } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

const Notification = ({message}) => {
  if (message == null) return null
  return (
    <div className='notification'>
        {message}
    </div>
  )
}

const ErrorNotification = ({message}) => {
  if (message == null) return null
  return (
    <div className='errorNotification'>
        {message}
    </div>
  )
}

const SearchFilter = ({filterVal, setNewFilter}) => (
  <div>
    filter shown with <input value={filterVal} onChange={e => setNewFilter(e.target.value)}/>
  </div>
)

const PersonForm = ({actionAdd, name, setName, number, setNumber}) => (
  <form onSubmit={actionAdd}>
    <div>
      name: <input value={name} onChange={e => setName(e.target.value)}/>
    </div>
    <div>
      number: <input value={number} onChange={e => setNumber(e.target.value)}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({persons, filterWord, setter}) => {
  const newPersons = persons.filter(p => p.name.toUpperCase().startsWith(filterWord.toUpperCase()))

  return (newPersons.map((person, i) => {
    return (
    <div key={i}>
      {person.name} {person.number}
      &nbsp;
      <button onClick={() => personService.deleteElement(persons, i, setter)}>delete</button>
    </div>
    )
  }))
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterParam, setFilterParam] = useState('')
  const [message, setMessage] = useState()
  const [errorMessage, setErrorMessage] = useState()

  const addName = (event) => {
    event.preventDefault()
    if (persons.filter(p => p.name === newName && p.number === newNumber).length != 0) {
      alert(`${newName} is already added to phonebook`)
    } else if (persons.filter(p => p.name === newName && p.number !== newNumber).length != 0) {
        if (window.confirm(`${newName} is already added to phonebook. Replace the old number with new one?`)) {
          const personToBeUpdated = persons.find(p => p.name === newName)
          personService
            .update(personToBeUpdated, newNumber)
            .then(data => {
              const newPersons = persons.map(p => p.id !== personToBeUpdated.id ? p : data)              
              setPersons(newPersons)
              setNewName('')
              setNewNumber('')              
              setMessage(`Number of ${personToBeUpdated.name} was updated`)
              setTimeout(() => {
                setMessage(null)
              }, 3000)
            })
            .catch(error => {
              setErrorMessage(`${personToBeUpdated.name} has already been deleted from db`)
              personService
                .getAll()
                .then(data => {
                setPersons(data)
              })
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
            })
        }          
    } else {
      const personObj = {name: newName, number: newNumber}
      personService
        .create(personObj)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
          setMessage(`${personObj.name} was added to the phonebook`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })      
    }
  }

  useEffect(() => {
      personService
        .getAll()
        .then(data => {
          setPersons(persons.concat(data))
        })
    }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <ErrorNotification message={errorMessage} />

      <SearchFilter setNewFilter={setFilterParam} />

      <h2>Add a new</h2>

      <PersonForm actionAdd={addName} name={newName} setName={setNewName} number={newNumber}
                  setNumber={setNewNumber} />

      <h2>Numbers</h2>

      <Persons persons={persons} filterWord={filterParam} setter={setPersons}/>
    </div>
  )
}

export default App