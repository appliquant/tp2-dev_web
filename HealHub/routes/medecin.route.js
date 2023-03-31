"use strict";

const express = require("express");

const medecinController = require("../controllers/medecin.controller");

const router = express.Router();

// GET /medecins (récupérer la liste des médecins)
router.get("/medecins", medecinController.getMedecins);

// GET /medecins/:id (récupérer un médecin en particulier)
router.get("/medecins/:id", medecinController.getMedecin);

// POST /medecins (créer un médecin)
router.post("/medecins", medecinController.postMedecin)

// PUT /medecins/:id (modifier un médecin)
router.put("/medecins/:id", medecinController.putMedecin);

// DELETE /medecins/:id (supprimer un médecin)
router.delete("/medecins/:id", medecinController.deleteMedecin);

module.exports = router;