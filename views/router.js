import express from 'express'
import city from '../controllers/city.js'
import user from '../controllers/user.js'
import comment from '../controllers/comment.js'


import secureRoute from '../middleware/secureRoute.js'





const router = express.Router()


router.route('/cityscapes')
  .get(city.getCity)
  .post(secureRoute,city.makeCity)



router.route('/cityscapes/:id')
  .get(city.getSingleCity)
  .put(city.updateCity)
  .delete(city.removeCity)


router.route('/register')
  .post(user.register)

router.route('/login')
  .post(user.login)


router.route('cityscapes/:cityid/comment')
  .post(secureRoute,comment.makeComment)

router.route('cityscapes/:cityid/comment/:commentId')
  .put(secureRoute,comment.updateComment)
  .delete(secureRoute,comment.removeComment)

export default router