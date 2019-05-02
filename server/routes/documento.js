const express = require('express');
const app = express();
const Documento = require('../Modelo/documento');
const Usuario = require( '../Modelo/usuario');

app.get('/documento/get/:id', (req, res) => {
    let documentId = req.params.id;
    Documento.findById(id)
        .populate('Propietario', 'nombre correo')
        .exec((err, documento) =>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if(!documento){
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID no es correcto'
                    }
                });
            }
            res.json({
                ok: true,
                documento
            });
        });
});

app.post('/documento/create/:id', (req, res) => {
   let body = req.body;
   let Documento;
   Usuario.
   Usuario.save((err, documento) => {

       Documento = new Documento({
           Propietario: id
       })
   });

});

app.post('/documento/update/:id', (req, res) => {
    Documento.findByIdAndUpdate(id, {new: true, titulo, texto, runValidators: true}, (err, DocumentoDB) => {
       if(!DocumentoDB){
           return res.status(400).json({
               ok: false,
               err
           });
       }
        res.json({
            ok: true
        })
    });
});

module.exports = app;