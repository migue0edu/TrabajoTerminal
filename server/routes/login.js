const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const Usuario = require('../Modelo/usuario');
app.use(session({ secret: 'guinea pig', cookie: { maxAge: 60*1000 }, resave: false, saveUninitialized: true}));

app.post('/login', (req, res) => {
    if(req.session.user){
        return res.redirect('/documento');
    }

    let body = req.body;
    Usuario.findOne({  Correo: body.email },(err,UsuarioDB) =>{

            if(err){
                return res.status(400).json({err});
            }

            if(!UsuarioDB){
                return res.json({err : {mensaje: 'Usuario no encontrado'}});
            }

           if (UsuarioDB.Contrasena === body.pass && UsuarioDB.Estatus === true) {

               //Crear pagina de sesion donde aprecen los documentos creados del usuario
               req.session.userName = UsuarioDB.Nombre;
               req.session.user = `${UsuarioDB._id}`;
               res.redirect(`/documento`);

           }else{
                    res.sendFile(path.resolve(__dirname,"../../public/index.html"));
           }

    })
});


module.exports = app;