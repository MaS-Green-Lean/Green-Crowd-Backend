"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var dotEnv = require('dotenv');

var mongoose = require('mongoose');

require('./models/store');

require('./models/produce');

var api = require('./routes');

var cors = require('cors');

var PORT = process.env.PORT || 3001;
dotEnv.config();
var app = express();
mongoose.connect(process.env.MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true
});
var db = mongoose.connection;
app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);
db.on('error', console.error.bind(console, 'connection error:'));
app.listen(PORT, function (error) {
  error ? console.error(error) : console.info("==> \uD83C\uDF0E Listening on port ".concat(PORT, ". Visit http://localhost:").concat(PORT, "/ in your browser."));
});