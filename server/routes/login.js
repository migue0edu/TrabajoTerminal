const express = require('express');
const path = require('path');
const app = express();
const Usuario = require('../Modelo/usuario');

app.post('/login', (req, res) => {

    let body = req.body;
    Usuario.findOne({  Correo: body.email },(err,UsuarioDB) =>{
            /*Usuario.find({},'Nombre Contrasena').exec((err,usuarios)=>{
                res.json({usuarios});
            })*/

            console.log(body.email);
            if(err){
                return res.status(400).json({err});
            }

            if(!UsuarioDB){
                return res.json({err : {mensaje: 'Usuario no encontrado'}});
            }

           if (UsuarioDB.Contrasena === body.pass && UsuarioDB.Estatus === true) {

               //Crear pagina de sesion donde aprecen los documentos creados del usuario
               console.log('Login correcto');
               res.redirect('/editor');
               //res.sendFile(path.resolve(__dirname,"../../public/EditorTexto.html"));

           }else{
                    res.sendFile(path.resolve(__dirname,"../../public/index.html"));
           } 




    })
});


module.exports = app;