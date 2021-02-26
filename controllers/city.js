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
  const city = req.params.city
  // const id = req.params.id

  try {
    const cityFind = await City.findOne({ city: city }).populate('user').populate('comments.user')
    res.send(cityFind)
  } catch (err) {
    next(err)
  }
}

async function removeCity(req, res, next) {
  const city = req.params.city
  const currentUser = req.currentUser

  try {

    const cityToRemove = await City.findOne({ city: city })

    if (currentUser.isAdmin || currentUser._id.equals(cityToRemove.user)) {
      console.log('bbbb')
      await cityToRemove.deleteOne()

      res.send(cityToRemove)
    } else {
      
      return res.status(401).send({ message: 'Unauthorized' })
    }

  } catch (err) {
    next(err)
  }
}

async function updateCity(req, res, next) {
  const city = req.params.city
  const currentUser = req.currentUser
  const body = req.body

  try {
    const cityToUpdate = await City.findOne({ city: city })

    if (!cityToUpdate) {
      return res.send({ message: 'No Citys found' })
    }



    if (currentUser.isAdmin || currentUser._id.equals(cityToUpdate.user)) {
      cityToUpdate.set(body)

      cityToUpdate.save()

      res.send(cityToUpdate)

    } else {
      return res.status(401).send({ message: 'Unauthorized' })
    }


  } catch (err) {
    next()
  }
}

export default {
  getCity,
  makeCity,
  getSingleCity,
  removeCity,
  updateCity
}