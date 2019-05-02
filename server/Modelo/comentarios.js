const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let comentarioSchema = new Schema({
    Propietario: {
        type: Schema.Types.ObjectId, ref: 'Usuarios',
        required: [true, "El documento debe tener un propietario."]
    },
    Titulo: {
        type: String,
        required: true,
        default: " "
    },
    Texto: {
        type: String,
        require: false,
        default: " "
    },
    Ubicacion: {
        type String,
        required: true
    }
    Documento: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Documento',Schema);