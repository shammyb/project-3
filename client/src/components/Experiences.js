import { isCreator } from '../lib/auth'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function CommentsAllTogether({ city }) {
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [cities, updateCities] = useState({})
  const token = localStorage.getItem('token')
  
  useEffect(() => {
    async function fetchCommentData() {
      try {
        const { data } = await axios.get(`/api/cityscapes/${city}/comment`,)
        updateCities(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchCommentData()
  }, [])


  async function handleComment() {
    const { data } = await axios.post(`/api/cityscapes/${city}/comment`, { title, comment }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    setTitle('')
    setComment('')
    console.log(data)
    updateCities(data)

  }
 

  async function handleEditComment(commentId) {
    if (!isCreator) {
      return null
    }
    await axios.put(`/api/cityscapes/${city}/comment/${commentId}`, { title, comment }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateCities(resp.data)
      })
  }


  async function handleDeleteComment(commentId) {
    if (!isCreator) {
      return null
    }
    await axios.delete(`/api/cityscapes/${city}/comment/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log(resp.data)
        updateCities(resp.data)
      })
  }



  return <div>
    {
      cities.comments && cities.comments.map(commenting => {
        return <article key={commenting._id} className="media">
          <div className="media-content">
            <div className="content">
              <p className="subtitle">
                {commenting.user.username}
              </p>
              <p>{commenting.title}</p>
              <p>{commenting.comment}</p>
            </div>
          </div>
          {isCreator(commenting.user._id) && <div className="media-right">
            <button
              className="delete"
              onClick={() => handleDeleteComment(commenting._id)}>
            </button>
          </div>}
          {isCreator(commenting.user._id) && <div className="media-right">
            <button
              className="delete"
              onClick={() => handleEditComment(commenting._id)}>
            </button>
          </div>}
        </article>
      })
    }


    <article className="media">
      <div className="media-content">
        <div className="field">
          <p className="control">
            <textarea
              className="textarea"
              id="title-of-the-post"
              placeholder="Title of your post..."
              onChange={event => setTitle(event.target.value)}
              value={title}
            >
              {title}
            </textarea>
            
            <textarea
              className="textarea"
              placeholder="Share your experience"
              onChange={event => setComment(event.target.value)}
              value={comment}
            >
              {comment}
            </textarea>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button
              onClick={handleComment}
              className="button is-info"
            >
              Submit
            </button>
          </p>
        </div>
      </div>
    </article>
  </div>

}




