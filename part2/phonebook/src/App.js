import React, { useState, useEffect } from 'react'
import Output from './components/Output'
import Addperson from './components/Addperson'
import Search from './components/Search'
import peopleService from './services/people'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    peopleService
      .getAll()
      .then(returnedPeople => {
        setPersons(returnedPeople)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name===newName)){
      //window.alert(`${newName} is already in the phonebook`)
      //return
      if (window.confirm(`Do you want to update the number for ${newName}`)){
        updateNumber(persons.find(person=>person.name===newName).id)
        return
      }else{
        window.alert(`${newName} is already in the phonebook`)
        return
      }
    }
    const personObject = {
      name: newName,
      number: newNumber,
    }
    
    peopleService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setMessage(
        `${personObject.name} added successfully!`
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    })
    .catch(error => {
      setMessage(`${error.response.data.error}`)
      console.log(error.response.data)
    })
  }

  const peopleToShow = persons.filter(person => person.name.toUpperCase().includes(newSearch.toUpperCase())) 
 
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const deletePerson = (id) => {
    if (window.confirm(`Do you want to delete ${persons.find(person=>person.id===id).name}?`)){
      peopleService
        .deletePerson(id)
        //.then(response => {
      setPersons(persons.filter(person => person.id !== id))
        //})
    }
  }

  const updateNumber = (id) => {
    const note = persons.find(n => n.id === id)
    const changedPerson = { ...note, number: newNumber }
    peopleService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setMessage(
          `Number updated for ${note.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      .catch(error => {
        if(JSON.stringify(error.response.data).includes('shorter')){
          setMessage(`${error.response.data.error}`)
          console.log(error.response.data)
        }else{
        setMessage(
          `${note.name} was already deleted from the server`
        )
        setPersons(persons.filter(n => n.id !== id))
        }
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Search newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h3>Add new</h3>
      <Addperson
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Output people={peopleToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App