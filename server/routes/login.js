const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use( express.static(path.resolve(__dirname, '../../public')));

app.post('/login', (req, res) => {
    let body = req.body;
    //res.json(body);
    let user = body.user;
    let passw = body.pass;
    if(user === 'migue0mpx@gmail.com' && passw === 'qwerty'){
        res.sendFile(path.resolve(__dirname, '../../public/EditorTexto.html'));
    }
    if(user === 'alfredo@hotmail.com' && passw === 'alf1234'){
        res.sendFile(path.resolve(__dirname, '../../public/EditorTexto.html'));
    }
    if(user === 'prueba1@gmail.com' && passw === 'prueba1'){
        res.sendFile(path.resolve(__dirname, '../../public/EditorTexto.html'));
    }

    if(user === 'bereniceunam@gmail.com' && passw === '1234'){
        res.sendFile(path.resolve(__dirname, '../../public/EditorTexto.html'));
    }

});


module.exports = app;