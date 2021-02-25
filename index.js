import express from 'express'
import router from './views/router.js'
import logger from './middleware/logger.js'
import connectToDb from './lib/connectToDb.js'
import errorHandler from './middleware/errorHandler.js'
// import { secret } from  './config/environment.js'


import dotenv from 'dotenv'
dotenv.config()
const app = express()
// const favicon = require('serve-favicon')
// var path = require('path')


async function startServer() {

  await connectToDb()

  console.log(' 🏙  Welcome to Cityscapes You are now connected to mongo!')
  
  // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

  app.use(express.json())

  app.use(logger)

  app.use('/api',router)

  app.use(errorHandler)

  app.listen(8000, () => console.log(' 🏙  Up and running on port 8000'))










}

startServer()

export default app