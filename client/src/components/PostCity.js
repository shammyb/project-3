import React, { useState } from 'react'
import axios from 'axios'
import CityForm from './CityForm'


export default function PostCity(history) {
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
  console.log(formData)

  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.post('/api/cityscapes/', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data._id)
      console.log(data)
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