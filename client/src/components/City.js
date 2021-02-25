import React, { useState, useEffect } from 'react'
import Restaurants from './Restaurants.js'
import ThingsToDo from './ThingsToDo.js'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import Weather from './Weather.js'
import CommentsAllTogether from './Experiences.js'

export default function City({ match }) {
  const [buttonNum, updateButtonNum] = useState(1)
  const city = match.params.city
  const token = localStorage.getItem('token')



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


  async function handleDelete() {
    await axios.delete(`/api/cityscapes/${city}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/cityscapes')
  }



  function DisplayInfo() {


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
          {<div>< Weather city={city} /></div>}
        </div>
      </div>
    </div>

  }


  if (!cities.user) {
    return null
  }

  return <section className="section">
    <div className="container">
      <div className="cities">

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


        </section>
      </div >
    </div>
  </section>
}