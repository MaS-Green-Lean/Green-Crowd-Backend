import express from 'express'
import { create as createStore, get, getAll, update as updateStore} from './controllers/store'
import { create as createProduce, lowestPrice } from './controllers/produce'
import { create as createUser, login, getUser } from './controllers/users'
import passport from 'passport'
import './configs/passport'

const router = express.Router()

router.post('/store', passport.authenticate('jwt', { session: false }), createStore)
router.get('/store/:id', passport.authenticate('jwt', { session: false }), get)
router.get('/stores', passport.authenticate('jwt', { session: false }), getAll)
router.post('/store/:id/produce', passport.authenticate('jwt', { session: false }), createProduce)
router.patch('/store/:id', passport.authenticate('jwt', { session: false }), updateStore)
router.get('/produce', passport.authenticate('jwt', { session: false }), lowestPrice)
router.get('/user', passport.authenticate('jwt', { session: false }), getUser)
router.post('/register', createUser)
router.post('/login', login)

if (process.env.NODE_ENV === 'development') {
  router.use(function(err, req, res) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })

}

module.exports = router
