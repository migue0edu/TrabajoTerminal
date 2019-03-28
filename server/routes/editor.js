const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
app.use(session({ secret: 'guinea pig', cookie: { maxAge: 300 }, resave: true, saveUninitialized: true}));


app.get('/editor', (req, res, next) => {
    req.session.user="NoUser";
    req.session.save(()=>{
       console.log(`${req.session.id}: Session saved`);
    });
    res.cookie('user', "req.session.id");
    res.sendFile(path.resolve(__dirname,"../../public/EditorTexto.html"));
});

module.exports = app;