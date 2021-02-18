// ! This is responsible for all my config variables

import dotenv from 'dotenv'
// ! configure dotenv
dotenv.config()

// ? always start with mongodb://
// ? localhost will use the default port for mongodb
// ? /pokemon-db -> you'd replace this with the name of YOUR database.

// ! Get the environment we are in right now.
// ! NODE_ENV is a string we can change when we run this program, to set the environment
const environment = process.env.NODE_ENV || 'development'

// ! if running in development, dbURI will be
// ? mongodb://localhost/citydb-development
// ! if running in testing, dbURI will be
// ? mongodb://localhost/citydb-testing
export const dbURI = environment === 'production'
  // ! We will configure this variable later to point to Mongo Atlas
  ? process.env.MONGODB_URI
  // ! We'll get this for all non-prod environments:
  : `mongodb://localhost/citydb-${environment}`

export const port = 8000
// ! Replace my secret with a .env variable
export const secret = process.env.SECRET