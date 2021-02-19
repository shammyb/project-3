import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CityForm from './CityForm'

export default function UpdateCity({ history, match }) {
  const cityId = match.params.cityId

  const [formData, updateFormData] = useState({
    city: '',
    about: '',
    country: '',
    currency: '',
    continent: '',
    language: '',
    image: '',
    long: '',
    lat: ''
  })

  useEffect(() => {
    axios.get(`/api/cityscapes/${cityId}`)
      .then(({ data }) => {

        updateFormData(data)
      })
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')

    const newFormData = {
      ...formData
    }
    try {
      const { data } = await axios.put(`/api/cityscapes/${cityId}`, newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data._id)
      history.push(`/cityscapes/${data._id}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return <CityForm
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    formData={formData}
  />
}