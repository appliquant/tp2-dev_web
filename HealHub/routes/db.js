"use strict";

const express = require("express");

const seedController = require("../controllers/db.controller");

const router = express.Router();

router.get("/db/seed", seedController.seed);

module.exports = router;