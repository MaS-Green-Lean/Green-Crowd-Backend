const express = require('express')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const passport = require('passport')
dotEnv.config() // this has to be here, otherwise it tries to access the secret key before the config is loaded
require('./models/store')
require('./models/produce')
require('./models/user')

const api = require('./routes')
var cors = require('cors')
const PORT = process.env.PORT || 3001


const app = express()
mongoose.connect(process.env.MONGO_URL, { useCreateIndex: true, useNewUrlParser: true })

const db = mongoose.connection

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())

app.use('/api', api)
db.on('error', console.error.bind(console, 'connection error:'))

app.listen(PORT, error => {
  error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
})
