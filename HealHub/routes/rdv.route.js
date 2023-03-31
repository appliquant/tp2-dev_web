"use strict";

const express = require("express");
const rdvController = require("../controllers/rdv.controller");
const Router = express.Router();

// GET /rendezvous:id (récupérer un rendez-vous en particulier)
Router.get("/rendezvous/:id", rdvController.getRdv);

// GET /rendezvous/medecins/:id (récupérer les rendez-vous d'un médecin)
Router.get("/rendezvous/medecins/:id", rdvController.getRdvMedecin);

// GET /rendezvous/patients/:id (récupérer les rendez-vous d'un patient)
Router.get("/rendezvous/patients/:id", rdvController.getRdvPatient);

// POST /rendezvous (créer un rendez-vous)
Router.post("/rendezvous", rdvController.postRdv);

// DELETE /rendezvous/:id (supprimer un rendez-vous)
Router.delete("/rendezvous/:id", rdvController.deleteRdv);

module.exports = Router;
