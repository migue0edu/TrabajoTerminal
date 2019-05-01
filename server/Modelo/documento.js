const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let documentoSchema = new Schema({
	Propietario: {
		type: Schema.Types.ObjectId, ref: 'Usuarios',
		required: [true, "El documento debe tener un propietario."]
	},
	Titulo: {
		type: String,
		required: true,
		default: "Documento sin titulo"
	},
	Datos: {
		type: [{ver: Number, contenido: String}],
		require: false,
		default: " "
	},

	PersonasCompartidas: {
		type: [Schema.Types.ObjectId],
		required: false
	},

	Votacion: {
		type: {fecha: Date, participantes: [Schema.Types.ObjectId], votos:{si: Number, no: Number}},
		require: false
	},

	Version: {
		type: Number,
		require: true,
		default: 1
	}

});

module.exports = mongoose.model('Documento',Schema);