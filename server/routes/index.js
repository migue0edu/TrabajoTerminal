const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use( require('./login'));
app.use( require('./registro'));
app.use( require('./editor'));
app.use( require('./enviarInvitacion'));
app.use( require('./activarUsuario'));
app.use( require('./documento'));


module.exports = app;
