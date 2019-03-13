require('./config/config');
const express = require('express');

const app = express();

app.use( require('./routes/index') );

app.listen(process.env.PORT, () =>{
  console.log('Escuchano puerto: ', process.env.PORT);
})
