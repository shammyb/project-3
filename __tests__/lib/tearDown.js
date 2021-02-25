import City from '../../models/city.js'
import User from '../../models/user.js'


export default async function tearDown(done) {
  await User.deleteMany()
  await City.deleteMany()
  done()
}