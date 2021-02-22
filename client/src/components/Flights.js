import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
<<<<<<< HEAD
import ClipLoader from 'react-spinners/ClipLoader'
export default function Flights() {
  const [loading, updateLoading] = useState(true)
=======
export default function Flights() {
>>>>>>> a7f918fdaf2e2f18dca75a6c2c79079411b2e085
  const [flightData, updateFlightData] = useState({
    country: '',
    currency: '',
    locale: '',
    originplace: '',
    destinationplace: '',
    outboundpartialdate: 'yyyy-mm-dd',
    inboundpartialdate: 'yyyy-mm-dd'
  })
<<<<<<< HEAD
  function handleChange(event) {
    const { name, value } = event.target
=======
  const [flightResults, updateFlightResults] = useState({

  })
  function handleChange(event) {
>>>>>>> a7f918fdaf2e2f18dca75a6c2c79079411b2e085
    updateFlightData({ ...flightData, [event.target.name]: event.target.value })
  }
  async function handleSubmit(event) {
    event.preventDefault()
<<<<<<< HEAD
    try {
      const { data } = await axios.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${flightData.country}/${flightData.currency}/${flightData.locale}/${flightData.originplace}/${flightData.destinationplace}/${flightData.outboundpartialdate}`, formData)
      if (localStorage) {
        localStorage.setItem('token', data.token)
        updateFlightData(data)
=======
    updateFlightData(axiosResp.data)
    try {
      const { data } = await axios.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${country}/${currency}/${locale}/${originplace}/${destinationplace}/${outboundpartialdate}`, formData)
      if (localStorage) {
        localStorage.setItem('token', data.token)
>>>>>>> a7f918fdaf2e2f18dca75a6c2c79079411b2e085
      }
    } catch (err) {
      console.log(err.response.data)
    }
<<<<<<< HEAD
    updateLoading(false)
  }
  // if (loading) {
  //   return <ClipLoader loading={loading} size={100} />
  // }
  console.log(flightData)
=======
    updateFlightResults(data)
  }
  console.log(flightResults)
>>>>>>> a7f918fdaf2e2f18dca75a6c2c79079411b2e085
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
<<<<<<< HEAD
            name={'currency'}
=======
            name={'Currency'}
>>>>>>> a7f918fdaf2e2f18dca75a6c2c79079411b2e085
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
<<<<<<< HEAD
              name={'locale'}
=======
              name={'Locale'}
>>>>>>> a7f918fdaf2e2f18dca75a6c2c79079411b2e085
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Origin</label>
          <div className="control">
            <input
              className="input"
<<<<<<< HEAD
              id=""
              type="text"
              value={flightData.originplace}
              onChange={handleChange}
              name={'originplace'}
=======
              type="text"
              value={flightData.originplace}
              onChange={handleChange}
              name={'Origin'}
>>>>>>> a7f918fdaf2e2f18dca75a6c2c79079411b2e085
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
<<<<<<< HEAD
              name={'destinationplace'}
=======
              name={'Destination'}
>>>>>>> a7f918fdaf2e2f18dca75a6c2c79079411b2e085
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Outbound</label>
          <div className="control">
            <input
              className="input"
<<<<<<< HEAD
              type="text"
              value={flightData.outboundpartialdate}
              onChange={handleChange}
              name={'outboundpartialdate'}
=======
              type="date"
              value={flightData.outboundpartialdate}
              onChange={handleChange}
              name={'Outbound'}
>>>>>>> a7f918fdaf2e2f18dca75a6c2c79079411b2e085
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Inbound</label>
          <div className="control">
            <input
              className="input"
<<<<<<< HEAD
              type="text"
              value={flightData.inboundpartialdate}
              onChange={handleChange}
              name={'inboundpartialdate'}
=======
              type="date"
              value={flightData.inboundpartialdate}
              onChange={handleChange}
              name={'Inbound'}
>>>>>>> a7f918fdaf2e2f18dca75a6c2c79079411b2e085
            />
          </div>
        </div>
      </div>
      <button className="button">Submit</button>
<<<<<<< HEAD
    </form >
  </section >
=======
    </form>
  </section>
>>>>>>> a7f918fdaf2e2f18dca75a6c2c79079411b2e085
}