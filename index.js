import express from 'express'
import router from './views/router.js'
import logger from './middleware/logger.js'
import connectToDb from './lib/connectToDb.js'
import errorHandler from './middleware/errorHandler.js'


const app = express()


async function startServer() {

  await connectToDb()

  console.log(' 🏙  Welcome to Cityscape You are now connected to mongo!')

  app.use(express.json())

  app.use(logger)

  app.use('/api',router)

  app.use(errorHandler)

  app.listen(8000, () => console.log(' 🏙  Up and running on port 8000'))










}

startServer()

export default app