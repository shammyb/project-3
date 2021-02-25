import React, { useState, useEffect } from 'react'
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
            <select
              className="input"
              type="text"
              value={flightData.country}
              onChange={handleChange}
              name={'country'}
            >
              <option>--Please choose an option--</option>
              <option>UK</option>
              <option>ES</option>
              <option>IT</option>
              <option>NL</option>
              <option>DE</option>
              <option>DK</option>
              <option>FR</option>
              <option>GR</option>
              <option>CZ</option>
              <option>PT</option>
              <option>NO</option>
              <option>SE</option>
              <option>TR</option>
              <option>HU-BU</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label className="label">Currency</label>
          <div className="control">
            <select
              className="input"
              type="text"
              value={flightData.currency}
              onChange={handleChange}
              name={'currency'}
            >
              <option>--Please choose an option--</option>
              <option>GBP</option>
              <option>EUR</option>
            </select>
          </div>
          <div className="field">
            <label className="label">Locale</label>
            <div className="control">
              <select
                className="input"
                type="text"
                value={flightData.locale}
                onChange={handleChange}
                name={'locale'}
              >
                <option>--Please choose an option--</option>
                <option>en-UK</option>
                <option>es</option>
                <option>it</option>
                <option>nl</option>
                <option>de</option>
                <option>dk</option>
                <option>fr</option>
                <option>gr</option>
                <option>cz</option>
                <option>pt</option>
                <option>no</option>
                <option>se</option>
                <option>tr</option>
                <option>HU-BU</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label className="label">Origin</label>
            <div className="control">
              <select
                className="input"
                type="text"
                value={flightData.originplace}
                onChange={handleChange}
                name={'originplace'}
              >
                <option>--Please choose an option--</option>
                <option>LHR</option>
                <option>MAD</option>
                <option>FCO</option>
                <option>AMS</option>
                <option>SXF</option>
                <option>CPH</option>
                <option>BCN</option>
                <option>CDG</option>
                <option>PRG</option>
                <option>LIS</option>
                <option>OSL</option>
                <option>ATH</option>
                <option>ARN</option>
                <option>IST</option>
                <option>BUD</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label className="label">Destination</label>
            <div className="control">
              <select
                className="input"
                type="text"
                value={flightData.destinationplace}
                onChange={handleChange}
                name={'destinationplace'}
              >
                <option>--Please choose an option--</option>
                <option>LHR</option>
                <option>MAD</option>
                <option>FCO</option>
                <option>AMS</option>
                <option>SXF</option>
                <option>CPH</option>
                <option>BCN</option>
                <option>CDG</option>
                <option>PRG</option>
                <option>LIS</option>
                <option>OSL</option>
                <option>ATH</option>
                <option>ARN</option>
                <option>IST</option>
                <option>BUD</option>
              </select>
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
