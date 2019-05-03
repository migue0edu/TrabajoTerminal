const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
app.use(session({ secret: 'guinea pig', cookie: { maxAge: 3000*1000 }, resave: false, saveUninitialized: true}));
const Documento = require('../Modelo/documento');
const Usuario = require( '../Modelo/usuario');

app.get('/documento', function(req, res) {
    if(!req.session.user){
        return res.redirect('/');
    }

    res.sendFile(path.resolve(__dirname,"../../public/PaginaPrincipal.html"));
});

app.get('/documento/create', async function (req, res) {

    // if(!req.session.user){
    //     res.redirect('/');
    // }
    let nuevoDoc = new Documento({
        Propietario: req.session.user
    });

   let saveDocument =  await nuevoDoc.save();
   req.session.documentID = saveDocument._id;
    res.redirect('/editor');
});

// app.post('/documento/save', (req, res) => {
//    req.session.tempDoc.save((err, doc) => {
//        req.session.guardado = true;
//        if(!err)
//            res.status(201).json({
//                guardado: req.session.guardado
//            });
//    })
// });

app.post('/documento/update', (req, res) => {
    let body = req.body;
    let id = body.idocument;
    let texto = body.texto;
    console.log('Body: ', body);
    Documento.findOneAndUpdate( id, {new: true, texto, runValidators: true}, (err, DocumentoDB) => {
       if(!DocumentoDB){
           return res.status(400).json({
               ok: false,
               err
           });
       }

       res.redirect('/editor');
    });
    res.status(201);
});

module.exports = app;