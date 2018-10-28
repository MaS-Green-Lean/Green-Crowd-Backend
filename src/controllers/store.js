const Store = require('mongoose').model('Store')

module.exports.create = (req, res, next) => {
  if (!req.body.name) {
    return next(new Error('name of store is required'))
  }
  if (!req.body.description) {
    return next(new Error('description of store required'))
  }
  if (!req.body.address) {
    return next(new Error('address of the store is required'))
  }

  Store.create({
    name: req.body.name,
    description: req.body.description,
    address: req.body.address
  }, (err, result) => {
    if (err) {
      res.status(500).json('error: ' + err)
      return next()
    } else {
      res.status(200).json(result)
      return next()
    }
  })
}

module.exports.get = (req, res, next) => {
  if (!req.params.id) {
    return next(new Error('store id is required'))
  }
  Store.findById(req.params.id)
    .populate({path: 'produce', model: 'Produce'})
    .exec((err, store) => {
      if (err) {
        return next(new Error('error occured: ' + err))
      } else if (store) {
        res.status(200).json(store)
        return next()
      }
    })
}

module.exports.getAll = (req, res, next) => {
  Store.find({}, (err, stores) => {
    if (err) {
      res.status(500).json('error: ' + err)
      return next()
    } else {
      res.status(200).json(stores)
      return next()
    }
  })
}

module.exports.update = (req, res, next) => {
  if (!req.body.name && !req.body.address && !req.body.description) {
    return next(new Error('You must include parameter(s) you would like to update'))
  }
  if (!req.params.id) {
    return next(new Error('Store id is required to update'))
  }
  Store.findById(req.params.id).exec((err, store) => {
    if (err) {
      return next(new Error('error occured: ' + err))
    } else if (store) {
      if (req.body.name) {
        store.name = req.body.name
      }
      if (req.body.description) {
        store.description = req.body.description
      }
      if (req.body.address) {
        store.address = req.body.address
      }
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
