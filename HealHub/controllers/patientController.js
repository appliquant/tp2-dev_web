"use strict";

const mongoose = require("mongoose");
const Patient = require("../models/patient");
const veriferChamps = require("../utils/VerifierChamps");

/**
 * Récupérer la liste des patients
 */
const getPatients = async (req, res, next) => {
	try {
		// Récupération de la liste des patients
		const patients = await Patient.find();

		// Renvoi de la liste des patients
		res.status(200).json(patients);

	} catch (err) {
		next(err);
	}
}

/**
 * Récupérer un patient en particulier
 */
const getPatient = async (req, res, next) => {
	try {
		// Récupération de l'id du patient
		const id = req.params.id;
		if (id === null) {
			res.status(400).json({ message: "Id du patient non spécifiée" });
			return;
		}

		// Recherche du patient
		const patient = await Patient.findById(id);

		// Patient trouvé
		if (patient === null) {
			res.status(404).json({ message: "Patient non trouvé" });
			return;
		} else {
			res.status(200).json(patient);
			return;
		}

	} catch (err) {
		next(err);
	}
}

/**
 * Créer un patient
 */
const postPatient = async (req, res, next) => {
	try {
		// Récupération des données du patient
		const { nom, prenom, dateNaissance, courriel, telephone, adresse, codePostal } = req.body;

		// Vérifier si les champs sont vides
		const verification = veriferChamps(nom, prenom, dateNaissance, courriel, telephone, adresse, codePostal)
		if (verification === true) {
			res.status(400).json({ message: "Champs manquants" });
			return;
		}

		// Création du patient
		let patient = new Patient({
			nom: nom,
			prenom: prenom,
			dateNaissance: dateNaissance,
			courriel: courriel,
			telephone: telephone,
			adresse: adresse,
			codePostal: codePostal
		});

		// Sauvegarder le patient
		patient = await patient.save();

		// Location du patient
		const location = `/patients/${patient._id}`;

		// Renvoi du patient
		res.set("Location", location)
		res.status(201).json(patient);

	}
	catch (err) {
		next(err);
	}
}

/**
 * Modifier un patient
 */
const putPatient = async (req, res, next) => {
	try {
		// Récupération des données du patient
		const id = req.params.id;
		const { nom, prenom, dateNaissance, courriel, telephone, adresse, codePostal } = req.body;

		// Vérifier si les champs sont vides
		const verification = veriferChamps(nom, prenom, dateNaissance, courriel, telephone, adresse, codePostal)
		if (verification === true || id === null) {
			res.status(400).json({ message: "Champs manquants" });
			return;
		}

		// Chercher le patient
		let patient = await Patient.findById(id);
		if (patient === null) {
			res.status(404).json({ message: "Patient non trouvé" });
			return;
		}

		// Modifier le patient
		patient.nom = nom;
		patient.prenom = prenom;
		patient.dateNaissance = dateNaissance;
		patient.courriel = courriel;
		patient.telephone = telephone;
		patient.adresse = adresse;
		patient.codePostal = codePostal;

		// Sauvegarder le patient
		patient = await patient.save();

		// Renvoi du patient
		res.status(200).json(patient);
	} catch (err) {
		next(err);
	}
}

/**
 * Ajouter un historique à un patient
 */
const postPatientHistorique = async (req, res, next) => {
	try {
		// Récupération des données du patient
		const id = req.params.id;
		const { medecinId, information } = req.body;

		const verification = veriferChamps(medecinId, information);
		if (verification === true || id === null) {
			res.status(400).json({ message: "Champs manquants" });
			return;
		}

		// Chercher le patient
		let patient = await Patient.findById(id);
		if (patient === null) {
			res.status(404).json({ message: "Patient non trouvé" });
			return;
		}

		// Ajouter l'historique
		patient.historique.push({
			medecinId: mongoose.Types.ObjectId(medecinId),
			information: information
		});

		// Sauvegarder le patient
		patient = await patient.save();

		// Location du patient
		const location = `/patients/${patient._id}`;

		// Renvoi du patient
		res.set("Location", location)
		res.status(201).json(patient);

	} catch (err) {
		next(err);
	}
}

/**
 * Supprimer un élement de l'historique d'un patient
 */
const deletePatientHistorique = async (req, res, next) => {
	try {
		// Récupération des données du patient
		const id = req.params.id;
		const idHistorique = req.params.idHistorique;

		// Vérifier si les champs sont vides
		const verification = veriferChamps(id, idHistorique);
		if (verification === true) {
			res.status(400).json({ message: "Champs manquants" });
			return;
		}

		// Chercher le patient
		const patient = await Patient.findById(id);
		if (patient === null) {
			res.status(404).json({ message: "Patient non trouvé" });
			return;
		}

		// Supprimer l'historique
		await patient.historique.id(idHistorique).remove();
		await patient.save();

		// Reponse
		res.status(204).json({ message: "Historique supprimé" });

	} catch (err) {
		next(err);
	}
}

/**
 * Supprimer un patient
 */
const deletePatient = async (req, res, next) => {
	try {
		// Récupération des données du patient
		const id = req.params.id;

		// Vérifier si les champs sont vides
		const verification = veriferChamps(id);
		if (verification === true) {
			res.status(400).json({ message: "Champs manquants" });
			return;
		}

		// Chercher le patient
		const patient = await Patient.findById(id);
		if (patient === null) {
			res.status(404).json({ message: "Patient non trouvé" });
			return;
		}

		// Supprimer le patient
		await patient.remove();

		// Reponse
		res.status(204).json({ message: "Patient supprimé" });
	}
	catch (err) {
		next(err);
	}
}

module.exports = {
	getPatients,
	getPatient,
	postPatient,
	putPatient,
	postPatientHistorique,
	deletePatientHistorique,
	deletePatient
};




