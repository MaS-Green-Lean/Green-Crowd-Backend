const Produce = require('mongoose').model('Produce')
const Store = require('mongoose').model('Store')

module.exports.create = (req, res, next) => {
  if (!req.body.name) {
    return next(new Error('Produce name is required'))
  }
  if (!req.body.description) {
    return next(new Error('Produce description is required'))
  }
  if (!req.body.price) {
    return next(new Error('Produce price is required'))
  }
  if (!req.body.carbon) {
    return next(new Error('Produce carbon footprint is required'))
  }

  let produce = new Produce({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    carbon: req.body.carbon
  })
  produce.save((err, produce) => {
    if (err) {
      return next(new Error('error: ', err))
    } else {
      Store.findById(req.params.id, (err, store) => {
        if (err) {
          res.status(500).json('error: ' + err)
          return next()
        } else {
          store.produce.push(produce)
          store.save((err, updated) => {
            if (err) {
              res.status(500).json('Unable to save changes to db')
            }
            res.status(200).json(updated)
            return next()
          })
        }
      })
    }
  })
}
