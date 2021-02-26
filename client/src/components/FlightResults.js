import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function FlightResults({ location }) {

  const flightData = location.state.flightData

  const [results, updateResults] = useState([])

  useEffect(() => {
    axios.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${flightData.country}/${flightData.currency}/${flightData.locale}/${flightData.originplace}/${flightData.destinationplace}/${flightData.outboundpartialdate}`
      , {
        headers: {
          'x-rapidapi-key': process.env.apiKey
        }
      })
      .then(({ data }) => {

        updateResults(data)
      })
  }, [])

  if (!results.Carriers) {
    return null
  }

  return <section className="section" id="flight-result-card">
    <div className="container" id="flight-result-container">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2553&q=80" alt={flightData.originplace} />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <p className="title is-5">Best Price: {results.Currencies[0].Symbol}{results.Quotes[0].MinPrice}</p>
            <p className="title is-5">Carrier: {results.Carriers[0].Name}</p>
            <a href="https://www.skyscanner.net/">Check out more flight options here</a>
          </div>
        </div>
      </div>
    </div>
    <div>
    </div>
    <div>

      <section className="hero is-small" id="flights-divider">
        <div className="hero-body" id="flights-divider-body">
          <p className="subtitle" id="flights-subtitle">
            Browse more cities below...
          </p>
        </div>
      </section>

      <div className="columns is-centered" id="columns-flex">
        <div className="column is-one-quarter">
          <Link to={'/project-3/cityscapes/discover/Madrid'}>
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">Madrid</p>
                  </div>
                </div>
              </div>
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src='https://www.travelanddestinations.com/wp-content/uploads/2019/06/Madrid-cityscape.jpg' alt='Madrid' />
                </figure>
              </div>
            </div>
          </Link>
        </div>
        <div className="column is-one-quarter">
          <Link to={'/project-3/cityscapes/discover/Amsterdam'}>
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">Amsterdam</p>
                  </div>
                </div>
              </div>
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src='https://i1.wp.com/dutchsfcommunity.org/wp-content/uploads/2019/03/Amsterdam-Canals.jpg?fit=2048%2C1536&ssl=1' alt='Amsterdam' />
                </figure>
              </div>
            </div>
          </Link>
        </div>
        <div className="column is-one-quarter">
          <Link to={'/project-3/cityscapes/discover/Paris'}>
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">Paris</p>
                  </div>
                </div>
              </div>
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1200px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg' alt='Paris' />
                </figure>
              </div>
            </div>
          </Link>
        </div>
      </div>

    </div>
  </section>
}
