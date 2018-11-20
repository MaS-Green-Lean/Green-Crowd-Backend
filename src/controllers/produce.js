const Produce = require('mongoose').model('Produce')
const Store = require('mongoose').model('Store')

export function create(req, res, next) {
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
      return next(err)
    } else {
      Store.findById(req.params.id, (err, store) => {
        if (err) {
          return next(err)
        } else {
          store.produce.push(produce)
          store.save((err, updated) => {
            if (err) {
              next(err)
            }
            res.status(201).json(updated)
            return next()
          })
        }
      })
    }
  })
}

export function lowestPrice (req, res, next) {
  Produce.aggregate([
    {
      $group: { _id: '$name', min: { $min: '$price'}}
    }
  ], (err, result) => {
    if (err) {
      next(err)
    } else {
      res.status(200).json(result)
      return next()
    }
  })
}
