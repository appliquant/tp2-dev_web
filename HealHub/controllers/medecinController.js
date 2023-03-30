"use strict";

const Medecin = require("../models/medecin");

exports.getMedecins = (req, res, next) => {
    
	
	Medecin.find()
		.then(medecins => {
			res.status(201).json(medecins);
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});

};






