"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.lowestPrice = lowestPrice;

var Produce = require('mongoose').model('Produce');

var Store = require('mongoose').model('Store');

function create(req, res, next) {
  if (!req.body.name) {
    return next(new Error('Produce name is required'));
  }

  if (!req.body.description) {
    return next(new Error('Produce description is required'));
  }

  if (!req.body.price) {
    return next(new Error('Produce price is required'));
  }

  if (!req.body.carbon) {
    return next(new Error('Produce carbon footprint is required'));
  }

  var produce = new Produce({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    carbon: req.body.carbon
  });
  produce.save(function (err, produce) {
    if (err) {
      return next(new Error('error: ', err));
    } else {
      Store.findById(req.params.id, function (err, store) {
        if (err) {
          return next(err);
        } else {
          store.produce.push(produce);
          store.save(function (err, updated) {
            if (err) {
              next(err);
            }

            res.status(201).json(updated);
            return next();
          });
        }
      });
    }
  });
}

function lowestPrice(req, res, next) {
  Produce.aggregate([{
    $group: {
      _id: '$name',
      min: {
        $min: '$price'
      }
    }
  }], function (err, result) {
    if (err) {
      console.error(err);
      next(err);
    } else {
      res.status(200).json(result);
      return next();
    }
  });
}