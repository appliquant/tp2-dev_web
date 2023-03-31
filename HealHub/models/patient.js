"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historiqueSchema = new Schema(
	{
		medecinId: {
			type: Schema.Types.ObjectId,
			ref: "medecin",
			required: true
		},

		create_at: {
			type: Date,
			required: true,
			default: Date.now
		},

		information: {
			type: String,
			required: true
		}
	}
);



const patientSchema = new Schema({
	nom: {
		type: String,
		required: true
	},

	prenom: {
		type: String,
		required: true
	},

	dateNaissance: {
		type: Date,
		required: true
	},

	telephone: {
		type: String,
		required: true
	},

	courriel: {
		type: String,
		required: true
	},

	adresse: {
		type: String,
		required: true
	},

	codePostal: {
		type: String,
		required: true
	},

	historique: [
		historiqueSchema
	],

}, {
	timestamps: true
});


module.exports = mongoose.model("patient", patientSchema);

