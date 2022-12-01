import { useState, useEffect } from 'react'
import axios from 'axios'

import phonebookService from './services/phonebooks'

const Filter = ({filter, handleChangeFilter}) => {
  return (
    <>
    filter shown with <input value={filter} onChange={handleChangeFilter} />
    </>
    )
}

const PersonForm = ({handleSubmit, newName, handleChangeName, newNumber, handleChangeNumber}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleChangeName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({personsToShow, persons, setPersons, setErrorMessage}) => {
  return (
    <>
    {personsToShow.map(person => <>{person.name} {person.number}<button onClick={
      () => 
      phonebookService
        .personDelete(person)
        .then(setPersons(persons.filter(item => item.id !== person.id)))
      }> delete </button><br/></>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  // ...

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [confirmMessage, setConfirmMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')


  const handleChangeName = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    const id = persons.map(person => person.name).includes(newName) ?
      persons.find(person => person.name === newPerson.name).id
      : 
      -1

    {
      persons.map(person => person.name).includes(newName) ?
        phonebookService
          .update(id, newPerson)
          .then(
            setPersons(persons.filter(person => person.name !== newName).concat(newPerson))
            )
          .catch(error => {
            setPersons(persons.filter(person => person.name !== newName))
            setErrorMessage(`Information of ${newPerson.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage('')
            }, 5000)
          })
        :
        //setPersons(persons.concat(newPerson))
        phonebookService
          .create(newPerson)
          .then(
            setPersons(persons.concat(newPerson))
            )
          .then(
            setConfirmMessage(`Added ${newPerson.name}`)
          )
          .then(
            setTimeout(() => {
                setConfirmMessage('')
              }, 5000)
            )
    }
    setNewName('')
    setNewNumber('')
  }

  const handleChangeFilter = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const personsToShow = filter === '' ?
    persons
    :
    persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))


  return (
    <div>
      <h2>Phonebook</h2>

      {confirmMessage !== '' ? <div className='confirm'>{confirmMessage}</div> : null}
      {errorMessage !== '' ? <div className='error'>{errorMessage}</div> : null}
      
      <Filter filter={filter} handleChangeFilter={handleChangeFilter} />
      
      <h3>Add a new</h3>

      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
      />
      
      <h3>Numbers</h3>
      
      <Persons personsToShow={personsToShow} persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage} />
    </div>
  )
}

export default App