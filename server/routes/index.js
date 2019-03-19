const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use( require('./login'));
app.use( require('./registro'));

module.exports = app;
