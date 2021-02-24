import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Flights() {
  const [flightData, updateFlightData] = useState({
    country: '',
    currency: '',
    locale: '',
    originplace: '',
    destinationplace: '',
    outboundpartialdate: 'yyyy-mm-dd',
    inboundpartialdate: 'yyyy-mm-dd'
  })
  function handleChange(event) {
    updateFlightData({ ...flightData, [event.target.name]: event.target.value })
  }
  console.log(flightData)

  return <section className="section">
    <div className="container">
      <form>
        <div className="field">
          <label className="label">Country</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={flightData.country}
              onChange={handleChange}
              name={'country'}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Currency</label>
          <div className="control">
            <input
              className="input"
              id=""
              type="text"
              value={flightData.currency}
              onChange={handleChange}
              name={'currency'}
            />
          </div>
          <div className="field">
            <label className="label">Locale</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={flightData.locale}
                onChange={handleChange}
                name={'locale'}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Origin</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={flightData.originplace}
                onChange={handleChange}
                name={'originplace'}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Destination</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={flightData.destinationplace}
                onChange={handleChange}
                name={'destinationplace'}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Outbound</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={flightData.outboundpartialdate}
                onChange={handleChange}
                name={'outboundpartialdate'}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Inbound</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={flightData.inboundpartialdate}
                onChange={handleChange}
                name={'inboundpartialdate'}
              />
            </div>
          </div>
        </div>
        <Link className="button"
          to={{
            pathname: '/cityscapes/flights/results',
            state: { flightData }
          }}>
          Search
        </Link>
      </form>
    </div>
  </section>
}
