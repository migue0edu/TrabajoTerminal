const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let documentoSchema = new Schema({
	Propietario: {
		type: String,
		required: [true, "El documento debe tener un propietario."]
	},
	
	Datos: {
		type: {ver: Number, contenido: String},
		require: [false, default: ""]
	},

	PersonasCompartidas: {
		type: [],
		required: [false]
	},

	Votacion: {
		type: {fecha: Date, participantes: [], votos:{si: Number, no: Number}},
		require: [false]
	},

	Version: {
		type: Number,
		require: [true, default: 1]
	}

});

module.exports = mongoose.model('Documento',Schema);