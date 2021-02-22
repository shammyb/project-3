import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CityForm from './CityForm'

export default function UpdateCity({ history, match }) {
  const city = match.params.city

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
    axios.get(`/api/cityscapes/${city}`)
      .then(({ data }) => {

        const mappedFormData = {
          ...data,
          types: data.types.map(type => {
            return { value: type, label: type[0].toUpperCase() + type.slice(1) }
          })
        }
        updateFormData(mappedFormData)
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
      const { data } = await axios.put(`/api/cityscapes/${city}`, newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      history.push(`/cityscapes/discover/${data._id}`)
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