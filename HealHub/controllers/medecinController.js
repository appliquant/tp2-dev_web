"use strict";

const Medecin = require("../models/medecin");

/**
 * Récupérer la liste des médecins
 */
const getMedecins = async (req, res, next) => {
	try {
		// Paramètres optionnel specialite
		const specialite = req.query.specialite ?? null;

		// Recherche des médecins
		let medecins = [];
		if (specialite === null) {
			medecins = await Medecin.find();
		} else {
			medecins = await Medecin.find({ "specialite": specialite });
		}


		res.status(200).json(medecins);
	} catch (err) {
		next(err);
	}
}

/**
 * Récupérer un médecin en particulier
 */
const getMedecin = async (req, res, next) => {
	try {
		// Récupération de l'id du médecin
		const id = req.params.id;

		// Recherche du médecin
		const medecin = await Medecin.findById(id);

		// Médecin trouvé
		if (medecin === null) {
			res.status(404).json({ message: "Médecin non trouvé" });
		} else {
			res.status(200).json(medecin);
		}

	} catch (err) {
		next(err);
	}
}

/**
 * Créer un médecin
 */

const postMedecin = async (req, res, next) => {
	try {
		// Récupération des données du médecin
		const { nom, prenom, courriel, telephone, specialite } = req.body;

		// Création du médecin
		let medecin = new Medecin({
			nom: nom,
			prenom: prenom,
			courriel: courriel,
			telephone: telephone,
			specialite: specialite
		});

		// Sauvegarde du médecin
		medecin = await medecin.save();

		// Uri du médecin
		// Location medecion
		const location = `/medecins/${medecin._id}`

		// Réponse medecin et uri
		res.set("Location", location)
		res.status(201).json(medecin);

	} catch (err) {
		next(err);
	}
}

/**
 * Modifier un médecin
 */
const putMedecin = async (req, res, next) => {
	try {
		// Récupération nouvelle données du médecin
		const id = req.params.id;
		const { nom, prenom, courriel, telephone, specialite } = req.body;

		// Chercher le médecin
		let medecin = await Medecin.findById(id);

		// Médecin trouvé
		if (medecin === null) {
			res.status(404).json({ message: "Médecin non trouvé" });
		}

		// Modifier les données du médecin
		medecin.nom = nom;
		medecin.prenom = prenom;
		medecin.courriel = courriel;
		medecin.telephone = telephone;
		medecin.specialite = specialite;

		// Sauvegarde du médecin
		medecin = await medecin.save();

		// Réponse medecin
		res.status(200).json(medecin);
	} catch (err) {
		next(err);
	}
}

/**
 * Supprimer un médecin
 */
const deleteMedecin = async (req, res, next) => {
	try {
		// Récupération de l'id du médecin
		const id = req.params.id;

		// Recherche du médecin
		const medecin = await Medecin.findById(id);

		// Médecin trouvé
		if (medecin === null) {
			res.status(404).json({ message: "Médecin non trouvé" });
		}

		// Supprimer médecin
		medecin.deleteOne();

		// Réponse medecin
		res.status(204).json();
	} catch (err) {
		next(err)
	}
}

module.exports = {
	getMedecins,
	getMedecin,
	postMedecin,
	putMedecin,
	deleteMedecin
}