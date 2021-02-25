import { isCreator } from '../lib/auth'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function CommentsAllTogether({ city }) {
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [cities, updateCities] = useState({})
  const token = localStorage.getItem('token')
  const [error, updateError] = useState('')
  const [editNumber, updateEditNumber] = useState(0)
  const [commentIdentifier, updateCommentIdentifier] = useState('')

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
    if (!token) {
      return updateError('Please log in to make a comment!')
    }
    const { data } = await axios.post(`/api/cityscapes/${city}/comment`, { title, comment }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    setTitle('')
    setComment('')
    updateCities(data)

  }


  
  async function handleEditCommentOne(commentId) {
    if (!isCreator) {
      return null
    }
    await axios.get(`/api/cityscapes/${city}/comment/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(resp => {
      setComment(resp.data.comment)
      setTitle(resp.data.title)
      updateEditNumber(1)
      updateCommentIdentifier(commentId)
    })
  }
  async function handleEditCommentTwo() {
    if (!isCreator) {
      return null
    }
    await axios.put(`/api/cityscapes/${city}/comment/${commentIdentifier}`, { title, comment }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateCities(resp.data)
        updateEditNumber(0)
        updateCommentIdentifier('')
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

              onClick={() => handleEditCommentOne(commenting._id)}>Update
            </button>
          </div>}
        </article>
      })
    }

    {(error !== '')}  <div>{error}</div>
    {(error === '') && <article className="media">
      <div className="media-content">
        <div className="field">
          <p className="control">
            <textarea
              className="textarea"
              placeholder="Title of your comment..."
              onChange={event => setTitle(event.target.value)}
              value={title}
            >
              {title}
            </textarea>

            <textarea
              className="textarea"
              placeholder="Make a comment.."
              onChange={event => setComment(event.target.value)}
              value={comment}
            >
              {comment}
            </textarea>
          </p>
        </div>
        <div className="field">
          <p className="control">
            {editNumber === 0 && <button
              onClick={handleComment}
              className="button is-info"
            >
              Submit
            </button>}
            {editNumber === 1 && <button
              onClick={handleEditCommentTwo}
              className="button is-info"
            >
              Update Comment
            </button>}
          </p>
        </div>
      </div>
    </article>}

  </div>


}




