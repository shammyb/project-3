import City from '../models/city.js'

async function getCity(req, res, next) {
  try {
    const cityList = await City.find()
      .populate('user')
      .populate('comments.user')
    res.send(cityList)
  } catch (err) {
    next(err)
  }
}


async function searchCity(req, res, next) {
  try {
    const cityList = await City.find( { name: { $regex: req.params.name, $options: 'i' } } )
      .populate('user')
      .populate('comments.user')
    res.send(cityList)
  } catch (err) {
    next(err)
  }
}

async function makeCity(req, res, next) {
  const body = req.body
 
  body.user = req.currentUser
  try {
    const newCity = await City.create(body)
    res.status(201).send(newCity)
  } catch (err) {
    next(err)
  }
}

async function getSingleCity(req, res, next) {
  const id = req.params.id

  try {
    const city = await City.findById(id).populate('user').populate('comments.user')
    res.send(city)
  } catch (err) {
    next(err)
  }
}

async function removeCity(req, res, next) {
  const id = req.params.id
  const currentUser = req.currentUser

  try {

    const cityToRemove = await City.findById(id).populate('user').populate('comments.user')

    if (!currentUser.isAdmin && !currentUser._id.equals(cityToRemove.user)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    await cityToRemove.deleteOne()

    res.send(cityToRemove)
  } catch (err) {
    next(err)
  }
}

async function updateCity(req, res, next) {
  const id = req.params.id
  const currentUser = req.currentUser
  const body = req.body

  try {
    const cityToUpdate = await City.findById(id)
    
    if (!cityToUpdate) {
      return res.send({ message: 'No pokemon found' })
    }

    
    
    if (!currentUser.isAdmin && !currentUser._id.equals(cityToUpdate.user)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    
    cityToUpdate.set(body)
    
    cityToUpdate.save()

    res.send(cityToUpdate)

  } catch (err) {
    next()
  }
}

export default {
  getCity,
  searchCity,
  makeCity,
  getSingleCity,
  removeCity,
  updateCity
}