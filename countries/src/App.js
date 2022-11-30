import { useState, useEffect } from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const DisplayCountry = ({country}) => {

  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${apiKey}`)
      .then(response => {
        setWeather(response.data)
          } 
        )
  }, [])

  return (
    <>
    {
      weather.main ?
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
          <h1>Weather in {country.capital}</h1>
          temperature {weather.main.temp} Celsius
          <br/>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <br/>
          wind {weather.wind.speed} m/s
        </>
        :
        <></>
    }
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

  return (
    <>
    find countries <input value={filter} onChange={handleChangeFilter} />
    <br/>
    {limitCountriesToShow.map(country => <>{country.name.common}<button onClick={() => setShowCountries(showCountries.concat(country))}>show</button><br/></>)}
    { showCountries.length > 0 ?
        showCountries.map(country => <DisplayCountry country={country} />)
        :
        <></>
    }
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