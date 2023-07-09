import { useState, useEffect, button } from "react";
import axios, { all } from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/"

const View = ({info}) => {
  if (info === null) return null
  return (
    <div>
      <h2>{info.name.common}</h2>
      <div>capital {info.capital[0]}</div>
      <div>area {info.area}</div>
      <p>languages:</p>
      <ul>
        {Object.values(info.languages).map((l, i) => <li key={i}>{l}</li>)}
      </ul>
      <img src={info.flags.png} />
    </div>
  )
}

const Information = ({result}) => {  
  const [countryInfo, setCountryInfo] = useState(null)

  const clickHandle = (id) => {
    requestCountryInfo(result[id])
    .then(data => setCountryInfo(data))
    .catch(error => null)
  }

  const requestCountryInfo = (country) => {
    const request = axios.get(baseUrl + `api/name/${country.toLowerCase()}`)
    const dataPromise = request.then(response => response.data)
    return dataPromise
  }

  if (typeof result === "undefined") return null
  else if (result.length === 0) return <div>Too many matches. Specify another filter</div>
  else if (result.length > 1) {
    return (
      <div>
        {result.map((c, i) => 
          <div key={i}>{c} <button onClick={() => clickHandle(i)}>show</button></div>
        )}       
        <View info={countryInfo} />
      </div>
    )
  }
  else if (result.length === 1) {
    requestCountryInfo(result[0])
    .then(data => setCountryInfo(data))
    .catch(error => null)
    return <View info={countryInfo} />
  }
}

function App() {  
  const [country, setCountry] = useState('')
  const [foundCountries, setFoundCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])

  // get list of all countries
  useEffect(() => {
    axios.get(baseUrl + "api/all")
    .then(response => {
      const allCountriesNew = response.data.map(obj => obj.name.common)
      setAllCountries(allCountriesNew)          
    })
  }, [])

  useEffect(() => {
    const filterResult = allCountries.filter(c => c.toUpperCase().includes(country.toUpperCase()))
    if (filterResult.length > 10) setFoundCountries([])
    else if(filterResult.length < 10 && filterResult.length !== 1) setFoundCountries(filterResult)
    else if (filterResult.length === 1) {
      setFoundCountries(filterResult)
    }   
  }, [country])

  const onSearch = (event) => {
    setCountry(event.target.value)
  }

  if (allCountries.length === 0) {
    return <div>No data has been received</div>
  } else {
    return (
      <div>
        find countries&nbsp;
        <input value={country ?? ''} onChange={onSearch} />
        <Information result={foundCountries} />
      </div>
    )
  }

  
}

export default App;
