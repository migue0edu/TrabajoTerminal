const express = require('express');
const path = require('path');
const app = express();
const Usuario = require('../Modelo/usuario');
var nodemailer = require('nodemailer');
//const mail = require('mail').Mail({host:"smtp.gmail.com",username:"djbrush1122@gmail.com",password:"2011080169"});

app.post('/registro', (req,res)=>{
	let body = req.body;
	let textohtml ='<div>'
		+ '<input type="button" value="Confirmar Correo">'
		+ '</div>'
	var transporter = nodemailer.createTransport({
  	service: 'gmail',
  	auth: {
    user: 'djbrush1122@gmail.com',
    pass: '2011080169'
  			},
  			tls: {
        	rejectUnauthorized: false
    }
	});

var mailOptions = {
  from: 'djbrush1122@gmail.com',
  to: body.email,
  subject: 'Pruebas',
  text: 'That was easy!',
  html: textohtml
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

	
	let NuevoUsuario = new Usuario({

		Nombre: body.nombre,
		Apellidos: body.apellidos,
		Correo: body.email,
		Contrasena: body.pass

	});

	NuevoUsuario.save((err,UsuarioDB)=>{
		if(err){
			return res.json({err});
		}

		res.json({UsuarioDB});
	})


})

module.exports = app;