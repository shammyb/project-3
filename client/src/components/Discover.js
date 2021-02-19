import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Discover() {
  const [cities, updateCities] = useState([])

  useEffect(() => {
<<<<<<< HEAD
    axios.get('/api/cityscapes')
      .then(resp => {
        updateCities(resp.data)

      })
=======
    async function getCities() {
      try {
        const { data } = await axios.get('/api/cityscapes')
        updateCities(data)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getCities()
>>>>>>> development
  }, [])


  return <section className="section">
    <div className="container">
      <div className="columns is-multiline is-mobile">
        {cities.map((city, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
            <Link to={`/cityscapes/discover/${city.city}`}>
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{city.city}</p>
                      <p className="subtitle is-6">{'Currency: ' + city.currency}</p>
                      <p className="subtitle is-6">{'language: ' + city.language}</p>
                    </div>
                  </div>
                </div>
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={city.image} alt={city.city} />
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