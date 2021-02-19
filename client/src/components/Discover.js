import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Discover() {
  const [cities, updateCities] = useState([])

  useEffect(() => {
    axios.get('/api/cityscapes/discover')
      .then(resp => {
        updateCities(resp.data)

      })
  }, [])


  return <section className="section">
    <div className="container">
      <div className="columns is-multiline is-mobile">
        {cities.map((city, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
            <Link to={`/cityscapes/discover/${city.name}`}>
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{city.name}</p>
                      <p className="subtitle is-6">{'Currency: ' + city.currency}</p>
                      <p className="subtitle is-6">{'Langugage: ' + city.langugage}</p>
                    </div>
                  </div>
                </div>
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={city.image} alt={city.name} />
                  </figure>
                </div>
              </div>
            </Link>
          </div>
        })}
      </div>
    </div>
  </section>


}