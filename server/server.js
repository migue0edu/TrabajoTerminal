require('./config/config');
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use( require('./routes/index') );

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.listen(process.env.PORT, () =>{
  console.log('Escuchano puerto: ', process.env.PORT);
  console.log('hola');
  console.log('prueba2');
});
