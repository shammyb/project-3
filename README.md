### project-3
### Overview
I worked in a team with three peers, whereby I took the lead on creating a travel website and had a week to do so. This project allowed users to find a destination and attractions in that city, whilst being able to seamlessly book their travel and accommodation. To do this we created a whiteboard and displayed all the pages we wanted to create for it. We then wrote down everything needed on the backend needed to make that possible. Once we completed that step we started working on the backend where I shared my screen and we worked together on all aspects of it. We then tested it via insomnia and once we could get all the endpoints working in the controller and we could seed correctly we worked on individual aspects on the front end. We worked separately on the front end while lending each other a hand when needed. I worked on the comments functionality and creating a new city while the others were working with foreign APIs to add extra features onto our project. We had our MVP finished within five days and had the extra two to add new features like a coronavirus map and using foursquare to give suggestions to the city for the user. Overall i am very happy with this project but i would like to continue working on it to add some stretch goal features such as user profiles, a gallery where one could upload their own pictures for the city and a like button for comments.

check it out here: https://cityscapes1.herokuapp.com/

### The Breif
# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #3: A MERN Stack App
​
## Overview
​
**You’ve come a long way, and it's time to show it.** This will be your most advanced project to date. It is __IMPORTANT__ to note that when we say _advanced_, the project doesn't necessarily need to have lots more functionality.
​
**Remember:** simple code is stable code, so always favour refactoring and bug fixing over adding more functionality.
​
With this in mind, you need to be smart about how you plan, limit your project scope to be achievable (in terms of functionality) and focus on quality rather than quantity.
​
Make sure you review your project proposal with your instructor so you can make sure it's **something you can accomplish in the limited time we have**. You will have some time after the project to add extra functionality before your Meet & Hire!
​
---
​
## Technical Requirements
​
You must:
​
* Work in a team, using **git to code collaboratively**.
* **Build a full-stack application** by making your own backend and your own front-end
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.
* **Have automated tests** for _at least_ one RESTful resource on the back-end. Improve your employability by demonstrating a good understanding of testing principals.
​
---
​
## Necessary Deliverables
​
* A **working app** hosted on the internet
* A **link to your hosted working app** in the URL section of your Github repo
* A **git repository hosted on Github**, with a link to your hosted project, and frequent commits dating back to the _very beginning_ of the project
* **A `readme.md` file** with:
    * An embedded screenshot of the app
    * Explanations of the **technologies** used
    * A couple paragraphs about the **general approach you took**
    * **Installation instructions** for any dependencies
    * Link to your **user stories/wireframes** – sketches of major views / interfaces in your application
    * Link to your **pitch deck/presentation** – documentation of your wireframes, user stories, and proposed architecture
    * Descriptions of any **unsolved problems** or **major hurdles** you had to overcome
​
---
​
## Suggested Ways to Get Started
​
* **Don’t get too caught up in too many awesome features** – simple is always better. Build something impressive that does one thing well.
* **Design first.** Planning with user stories & wireframes before writing code means you won't get distracted changing your mind – you'll know what to build, and you can spend your time wisely by just building it.
* **Don’t hesitate to write throwaway code** to solve short term problems.
* **Read the docs for whatever technologies / frameworks / API’s you use**.
* **Write your code DRY** and **build your APIs RESTful**.
* **Be consistent with your code style.** You're working in teams, but you're only making one app per team. Make sure it looks like a unified effort.
* **Commit early, commit often.** Don’t be afraid to break something because you can always go back in time to a previous version.
* **Keep user stories small and well-defined**, and remember – user stories focus on what a user needs, not what development tasks need accomplishing.
* **Write code another developer wouldn't have to ask you about**. Do your naming conventions make sense? Would another developer be able to look at your app and understand what everything is?
* **Make it all well-formatted.** Are you indenting, consistently? Can we find the start and end of every div, curly brace, etc?
* **Comment your code.** Will someone understand what is going on in each block or function? Even if it's obvious, explaining the what & why means someone else can pick it up and get it.
* **Write pseudocode before you write actual code.** Thinking through the logic of something helps.
​
---
​
## Project Feedback + Evaluation
​
* __Project Workflow__: Did you complete the user stories, wireframes, task tracking, and/or ERDs, as specified above? Did you use source control as expected for the phase of the program you’re in (detailed above)?
​
* __Technical Requirements__: Did you deliver a project that met all the technical requirements? Given what the class has covered so far, did you build something that was reasonably complex?
​
* __Creativity__: Did you added a personal spin or creative element into your project submission? Did you deliver something of value to the end user (not just a login button and an index page)?
​
* __Code Quality__: Did you follow code style guidance and best practices covered in class, such as spacing, modularity, and semantic naming? Did you comment your code as your instructors as we have in class?
​
* __Problem Solving__: Are you able to defend why you implemented your solution in a certain way? Can you demonstrated that you thought through alternative implementations? _(Note that this part of your feedback evaluation will take place during your one-on-one code review with your instructors, after you've completed the project.)_

### Tech Used:

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

We created three controllers. A City controller, a User controller and a comment controller too. These enabled us to post put get and delete the relevan information so that users could smoothly interact with the fully stacked app on the front end. A lot of functions on the front end required a user to be logged in. We used jsonwebtoken to authenticate users as can be seen below:
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

# City
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

# User
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
### The Front-End
The front end of this project was built with react. This took the majority of our project time as there were a lot of features that we wanted to implement. I worked on the comments feature, the discover page, the individual city page and the covid map. I also helped out accross the project killing bugs and solving problems my team mates ran into, which on occasion required me to make adjustments to the backend.

## Individual City page:

One of the biggest wins for me was how we displayed the info for the individual city. There were four categories per city. About, which contained a breif overview of the city and the current weather. Things to do, which gave you the most popular attractions in the city. Restaurants, which gave you suggestions on where to eat. Experiences which was a comments section.

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
We wanted users to have the opportunity to add some of the cities they've been to we created a card on the discover page where users can click on and it will take them to a new page with a form to fill in all the information they can about the city. This used an axios post on submit to request to intereact with the backend to input the new information on it and display it on the front end. 
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
### Conclusions

Overall I am delighted with the results of this project as it was our first fullstack app. The main feature i feel that this is missing is a photo upload feature where users will be able to upload their own pictures and a gallery on each individual city page to view all the pictures relating to that city.
