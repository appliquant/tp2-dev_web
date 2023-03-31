"use strict";

const express = require("express");

const patientController = require("../controllers/patientController");

const router = express.Router();

// GET /patients (récupérer la liste des patients)
router.get("/patients", patientController.getPatients);

// GET /patients/:id (récupérer un patient en particulier)
router.get("/patients/:id", patientController.getPatient);

// POST /patients (créer un patient)
router.post("/patients", patientController.postPatient)

// PUT /patients/:id (modifier un patient)
router.put("/patients/:id", patientController.putPatient);

// POST /patients/:id/historique (ajouter un élément à l'historique d'un patient)
router.post("/patients/:id/historique", patientController.postPatientHistorique);

module.exports = router;