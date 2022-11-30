import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayCountry = ({country}) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      capital {country.capital}
      <br/>
      area {country.area}
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map(item => <li>{item}</li>)}
      </ul>
      <img src={country.flags.png}/>
    </>
    )
}

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

  const [showCountries, setShowCountries] = useState([])

  // <DisplayCountry country={country} />

  console.log(showCountries)

  return (
    <>
    find countries <input value={filter} onChange={handleChangeFilter} />
    <br/>
    {limitCountriesToShow.map(country => <>{country.name.common}<button onClick={() => setShowCountries(showCountries.concat(country))}>show</button><br/></>)}
    {showCountries.map(country => <DisplayCountry country={country} />)}
    {
      ((countriesToShow.length > 10) && (filter !== '')) ? 
        <>Too many matches, specify another filter</> 
        : 
        <></>
    }
    {
      ((countriesToShow.length === 1)  && (filter !== '')) ?
        <DisplayCountry country={countriesToShow[0]} />
        :
        <></>
    }

    </>
    )
}

export default App;

// countriesToShow.map(country => <>{country.name.common}<br/></>)}