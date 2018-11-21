const passportJWT = require('passport-jwt')
const ExtractJWT = passportJWT.ExtractJwt
const JWTStrategy   = passportJWT.Strategy
import passport from 'passport'
const User = require('mongoose').model('User')

passport.use('jwt', new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
}, async (jwt_payload, done) => {
  return await User.findById(jwt_payload.id, (err, user) => {
    if (err) return done(err, false)
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
}))
