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
		const uri = req.protocol + "://" + req.get("host") + req.originalUrl + "/" + medecin._id;

		// Réponse
		res.status(201).json({ body: medecin, location: uri })

	} catch (err) {
		next(err);
	}
}

module.exports = {
	getMedecins,
	postMedecin
}