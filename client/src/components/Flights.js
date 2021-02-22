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
  const [flightResults, updateFlightResults] = useState({

  })
  function handleChange(event) {
    updateFlightData({ ...flightData, [event.target.name]: event.target.value })
  }
  async function handleSubmit(event) {
    event.preventDefault()
    updateFlightData(axiosResp.data)
    try {
      const { data } = await axios.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${country}/${currency}/${locale}/${originplace}/${destinationplace}/${outboundpartialdate}`, formData)
      if (localStorage) {
        localStorage.setItem('token', data.token)
      }
    } catch (err) {
      console.log(err.response.data)
    }
    updateFlightResults(data)
  }
  console.log(flightResults)
  return <section>
    <form onSubmit={handleSubmit}>
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
            type="text"
            value={flightData.currency}
            onChange={handleChange}
            name={'Currency'}
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
              name={'Locale'}
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
              name={'Origin'}
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
              name={'Destination'}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Outbound</label>
          <div className="control">
            <input
              className="input"
              type="date"
              value={flightData.outboundpartialdate}
              onChange={handleChange}
              name={'Outbound'}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Inbound</label>
          <div className="control">
            <input
              className="input"
              type="date"
              value={flightData.inboundpartialdate}
              onChange={handleChange}
              name={'Inbound'}
            />
          </div>
        </div>
      </div>
      <button className="button">Submit</button>
    </form>
  </section>
}