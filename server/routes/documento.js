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

app.post('/documento/save', (req, res) => {
   let body = req.body;
   let Documento;
   let Userid;
   Usuario.findOne({  Correo: body.email },(err,UsuarioDB) => {
       Userid = UsuarioDB._id;
   });
   let email = req.email;
   Documento = new Documento({
       Propietario: Userid,
       Datos: req.Datos,
       Version: 1


   })
});
