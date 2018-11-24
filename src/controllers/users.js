const User = require('mongoose').model('User')

module.exports.create = (req, res, next) => {
  if (!req.body.firstName) {
    return res.status(422).json({ msg: 'First name is required' })
  }
  if (!req.body.lastName) {
    return res.status(422).json({ msg: 'Last name is required' })
  }
  if (!req.body.email) {
    return res.status(422).json({ msg: 'Email is required' })
  }
  if (!req.body.password) {
    return res.status(422).json({ msg: 'Password is required' })
  }
  const userData = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    role: req.body?.role
  }
  User.create(userData, (err, user) => {
    if (err) {
      return next(err)
    } else {
      res.status(201).json({ user: user.toAuthJSON() })
      return next()
    }
  })
}

module.exports.login = (req, res, next) => {
  if (!req.body.email) {
    return res.status(422).json({ msg: 'Email is required' })
  }
  if (!req.body.password) {
    return res.status(422).json({ msg: 'Password is required' })
  }

  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) {
      return next(err)
    }
    const valid = await user.validatePassword(req.body.password)
    if (user && valid) {
      return res.status(200).json({user: user.toAuthJSON()})
    } else {
      return res.status(401).json({msg: 'Incorrect username or password'})
    }
  })
}

module.exports.getShoppingList = (req, res, next) => {
  if (!req.params.id) {
    return res.status(422).json({ msg: 'You are required to send the user ID as a parameter' })
  }

  User.findById(req.params.id, 'shoppingList', (err, list) => {
    if (err) {
      return next(err)
    } else {
      return res.status(200).json({ list: list })
    }
  })
}

// update the shopping list when the user navigates away from the page
// be careful about them closing the app but how?
// look at https://ionicframework.com/docs/api/navigation/NavController/ Nav Guards!!!!! ionViewCanLeave
module.exports.updateShoppingList = (req, res, next) => {
  if (!req.params.id) {
    return res.status(422).json({ msg: 'You are required to send the user ID as a parameter' })
  }
  if (!req.body.list) {
    return res.status(422).json({ msg: 'You are required to send the updated shopping list' })
  }

  User.findByIdAndUpdate(req.body.id,
    { shoppingList: req.body.list },
    { new: true, upsert: true},
    (err, list) => {
      if (err) return next(err)
      else {
        return res.status(200).json({ list: list })
      }
    })
}

// module.exports.removeFromShoppingList = (req, res, next) => {
//   if (!req.params.id) {
//     return res.status(422).json({ msg: 'You are required to send the user ID as a parameter' })
//   }
//   if (!req.body.item) {
//     return res.status(422).json({ msg: 'You are required to send the item to add to the list' })
//   }

//   User.findByIdAndUpdate(req.body.id, )
// }

module.exports.getUser = (req, res) => {
  if (req.user) return res.status(200).json({ user: req.user })
  else return res.status(401).json({ msg: 'No token provided, please login or register' })
}
