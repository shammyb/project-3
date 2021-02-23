import React, { useState, useEffect } from 'react'
const token = localStorage.getItem('token')
import axios from 'axios'
import { isCreator } from '../lib/auth'

const [text, setText] = useState('')
const [city, updateCity] = useState({})


function handleComment() {
  // ! Using the comment endpoint, grab the text from our state.
  axios.post(`/api/cityscapes/${city._id}/comment`, { text }, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(resp => {
      // ! Clear my textbox
      setText('')
      // ! Update the comments with my response data
      updateCity(resp.data)
    })
}
function handleEditComment(commentId) {
  if (!isCreator) {
    return null 
  }
  axios.put(`/api/cityscapes/${city._id}/comment/${commentId}`, { text }, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(resp => {
      updateCity(resp.data)
    })
}

function handleDeleteComment(commentId) {
  if (!isCreator) {
    return null 
  }
  axios.delete(`/api/cityscapes/${city._id}/comment/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(resp => {
      updateCity(resp.data)
    })
}