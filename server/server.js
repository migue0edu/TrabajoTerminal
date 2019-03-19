require('./config/config');
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use( require('./routes/index') );

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

mongoose.connect(process.env.URLDB, (err,res) =>{
	if(err){
		throw err;

	}
	console.log('Base de datos conectada');
})

app.listen(process.env.PORT, () =>{
  console.log('Escuchano puerto: ', process.env.PORT);
  console.log('hola');
  console.log('prueba2');
});
