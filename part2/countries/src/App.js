import React, { useState, useEffect } from 'react'
import apiService from './services/Countries'
import Output from './components/Output'

function App() {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ showSelected, setShowSelected ] = useState(false)
  const [ selected, setSelected ] = useState(null)
  const [ weather, setWeather] = useState(null)
  
  useEffect(() => {
    apiService
      .getAll()
      .then(returnedCountries => {
        setCountries(returnedCountries)
      })
    apiService
      .getWeather('Helsinki')
      .then(returnedWeather => {
        setWeather(returnedWeather)
      })
  }, [])

  const countriesToShow = countries.filter(country => country.name.common.toUpperCase().includes(search.toUpperCase()))
  
  const handleSearchChange = (event) => {
    //console.log(event.target.value)
    setSearch(event.target.value)
    setShowSelected(false)
  }

  const showDetails = (country) => {
    setShowSelected(true)
    setSelected(country)
  }

  const showWeather = (country) => {
    apiService
      .getWeather(country.capital[0])
      .then(returnedWeather => {
        setWeather(returnedWeather)
        //console.log(returnedWeather.current.temp_c)
      })
  }

  const detailButton = (country) => {
    showDetails(country)
    showWeather(country)
  }

  return (
    <div>
      find countries
      <input value={search} onChange={handleSearchChange}/>
      <Output 
        countries={countriesToShow}
        showDetails={detailButton}
        selected={selected}
        showSelected={showSelected}
        weather={weather}
        />
    </div>
  )
}

export default App;
