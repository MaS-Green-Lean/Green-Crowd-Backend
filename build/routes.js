"use strict";

var _express = _interopRequireDefault(require("express"));

var store = _interopRequireWildcard(require("./controllers/store"));

var produce = _interopRequireWildcard(require("./controllers/produce"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/store', store.create);
router.get('/store/:id', store.get);
router.get('/stores', store.getAll);
router.post('/store/:id/produce', produce.create);
router.patch('/store/:id', store.update);
router.get('/produce', produce.lowestPrice);

if (process.env.NODE_ENV === 'development') {
  router.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
} // router.use((req, res, next) => {
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