import City from '../models/city.js'

async function getComments(req, res, next) {
  const city = req.params.city

  try {
    const cityFind = await City.findOne({ city: city }).populate('user').populate('comments.user')
    res.send(cityFind)
  } catch (err) {
    next(err)
  }
}

async function getSingleComment(req, res, next) {
  const city = req.params.city
  const { commentId } = req.params
  const currentUser = req.currentUser
  
  try {
    const citys = await City.findOne({ city: city }).populate('user').populate('comments.user')
    console.log(citys)
    if (!citys) {
      return res.status(404).send({ message: 'Not found' })
    }
    const comment = citys.comments.id(commentId)
    console.log(comment)
    

    if (!comment.user.equals(currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    res.send(comment)
  } catch (err) {
    next(err)
  }
}





async function makeComment(req, res, next) {

  const commentData = req.body
  const city = req.params.city
  commentData.user = req.currentUser

  try {

    const citys = await City.findOne({ city: city }).populate('comments.user').populate('user')

    // ? guard condition if theres no pokemon
    if (!citys) {
      return res.status(404).send({ message: 'Not found' })
    }


    citys.comments.push(commentData)


    const savedCity = await citys.save()

    res.send(savedCity)

  } catch (err) {
    next(err)
  }
}

async function updateComment(req, res, next) {
  const commentData = req.body
  const currentUser = req.currentUser
  const { commentId } = req.params
  const city = req.params.city

  try {
    const citys = await City.findOne({ city: city }).populate('user').populate('comments.user')

    if (!citys) {
      return res.status(404).send({ message: 'Not found' })
    }

    const comment = citys.comments.id(commentId)


    if (!comment.user.equals(currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }


    comment.set(commentData)


    const savedCity = await citys.save()

    res.send(savedCity)

  } catch (err) {
    next(err)
  }
}

async function removeComment(req, res, next) {
  const currentUser = req.currentUser
  const { commentId } = req.params
  const city = req.params.city

  try {

    const citys = await City.findOne({ city: city }).populate('user').populate('comments.user')

    if (!citys) {
      return res.status(404).send({ message: 'Not found' })
    }

    const comment = citys.comments.id(commentId)

    if (!comment.user.equals(currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    comment.remove()


    const savedCity = await citys.save()

    res.send(savedCity)

  } catch (err) {
    next(err)
  }
}

export default {
  getComments,
  makeComment,
  updateComment,
  removeComment,
  getSingleComment
}