"use strict";

const express = require("express");

const medecinController = require("../controllers/medecinController");

const router = express.Router();

// GET /medecins
router.get("/medecins", medecinController.getMedecins);

// Post /medecins
router.post("/medecins", medecinController.postMedecin)

module.exports = router;