const Rdv = require("../models/rendezvous");
const veriferChamps = require("../utils/VerifierChamps");
const parseDateRdv = require("../utils/ParseDateRdv");

/**
 * Récupérer un rendez-vous en particulier
 */
const getRdv = async (req, res, next) => {
  try {
    // Récupération de l'id du rendez-vous
    const id = req.params.id;

    // Vérifier si l'id est vide
    if (id === null) {
      res.status(400).json({ message: "Id du rendez-vous non spécifiée" });
      return;
    }

    // Recherche du rendez-vous
    const rdv = await Rdv.findById(id);
    if (rdv === null) {
      res.status(404).json({ message: "Rendez-vous non trouvé" });
      return;
    }

    // Renvoi du rendez-vous
    res.status(200).json(rdv);
  }
  catch (err) {
    next(err);
  }
}

/**
 * Récupérer les rendez-vous d'un médecin
 */
const getRdvMedecin = async (req, res, next) => {
  try {
    // Récupérer les paramètres
    const medecinId = req.params.id;
    const date = req.query.date ?? null;


    // Vérifier si l'id est vide
    if (medecinId === null) {
      res.status(400).json({ message: "Id du médecin non spécifiée" });
      return;
    }

    // Trouver les rendez-vous du médecin
    let rdv = await Rdv.find({ medecinId: medecinId });
    if (rdv === null || rdv.length <= 0) {
      res.status(404).json({ message: "Aucun rendez-vous trouvé" });
      return;
    }

    // Chercher rdv avec une date spécifique
    if (date !== null) {
      // Transforme 2022-020-20T00:00:00.000Z en 2022-02-20
      rdv = rdv.filter(rdv => rdv.debut.toISOString().split("T")[0] === date);
    }
    if (rdv.length <= 0) {
      res.status(404).json({ message: "Aucun rendez-vous trouvé" });
      return;
    }

    // Réponse
    res.status(200).json(rdv);

  } catch (err) {
    next(err);
  }
}

/**
 * Récupérer les rendez-vous d'un patient
 */
const getRdvPatient = async (req, res, next) => {
  try {
    // Récupérer des paramètres
    const patientId = req.params.id;
    const date = req.query.date ?? null;

    // Vérifier si l'id est vide
    if (patientId === null) {
      res.status(400).json({ message: "Id du patient non spécifiée" });
      return;
    }

    // Trouver les rendez-vous du patient
    let rdv = await Rdv.find({ patientId: patientId });
    if (rdv === null || rdv.length <= 0) {
      res.status(404).json({ message: "Aucun rendez-vous trouvé" });
      return;
    }

    // Chercher rdv avec une date spécifique
    if (date !== null) {
      // Transforme 2022-020-20T00:00:00.000Z en 2022-02-20
      rdv = rdv.filter(rdv => rdv.debut.toISOString().split("T")[0] === date);
    }
    if (rdv.length <= 0) {
      res.status(404).json({ message: "Aucun rendez-vous trouvé" });
      return;
    }

    // Réponse
    res.status(200).json(rdv);
  }
  catch (err) {
    next(err);
  }
}

/**
 * Créer un rendez-vous
 */
const postRdv = async (req, res, next) => {
  try {
    // Récupération des données du rendez-vous
    const { patientId, medecinId, debut, notes } = req.body;

    // Vérifier si les champs sont vides
    const verification = veriferChamps(patientId, medecinId, debut, notes);
    if (verification === true) {
      res.status(400).json({ message: "Veuillez remplir tous les champs" });
      return;
    }

    // Gérer la date
    const dateRdv = parseDateRdv(debut);
    const dateFin = new Date(dateRdv.getTime() + 30 * 60000); // durée du rendez-vous = 30 minutes

    // Création du rendez-vous
    let nouveauRdv = new Rdv({
      patientId: patientId,
      medecinId: medecinId,
      debut: dateRdv,
      fin: dateFin,
      notes: notes
    });

    // Trouver rendez-vous du médecin
    const rdvMedecin = await Rdv.find({ medecinId: medecinId });

    // Vérifier si un rendez-vous du médecin est à la même heure que le nouveau rendez-vous
    for (let i = 0; i < rdvMedecin.length; i++) {
      const debutNouveauRdv = nouveauRdv.debut; // ex : 2021-05-05 12:10:00
      const finRdvActuel = rdvMedecin[i].fin; // ex : 2021-05-05 12:30:00

      if (debutNouveauRdv < finRdvActuel) { // ex : si 12:10 < 12:30 = conflit d'horaire
        res.status(400).json({ message: "Le médecin a déjà un rendez-vous à cette heure" });
        return;
      }
    }

    // Sauvegarder rdv
    nouveauRdv = await nouveauRdv.save();

    // Location 
    const location = `/rendezvous/${nouveauRdv._id}`;

    // Réponse
    res.set("Location", location)
    res.status(201).json(nouveauRdv);

  } catch (err) {
    next(err);
  }
}

/**
 * Supprimer un rendez-vous
 */
const deleteRdv = async (req, res, next) => {
  try {
    // Réupérer id du rendez-vous
    const rdvId = req.params.id;

    // Vérifier si l'id est vide
    if (rdvId === null) {
      res.status(400).json({ message: "Id du rendez-vous non spécifiée" });
      return;
    }

    // Trouver le rendez-vous
    const rdv = await Rdv.findById(rdvId);
    if (rdv === null) {
      res.status(404).json({ message: "Rendez-vous non trouvé" });
      return;
    }

    // Supprimer le rendez-vous
    await rdv.remove();

    // Réponse
    res.status(204).json({ message: "Rendez-vous supprimé" });

  }
  catch (err) {
    next(err);
  }
}

module.exports = {
  getRdv,
  getRdvMedecin,
  getRdvPatient,
  postRdv,
  deleteRdv
}