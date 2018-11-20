const Store = require('mongoose').model('Store')

export function create(req, res, next) {
  if (!req.body.name) {
    return res.status(500).json('name of store is required') // These shouldn't be 500s
  }
  if (!req.body.description) {
    return res.status(500).json('description of store required')
  }
  if (!req.body.address) {
    return res.status(500).json('address of the store is required')
  }
  if (!req.body.location.coordinates) {
    return res.status(500).json('location coordinates (longitude latitude) are required')
  }

  Store.create({
    name: req.body.name,
    description: req.body.description,
    address: req.body.address,
    location: req.body.location
  }, (err, result) => {
    if (err) {
      return next(err)
    } else {
      res.status(200).json(result)
    }
  })
  return next()
}

export function get(req, res, next) {
  if (!req.params.id) {
    return res.status(500).json('store id is required')
  }
  Store.findById(req.params.id)
    .populate({path: 'produce', model: 'Produce'})
    .exec((err, store) => {
      if (err) {
        return next(err)
      } else if (store) {
        res.status(200).json(store)
        return next()
      }
    })
}

export function getAll(req, res, next) {
  Store.find({}, (err, stores) => {
    if (err) {
      return next(err)
    } else {
      res.status(200).json(stores)
      return next()
    }
  })
}

export function update(req, res, next) {
  if (!req.body.name && !req.body.address && !req.body.description && !req.body.location) {
    return res.status(500).json('You must include parameter(s) you would like to update')
  }
  if (!req.params.id) {
    return res.status(500).json('Store id is required to update')
  }
  if (!req.body.location.type || !req.body.location.coordinates) {
    return res.status(500).json('Formmating incorrect. type and coordinates are required properties on location.')
  }
  Store.findById(req.params.id).exec((err, store) => {
    if (err) {
      return next(err)
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
      if (req.body.location) {
        store.location = req.body.location
      }
      store.save((err, updated) => {
        if (err) {
          return next(err)
        }
        res.status(200).json(updated)
        return next()
      })
    }
  })

  // add get by location
}
