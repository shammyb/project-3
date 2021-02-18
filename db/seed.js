// ! Mongoose and ability to connect to mongodb
import mongoose from 'mongoose'
import connectToDb from '../lib/connectToDb.js'
// ! Models to use to post to mongo db
import City from '../models/city.js'
import User from '../models/user.js'
// ! Data to seed
import getCityData from './data/cityData.js'
import getUserData from './data/userData.js'

async function seedDatabase() {
  try {
    await connectToDb()

    console.log('🤖 Database connected!')

    // ! Delete all the data in our database -- we dont need to do this.
    await mongoose.connection.db.dropDatabase()

    console.log('🤖 Database was dropped!')

    const users = await User.create(getUserData())

    console.log(`🤖 ${users.length} users created!`)

    const cityData = await getCityData(users)

    const city = await City.create(cityData)

    console.log(`🤖 ${city.length} city created!`)

    // ! This line to close the connection to mongodb, good practice,
    // ! prevents mongodb from having a bunch of useless open connections.
    await mongoose.connection.close()
    console.log('🤖 Goodbye!')

  } catch (err) {
    console.log('🤖 Something went wrong with seeding!')
    console.log(err)

    await mongoose.connection.close()
    console.log('🤖 Goodbye!')
  }
}

seedDatabase()