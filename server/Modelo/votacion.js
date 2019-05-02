const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let votacionSchema = new Schema({

    Fecha: {
        type: Date,
        requied: true
    },

    Participantes: {
        type: [Schema.Types.ObjectId],
        required: true
    },

    VotosEmitidos: {
        type: [Schema.Types.ObjectId],
        required: true
    },

    Afavor: {
        type: Number,
        required: true,
        default: 0
    },
    Encontra: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Documento',Schema);