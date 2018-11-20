"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.get = get;
exports.getAll = getAll;
exports.update = update;

var Store = require('mongoose').model('Store');

function create(req, res, next) {
  if (!req.body.name) {
    return res.status(500).json('name of store is required');
  }

  if (!req.body.description) {
    return res.status(500).json('description of store required');
  }

  if (!req.body.address) {
    return res.status(500).json('address of the store is required');
  }

  if (!req.body.location.coordinates) {
    return res.status(500).json('location coordinates (longitude latitude) are required');
  }

  Store.create({
    name: req.body.name,
    description: req.body.description,
    address: req.body.address,
    location: req.body.location
  }, function (err, result) {
    if (err) {
      res.status(500).json('error: ' + err);
    } else {
      res.status(200).json(result);
    }
  });
  return next();
}

function get(req, res, next) {
  if (!req.params.id) {
    return res.status(500).json('store id is required');
  }

  Store.findById(req.params.id).populate({
    path: 'produce',
    model: 'Produce'
  }).exec(function (err, store) {
    if (err) {
      return res.status(500).json('error occured: ' + err);
    } else if (store) {
      res.status(200).json(store);
      return next();
    }
  });
}

function getAll(req, res, next) {
  Store.find({}, function (err, stores) {
    if (err) {
      res.status(500).json('error: ' + err);
      return next();
    } else {
      res.status(200).json(stores);
      return next();
    }
  });
}

function update(req, res, next) {
  if (!req.body.name && !req.body.address && !req.body.description && !req.body.location) {
    return res.status(500).json('You must include parameter(s) you would like to update');
  }

  if (!req.params.id) {
    return res.status(500).json('Store id is required to update');
  }

  if (!req.body.location.type || !req.body.location.coordinates) {
    return res.status(500).json('Formmating incorrect. type and coordinates are required properties on location.');
  }

  Store.findById(req.params.id).exec(function (err, store) {
    if (err) {
      return next(new Error('error occured: ' + err));
    } else if (store) {
      if (req.body.name) {
        store.name = req.body.name;
      }

      if (req.body.description) {
        store.description = req.body.description;
      }

      if (req.body.address) {
        store.address = req.body.address;
      }

      if (req.body.location) {
        store.location = req.body.location;
      }

      store.save(function (err, updated) {
        if (err) {
          console.error(err);
          res.status(500).json('Unable to save changes to db ' + err);
        }

        res.status(200).json(updated);
        return next();
      });
    }
  }); // add get by location
}