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


app.post('/documento/update', async (req, res) => {
    let body = req.body;
    let id = req.session.documentID;
    let texto = body.texto;
    let fecha = Date.now();
    console.log('Body: ', body);
    let doc = await Documento.findOneAndUpdate(id, {new: true, texto, fecha, runValidators: true}, (err, DocumentoDB) => {
       if(!DocumentoDB){
           return res.status(400).json({
               ok: false,
               err
           });
           req.session.texto = DocumentoDB.Texto;
       }

       res.redirect('/editor');
    });
    res.status(201);
});

app.get('/documento/load/:id', async (req, res) => {
   let documentId = req.params.id;
   if(!documentId){
       return res.redirect('/documento');
   }
   let doc = await Documento.findById(documentId, (err, documentoDB) => {
      if(err){
          return res.status(400);
      }
      req.session.documentID = documentoDB._id;
      // req.session.Texto = documentoDB.Texto;
      // req.session.Titulo = documentoDB.Titulo;
      res.redirect('/editor');
   });

});

module.exports = app;

app.get('/documento/loadAll', async (req, res) => {
   let userId = req.session.user;
   let docs = await Documento.find({Propietario: userId}).exec((err, documentos) => {
       if(err){
           return res.status(500);
       }
       console.log('loadAll:' + JSON.stringify(documentos));
       res.json(JSON.stringify(documentos));
   });

});