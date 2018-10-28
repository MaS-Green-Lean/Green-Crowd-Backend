"use strict";

var _express = _interopRequireDefault(require("express"));

var _store = _interopRequireDefault(require("./controllers/store"));

var _produce = _interopRequireDefault(require("./controllers/produce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/store', _store.default.create);
router.get('/store/:id', _store.default.get);
router.get('/stores', _store.default.getAll);
router.post('/store/:id/produce', _produce.default.create);
router.patch('/store/:id', _store.default.update); // router.use((req, res, next) => {
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

module.exports = router;