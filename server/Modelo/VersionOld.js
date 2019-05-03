const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let documentoOldSchema = new Schema({
    DocOriginal: {
        type: Schema.Types.ObjectId, ref: 'Documento',
        required: [true, "El documento debe tener un propietario."]
    },

    Version: {
        type: Number,
        require: true,
        default: 1
    },

    Texto: {
        type: String,
        require: false,
        default: " "
    },
    Titulo: {
        type: String,
        required: true,
        default: "Documento sin titulo"
    }
});

module.exports = mongoose.model('DocumentoOld',documentoSchema);