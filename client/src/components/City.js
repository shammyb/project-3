import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { isCreator } from '../lib/auth'
export default function City({ match }) {
  
  

  async function handleDelete() {
    const token = localStorage.getItem('token')
    await axios.delete(`/api/cityscapes/${city}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/cityscapes')
  }


  const city = match.params.city
  const [cities, updateCities] = useState({})
  useEffect(() => {
    async function fetchCityData() {
      try {
        const { data } = await axios.get(`/api/cityscapes/${city}`)
        updateCities(data)


      } catch (err) {
        console.log(err)
      }
    }
    fetchCityData()

  }, [])
  // console.log(cityname)


  // console.log('name:' + id)
  // console.log(match.params)
  console.log(cities)



  const history = useHistory()
  const routeChangeTTD = () => {
    const pathTTD = `/cityscapes/discover/${city}/thingstodo`
    history.push(pathTTD)
  }
  const routeChangeFlights = () => {
    const pathFlights = '/cityscapes/flights'
    history.push(pathFlights)
  }
  const routeChangeRestaurants = () => {
    const pathRestaurants = `/cityscapes/discover/${city}/restaurants`
    history.push(pathRestaurants)
  }
  const routeChangeExperiences = () => {
    const pathExperiences = '/cityscapes/discover/:cityname/experiences'
    history.push(pathExperiences)
  }

  if (!cities.user) {
    return null
  }
  return <div className="cities">

    <section key className="city" >
      <div className="city-image">
        <h1>{cities.city}</h1>
        <img src={cities.image} alt={cities.name} />
        {isCreator(cities.user._id) && <button
        className="button is-danger"
        onClick={handleDelete}
      > Delete City</button>}
      </div>

      <article id="citylayout">

  
   
      <div className="citymenu">
      <div className="search-box">
          <h2>About</h2>
          <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" />
          <button onClick={routeChangeExperiences}>
            Search
          </button>
        </div>
        <div className="search-box">
          <h2>Things to Do</h2>
          <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" />
          <button onClick={routeChangeTTD}>
            Search
          </button>
        </div>
        {/* <div className="search-box">
          <h2>Flights</h2>
          <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" />
          <button onClick={routeChangeFlights}>
            Search
          </button>
        </div> */}
        <div className="search-box">
          <h2>Restaurants</h2>
          <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" />
          <button onClick={routeChangeRestaurants}>
            Search
          </button>
        </div>
        <div className="search-box">
          <h2>Experiences</h2>
          <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" />
          <button onClick={routeChangeExperiences}>
            Search
          </button>
        </div>

        
      </div>
      <div className="name-about-country-currency">
        <p>{cities.about}</p>
        <h3>{cities.country}</h3>
        <h3>{cities.currency}</h3>
        <h3>{cities.continent}</h3>
      </div>
      </article>
    </section>

  </div>
}
