"use strict";

const Patient = require("../models/patient");
const Medecin = require("../models/medecin");
const RendezVous = require("../models/rendezvous");

const medecins = require("../seeds/medecins");
const patients = require("../seeds/patients");
const rendezVous = require("../seeds/rendezVous");


let result = {};

/**
 * Remplir la base de données avec des données de test
 */
const seed = async (req, res, next) => {
	try {
		///////// Créer les médecins ///////// 
		await Medecin.deleteMany();
		console.log("Médecins supprimés");
		await Medecin.insertMany(medecins);

		///////// Créer les patients /////////
		await Patient.deleteMany();
		console.log("Patients supprimés");
		const nvpatients = await Patient.insertMany(patients);
		result.patients = nvpatients;

		///////// Créer les rendez-vous /////////
		await RendezVous.deleteMany();

		console.log("Rendez-vous supprimés");
		const rdv = await RendezVous.insertMany(rendezVous);
		result.rendezVous = rdv;

		res.status(200).json(result);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
}

module.exports = {
	seed
}