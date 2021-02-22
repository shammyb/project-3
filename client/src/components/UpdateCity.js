import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CityForm from './CityForm'

export default function UpdateCity({ history, match }) {
  const city = match.params.city

  const [loading, updateLoading] = useState(true)

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
    async function getFormData() {
      const { data } = await axios.get(`/api/cityscapes/${city}`)
      
      console.log(data)
      updateFormData(data)
      updateLoading(false)
    }


    getFormData()
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
      const { data } = await axios.put(`/api/cityscapes/${city}`, newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data._id)
      history.push(`/cityscapes/${data.city}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }
  if (loading) {
    return <h1>wagwan</h1>
  }
  return <CityForm
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    formData={formData}
  />
}