import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import mongooseHidden from 'mongoose-hidden'
import uniqueValidator from 'mongoose-unique-validator'






const schema = new mongoose.Schema({
 
  username: { type: String, required: [true, 'Username is required'], unique: true },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  password: { type: String, required: [true, 'Password is required'] },
  isAdmin: { type: Boolean }
  
})

schema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

schema.methods.validatePassword = function(password) {
  console.log(bcrypt.compareSync(password, this.password))
  return bcrypt.compareSync(password, this.password)
}

schema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

schema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && (this.password !== this._passwordConfirmation)) {
      this.invalidate('passwordConfirmation', 'This must match your password')
    }
    next()
  })

schema.plugin(uniqueValidator)
schema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true } }))

export default mongoose.model('User', schema)
