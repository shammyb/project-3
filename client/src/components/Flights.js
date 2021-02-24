import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
export default function Flights() {
  const [loading, updateLoading] = useState(true)
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
    const { name, value } = event.target
    updateFlightData({ ...flightData, [event.target.name]: event.target.value })
  }
  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${flightData.country}/${flightData.currency}/${flightData.locale}/${flightData.originplace}/${flightData.destinationplace}/${flightData.outboundpartialdate}`, formData)
      if (localStorage) {
        localStorage.setItem('token', data.token)
        updateFlightData(data)
      }
    } catch (err) {
      console.log(err.response.data)
    }
    updateLoading(false)
  }
  // if (loading) {
  //   return <ClipLoader loading={loading} size={100} />
  // }
  console.log(flightData)
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
              id=""
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
      <button className="button">Submit</button>
    </form>
  </section>
}
