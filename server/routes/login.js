const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const Usuario = require('../Modelo/usuario');
app.use(session({ secret: 'guinea pig', cookie: { maxAge: 300*1000 }, resave: false, saveUninitialized: true}));

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
               //app.locals.user = UsuarioDB._id;
               //app.set('user', `${UsuarioDB._id}`);
               req.session.user = `${UsuarioDB._id}`;
               //res.redirect(`/editor`);
               console.log("En login: user: " + req.session.user);
               res.sendFile(path.resolve(__dirname,"../../public/PaginaPrincipal.html"));

           }else{
                    res.sendFile(path.resolve(__dirname,"../../public/index.html"));
           }
           //console.log("En login: user: " + app.locals.user);

    })
});


module.exports = app;