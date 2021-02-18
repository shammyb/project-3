import City from '../models/cities.js'


async function makeComment(req, res, next) {

  const commentData = req.body
  const cityId = req.params.cityId
  commentData.user = req.currentUser
 
  try {
   
    const city = await City.findById(cityId).populate('comments.user').populate('user')

    // ? guard condition if theres no pokemon
    if (!city) {
      return res.status(404).send({ message: 'Not found' })
    }


    city.comments.push(commentData)

   
    const savedCity = await city.save()

    res.send(savedCity)

  } catch (err) {
    next(err)
  }
}

async function updateComment(req, res, next) {
  const commentData = req.body
  const currentUser = req.currentUser
  const { commentId, cityId } = req.params

  try {
    const city = await City.findById(cityId).populate('user').populate('comments.user')

    if (!city) {
      return res.status(404).send({ message: 'Not found' })
    }

    const comment = city.comments.id(commentId)

   
    if (!comment.user.equals(currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

 
    comment.set(commentData)

  
    const savedCity = await city.save()

    res.send(savedCity)

  } catch (err) {
    next(err)
  }
}

async function removeComment(req, res, next) {
  const currentUser = req.currentUser
  const { commentId, cityId } = req.params

  try {
    
    const city = await City.findById(cityId).populate('user').populate('comments.user')

    if (!city) {
      return res.status(404).send({ message: 'Not found' })
    }

    const comment = city.comments.id(commentId)

    if (!comment.user.equals(currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    comment.remove()

    
    const savedCity = await city.save()

    res.send(savedCity)

  } catch (err) {
    next(err)
  }
}

export default {
  makeComment,
  updateComment,
  removeComment
}