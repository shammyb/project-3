import React from 'react'



// import Select from 'react-select'

const inputFields = ['city', 'about', 'country', 'currency', 'continent', 'language', 'image', 'long', 'lat']


export default function CityForm({ formData, handleSubmit, handleChange }) {
  console.log(formData)
  return <div className="section">
    <div className="container">
      <form onSubmit={handleSubmit}>
        {inputFields.map(field => {
          console.log(formData[field])
          return <div key={field} className="field">
            <label className="label">
              {field[0].toUpperCase() + field.slice(1)}
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={formData[field]}
                onChange={handleChange}
                name={field}
              />
            </div>
          </div>
        })}
        <button className="button mt-5 is-success">Submit</button>
      </form>
    </div>
  </div>
}