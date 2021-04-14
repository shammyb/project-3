# project-3
## Overview
I worked in a team with three peers, whereby I took the lead on creating a travel website and had a week to do so. This project allowed users to find a destination and attractions in that city, whilst being able to seamlessly book their travel and accommodation. To do this we created a whiteboard and displayed all the pages we wanted to create for it. We then wrote down everything needed on the backend needed to make that possible. Once we completed that step we started working on the backend where I shared my screen and we worked together on all aspects of it. We then tested it via insomnia and once we could get all the endpoints working in the controller and we could seed correctly we worked on individual aspects on the front end. We worked separately on the front end while lending each other a hand when needed. I worked on the comments functionality and creating a new city while the others were working with foreign APIs to add extra features onto our project. We had our MVP finished within five days and had the extra two to add new features like a corona virus map and using foursquare to give suggestions to the city for the user. Overall i am very happy with this project but i would like to continue working on it to add some stretch goal features such as user profiles, a gallery where one could upload their own pictures for the city and a like button for comments.

check it out here: https://cityscapes1.herokuapp.com/

## The Brief
* Build a full-stack application by making your own backend and your own front-end

* Use an Express API to serve your data from a Mongo database

* Consume your API with a separate front-end built with React

* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models

* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut

* Have a visually impressive design

* Be deployed online so it's publicly accessible

## Tech Used:

HTML5
CSS3
ES6
Git
Github
React.js
Node.js
Express
Mongoose
MongoDB
Bulma
Axios
Nodemon
SASS/SCSS
Bcrypt
jsonwebtoken
React Mapbox GL
Mocha
Chai
### The backend:
We built the backend using Javascript, MongoDB and Mongoose.
## Controllers

We created three controllers. A City controller, a User controller and a comment controller too. These enabled us to post put get and delete the relevant information so that users could smoothly interact with the fully stacked app on the front end. A lot of functions on the front end required a user to be logged in. We used jsonwebtoken to authenticate users as can be seen below:
```Javascript
async function login(req, res, next) {
  const password = req.body.password
  try {
  
    const user = await User.findOne({ email: req.body.email })

    console.log('logged in user')
    console.log(user)
  
    if (!user || !user.validatePassword(password)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    console.log('user has validated')
   

    const token = jwt.sign(
      { userId: user._id }, 
      secret, 
      { expiresIn: '12h' } 
    )
  

  
    res.status(202).send({ token, message: 'Login successful!' })

  } catch (err) {
    next(err)
  }
}

```

## Models:
Our backend contained two models. The first is the city model and the second being the user model. 

Our City Schema had an nested comment schema within. This is because we wanted to allow users to be able to share their experiences about a specific city.

Our User Schema included password encryption, validation and confirmation (using Mongoose and bcrypt libraries to support this):

## City
```Javascript
const commentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comment: { type: String, required: true },
  image: { type: String },

  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, { 
  timestamps: true
})



const citySchema = new mongoose.Schema({
  city: { type: String, required: true },
  about: { type: String },
  country: { type: String },
  currency: { type: String },
  continent: { type: String },
  language: { type: String },
  image: { type: String, required: true },
  long: { type: String },
  lat: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ]
  
})

citySchema.plugin(uniqueValidator)

```

## User
```Javascript
const schema = new mongoose.Schema({
 
  username: { type: String, required: [true, 'Username is required'], unique: true },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  password: { type: String, required: [true, 'Password is required'] },
  isAdmin: { type: Boolean }
  
})

schema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

schema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

schema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

schema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && (this.password !== this._passwordConfirmation)) {
      this.invalidate('passwordConfirmation', 'This must match your password')
    }
    next()
  })

schema.plugin(uniqueValidator)
schema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true } }))
```
## The Front-End
The front end of this project was built with react. This took the majority of our project time as there were a lot of features that we wanted to implement. I worked on the comments feature, the discover page, the individual city page and the covid map. I also helped out across the project killing bugs and solving problems my team mates ran into, which on occasion required me to make adjustments to the backend.

## Individual City page:

One of the biggest wins for me was how we displayed the info for the individual city. There were four categories per city. About, which contained a brief overview of the city and the current weather. Things to do, which gave you the most popular attractions in the city. Restaurants, which gave you suggestions on where to eat. Experiences which was a comments section.

For the sake of UI we decided to create a mini nav bar on each city page with would toggle the information displayed. I took charge of this and created the code below using useState to do so:
```Javascript 
<nav className="breadcrumb is-medium" aria-label="breadcrumbs">
  <ul>
    <li>
      <button onClick={() => updateButtonNum(1)} className="button is-info is-light" id="citybuttons">
        About
      </button>
    </li>
    <li>
      <button onClick={() => updateButtonNum(2)} className="button is-info is-light" id="citybuttons">
        Things to do
      </button>
    </li>
    <li>
      <button onClick={() => updateButtonNum(3)} className="button is-info is-light" id="citybuttons">
        Restaurants
      </button>
    </li>
    <li>
      <button onClick={() => updateButtonNum(4)} className="button is-info is-light" id="citybuttons">
        Experiences
      </button>
    </li>
  </ul>
</nav> -->

<!-- {buttonNum === 1 && <div className="box"><DisplayInfo /></div>}
{buttonNum === 3 && <div className="box"><Restaurants city={city} /></div>}
{buttonNum === 2 && <div className="box"><ThingsToDo city={city} /></div>}
{buttonNum === 4 && <div className="box"><CommentsAllTogether city={city} /></div>}
```
## Creating a new city
We wanted users to have the opportunity to add some of the cities they've been to we created a card on the discover page where users can click on and it will take them to a new page with a form to fill in all the information they can about the city. This used an axios post on submit to request to interact with the backend to input the new information on it and display it on the front end. 
```Javascript 
import React, { useState } from 'react'
import axios from 'axios'
import CityForm from './CityForm'


export default function PostCity({ history }) {
  

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
    try {
      const { data } = await axios.post('/api/cityscapes', formData, {
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
```
## Wins
* We created a perfectly functioning backend which successfully interacted with our front end

* We managed to do out MVP and some of our stretch goals

## Challenges 
* As this was my first full stack app, successfully making the backend was the most challenging part of this project

* The biggest challenge for me was getting the city page display to change without rerouting to another page when the user clicks on the pages nav bar 

## Conclusions

Overall I am delighted with the results of this project as it was our first fullstack app. The main feature i feel that this is missing is a photo upload feature where users will be able to upload their own pictures and a gallery on each individual city page to view all the pictures relating to that city.
