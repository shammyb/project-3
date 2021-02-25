import express from 'express'
import city from '../controllers/city.js'
import user from '../controllers/user.js'
import comment from '../controllers/comment.js'


import secureRoute from '../middleware/secureRoute.js'
import images from '../controllers/images.js'






const router = express.Router()


router.route('/cityscapes')
  .get(city.getCity)
  .post(secureRoute, city.makeCity)



router.route('/cityscapes/:city')
  .get(city.getSingleCity)
  .put(secureRoute, city.updateCity)
  .delete(secureRoute, city.removeCity)


router.route('/register')
  .post(user.register)

router.route('/login')
  .post(user.login)


router.route('/cityscapes/:city/comment')
  .get(comment.getComments)
  .post(secureRoute, comment.makeComment)

router.route('/cityscapes/:city/comment/:commentId')
  .get(secureRoute,comment.getSingleComment)
  .put(secureRoute, comment.updateComment)
  .delete(secureRoute, comment.removeComment)

router.route('/image')
  .get(images.getImages)
  .post(images.postImage)

export default router