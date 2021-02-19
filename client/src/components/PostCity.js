import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CityForm from './CityForm'


export default function PostCity() {
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

  function handleChange(event) {
    updateFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')

    const newFormData = {
      ...formData
    }

    try {
      const { data } = await axios.post('/api/cityscapes', newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data._id)
      history.push(`/cityscapes/${data._id}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  // ! Our form is now a shared component!
  return <CityForm
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    formData={formData}
  />
}