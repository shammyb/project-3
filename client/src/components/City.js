import React, { useState, useEffect } from 'react'
import Restaurants from './Restaurants.js'
import ThingsToDo from './ThingsToDo.js'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import { useHistory } from 'react-router-dom'

import ClipLoader from 'react-spinners/ClipLoader'

import CommentsAllTogether from './Experiences.js'

export default function City({ match }) {
  const [buttonNum, updateButtonNum] = useState(1)
  const city = match.params.city
  const token = localStorage.getItem('token')



  const [cities, updateCities] = useState({})

  const [weathers, updateWeathers] = useState({
    main: {},
    weather: []
  })
  const [loading4, updateLoading4] = useState(true)
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


  async function handleDelete() {
    await axios.delete(`/api/cityscapes/${city}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/cityscapes')
  }



  function DisplayInfo() {

    // const [weathers, updateWeathers] = useState({
    //   main: {},
    //   weather: []
    // })
    // const [loading4, updateLoading4] = useState(true)

    // useEffect(() => {
    //   async function fetchWeatherData() {
    //     try {
    //       const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/find?q=London,gb&units=metric&appid=bb9852ea707df495071eb09d564cc4d9`)
    //       updateWeathers(data)
    //       updateLoading4(false)


    //     } catch (err) {
    //       console.log(err)
    //     }
    //   }
    //   fetchWeatherData()
    //   console.log(weathers)

    // }, [])
    // if (loading4) {
    //   return <ClipLoader loadin4={loading4} size={100} />
    // }


    return <div className="about-section">
      <div className="column is-four-fifths-desktop is-centered">


        <div className="card-content">

          <h2 className="title is-2">About the city </h2>
          <p>{cities.about}</p>
          <h5 className="title is-5" id="h5-city">Other information </h5>
          <p><strong>Country: </strong>{cities.country}</p>
          <p><strong>Currency: </strong>{cities.currency}</p>
          <p><strong>Continent: </strong>{cities.continent}</p>



          <h5 className="title is-5" id="h5-city">Current weather</h5>

          {/* <h2 className="title is-2"> {Math.round(weathers.main.temp)}°C</h2>

          <div>Feels like {Math.round(weathers.main.feels_like)} °C. {weathers.weather.main}</div>
          <div>{weathers.weather.icon}</div> */}

        </div>
      </div>
      {/* </div> */}
    </div>
    
  }


  if (!cities.user) {
    return null
  }

  return <div className="cities">
    {/* <h1 className="title is-1" id="main-title">{cities.city}</h1> */}

    <section className="hero is-medium is-primary" >
      <div className="hero-body"
        style={{
          backgroundImage: `url(${cities.image})`

        }}
      >





        <p className="title" id="hero-title">
          {cities.city}
        </p>
        <p className="subtitle">
          {/* Small subtitle */}
        </p>
      </div>
    </section>


    <section key className="city" >
      {/* <article className="image" id="city-image">

        <img src={cities.image} alt={cities.name} />
        {isCreator(cities.user._id) && <button
          className="button is-danger"
          onClick={handleDelete}
        > Delete City</button>}
      </article> */}



      <article id="citylayout">
        <div className="citymenu">




          <nav className="breadcrumb is-medium" aria-label="breadcrumbs">
            <ul>
              <li>
                <button onClick={() => updateButtonNum(1)} className="button is-info is-light" id="citybuttons">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => updateButtonNum(2)} className="button is-info is-light" id="citybuttons">
                  Things to do
                </button>

              </li>
              <li>
                <button onClick={() => updateButtonNum(3)} className="button is-info is-light" id="citybuttons">
                  Restaurants
                </button>

              </li>
              <li>
                {/* <li class="is-active"> */}
                <button onClick={() => updateButtonNum(4)} className="button is-info is-light" id="citybuttons">
                  Experiences
                </button>
              </li>
            </ul>
          </nav>


          {/* <div className="search-box">
            {/* <h2>About</h2>
            <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" /> */}
          {/* <button onClick={() => updateButtonNum(1)} className="button is-info is-light" id="citybuttons">
              About
            </button>
          </div> */}
          {/* <div className="search-box"> */}
          {/* <h2>Things to Do</h2>
            <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" /> */}
          {/* <button onClick={() => updateButtonNum(2)} className="button is-info is-light" id="citybuttons">
              Things to do
            </button>
          </div> */}
          {/* <div className="search-box">
          <h2>Flights</h2>
          <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" />
          <button onClick={routeChangeFlights}>
            Search
          </button>
        </div> */}
          {/* <div className="search-box"> */}
          {/* <h2>Restaurants</h2>
            <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" /> */}
          {/* <button onClick={() => updateButtonNum(3)} className="button is-info is-light" id="citybuttons">
              Restaurants
            </button>
          </div> */}
          {/* <div className="search-box"> */}
          {/* <h2>Experiences</h2>
            <img className="search-image" src="https://cdn.iconscout.com/icon/free/png-512/aeroplane-airplane-plane-air-transportation-vehicle-pessanger-people-emoj-symbol-30708.png" /> */}
          {/* <button onClick={() => updateButtonNum(4)} className="button is-info is-light" id="citybuttons">
              Experiences
            </button>
          </div> */}


        </div>
        <div className="container is-centered">

          <div className="cityContent">

            {buttonNum === 1 && <div className="box"><DisplayInfo /></div>}
            {buttonNum === 3 && <div className="box"><Restaurants city={city} /></div>}
            {buttonNum === 2 && <div className="box"><ThingsToDo city={city} /></div>}
            {buttonNum === 4 && <div className="box"><CommentsAllTogether city={city} /></div>}


            {isCreator(cities.user._id) && <button
              className="button is-danger"
              onClick={handleDelete}
            > Delete City</button>}
          </div>
        </div>
      </article>

    </section>
  </div >
}