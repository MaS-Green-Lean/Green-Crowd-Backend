import mongoose from 'mongoose'
import { hashSync, compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken'

var UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    sparse: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Manager', 'Shopper'],
    default: 'Shopper'
  },
  shoppingList: {
    type: [String]
  },
  storeManaged: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }],
    required: false
  }
})

UserSchema.pre('save', async function(next){

  if (this.isModified('password') || this.isNew) {
    this.password = hashSync(this.password, 10)
  } else{
    return next()
  }
})

UserSchema.virtual('fullname').get(function () {
  return this.firstName + ' ' + this.lastName
})

UserSchema.methods.validatePassword = async function(password) {
  return await compareSync(password, this.password)
}

UserSchema.methods.generateJWT = function() {
  return jwt.sign({
    email: this.email,
    id: this._id,
    expiresIn: process.env.SECRET_KEY_EXP + 'm'
  }, process.env.SECRET_KEY)
}

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    fullname: this.fullname,
    token: this.generateJWT(),
    role: this.role,
    storeManaged: this.storeManaged
  }
}

mongoose.model('Users', UserSchema)

export default mongoose.model('User', UserSchema)
