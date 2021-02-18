import express from 'express'
import city from '../controllers/city.js'
import user from '../controllers/user.js'
import comment from '../controllers/comment.js'








const router = express.Router()


router.route('/cityscapes')
  .get(city.getCity)
  .post(city.makeCity)



router.route('/cityscapes/:id')
  .get(city.getSingleCity)
  .put(city.updateCity)
  .delete(city.removeCity)


router.route('/register')
  .post(user.register)

router.route('/login')
  .post(user.login)


router.route('cityscapes/:cityid/comment')
  .post(comment.makeComment)

router.route('cityscapes/:cityid/comment/:commentId')
  .put(comment.updateComment)
  .delete(comment.removeComment)

export default router