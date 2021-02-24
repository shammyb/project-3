import City from '../models/city.js'

async function postImage(req, res, next) {
  const image = req.body
  try {
    const newImage = await City.create(image)
    res.status(201).send(newImage)
  } catch (err) {
    next(err)
  }
}

async function getImages(req, res, next) {
  try {
    const imageList = await City.find()
    res.send(imageList)
  } catch (err) {
    next(err)
  }
}

export default {
  postImage,
  getImages
}