const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use( require('./activarUsuario'));
app.use( require('./cambiarContrasena'));
app.use( require('./documento'));
app.use( require('./editor'));
app.use( require('./enviarInvitacion'));
app.use( require('./login'));
app.use( require('./registro'));
app.use( require('./restablecerContrasena'));



module.exports = app;
