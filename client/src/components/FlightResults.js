import Flights from './Flights.js'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function FlightResults({ location }) {

  const flightData = location.state.flightData

  const [results, updateResults] = useState([])

  

  useEffect(() => {
    axios.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${flightData.country}/${flightData.currency}/${flightData.locale}/${flightData.originplace}/${flightData.destinationplace}/${flightData.outboundpartialdate}`, {
      headers: {
        'x-rapidapi-key': '356f60eae5msh54717ac3911e276p18efd8jsn69d85aa45c72'
      }
    })
      .then(({ data }) => {
        
        updateResults(data)
      })
  }, [])
  
  if (!results.Carriers) {
    return null
  }

  


  return <section className="section">
    <div className="container">
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{flightData.originplace} to {flightData.destinationplace}</p>
            </div>
          </div>
        </div>
        <div className="card-image">
          <figure className="image is-4by3">
            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2553&q=80" alt={flightData.originplace} />
          </figure>
        </div>
        <div className="content">
          <p className="title is-4">Best Price: {results.Currencies[0].Symbol}{results.Quotes[0].MinPrice}</p>
          <p className="title is-4">Carrier: {results.Carriers[0].Name}</p>
          <p className="title is-4">Time: {results.Quotes[0].QuoteDateTime}</p>
          <a href="#">Check out more flights here</a>
        </div>
      </div>
    </div>
  </section>
}