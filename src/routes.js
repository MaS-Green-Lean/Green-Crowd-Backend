import express from 'express'
import { create as createStore, get, getAll, update as updateStore} from './controllers/store'
import { create as createProduce, lowestPrice } from './controllers/produce'
import { create as createUser, login } from './controllers/users'
import passport from 'passport'
import './configs/passport'

const router = express.Router()

router.post('/store', passport.authenticate('jwt', { session:false }), createStore)
router.get('/store/:id', passport.authenticate('jwt', { session:false }), get)
router.get('/stores', passport.authenticate('jwt', { session:false }), getAll)
router.post('/store/:id/produce', passport.authenticate('jwt', { session:false }), createProduce)
router.patch('/store/:id', passport.authenticate('jwt', { session:false }), updateStore)
router.get('/produce', passport.authenticate('jwt', { session:false }), lowestPrice)
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
// router.use((req, res, next) => {
//   if (res.locals.data) {
//     let response = Object.assign({}, res.locals.data, {
//       'status': 'ok'
//     })
//     return res.status(200).json(response)
//   } else if (res.locals.error) { // Any errors thrown are be handled below, but because we're bad not all errors are thrown >:(
//     let statusCode = res.locals.error.code || 500
//     let response = Object.assign({}, res.locals.error, {
//       'status': 'error'
//     })
//     return res.status(statusCode).json(response)
//   } else {
//     // not every error should be a generic 500 error!!!!!!!!!!!!
//     console.error('generic server error')
//     return res.status(500).json({
//       'status': 'error',
//       'code': 500,
//       'msg': 'Internal Server Error'
//     })
//   }
// })

module.exports = router
