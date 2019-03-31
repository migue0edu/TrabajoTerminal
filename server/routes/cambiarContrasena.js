const express = require('express');
const path = require('path');
const app = express();
const Usuario = require('../Modelo/usuario');

app.post('/recuperarContrasena', (req, res) =>{
	let body = req.body;
	let id = body.id;
	let pass = body.newpass;

	Usuario.findByIdAndUpdate(id,{Contrasena: pass},{new:true, runValidators: true}, (err, User) => {
		if(err){
			return res.status(400).json({err});
		}
		if(!User){
			return res,status(400).json({err, men: 'No se encontro el usuario.'});
		}
		//res.sendFile(path.resolve(__dirname,"../../public/confirmacion_completa.html"));
		res.json({User});
	})
});