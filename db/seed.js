
import mongoose from 'mongoose'
import connectToDb from '../lib/connectToDb.js'

import City from '../models/city.js'
import User from '../models/user.js'
import Image from '../models/image.js'

import getCityData from './data/cityData.js'
import getUserData from './data/userData.js'

async function seedDatabase() {
  try {
    await connectToDb()

    console.log('🤖 Database connected!')

  
    await mongoose.connection.db.dropDatabase()

    console.log('🤖 Database was dropped!')

    const users = await User.create(getUserData())

    const image = await Image.create(
      [{
        url: 'https://i.imgur.com/TvUzQKk.jpg',
        caption: 'Made a planter for my Cactus!',
        user: users[1]
      }]
    )
    console.log(`🤖 ${image.length} images created!`)

    console.log(`🤖 ${users.length} users created!`)

    const cityData = await getCityData(users)

    const city = await City.create(cityData)

    console.log(`🤖 ${city.length} city created!`)


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