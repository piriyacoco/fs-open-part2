import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([
    {name: 'DUMMY'}
    ])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const [filter, setFilter] = useState('')

  const handleChangeFilter = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const countriesToShow = (filter === '') ?
    countries
    :
    countries.filter(country => country.name.common.toUpperCase().includes(filter.toUpperCase()))

  const limitCountriesToShow = ((countriesToShow.length > 10) || (countriesToShow.length === 1)) ?
    []
    :
    countriesToShow

  return (
    <>
    find countries <input value={filter} onChange={handleChangeFilter} />
    <br/>
    {limitCountriesToShow.map(country => <>{country.name.common}<br/></>)}
    {
      ((countriesToShow.length > 10) && filter !== '') ? 
        <>Too many matches, specify another filter</> 
        : 
        <></>
    }
    {
      (countriesToShow.length === 1) ?
        <>
        <h1>{countriesToShow[0].name.common}</h1>
        capital {countriesToShow[0].capital}
        <br/>
        area {countriesToShow[0].area}
        <h2>languages:</h2>
        <ul>
          {Object.values(countriesToShow[0].languages).map(item => <li>{item}</li>)}
        </ul>
        <img src={countriesToShow[0].flags.png}/>
        </>
        :
        <></>
    }

    </>
    )
}

export default App;

// countriesToShow.map(country => <>{country.name.common}<br/></>)}