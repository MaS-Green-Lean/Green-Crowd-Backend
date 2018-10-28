const express = require('express')
const bodyParser = require('body-parser')
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
require('./models/store')
require('./models/produce')
const api = require('./routes')
var cors = require('cors')
const PORT = process.env.PORT || 3001

dotEnv.config()
const app = express()

mongoose.connect(process.env.MONGO_URL, { useCreateIndex: true, useNewUrlParser: true })

const db = mongoose.connection

app.use(cors())
app.use(bodyParser.json())
app.use('/api', api)
db.on('error', console.error.bind(console, 'connection error:'))

app.listen(PORT, error => {
  error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
})
