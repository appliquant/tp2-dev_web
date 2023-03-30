"use strict";

const Patient = require("../models/patient");


exports.getPatients = (req, res, next) => {

	const medecin = req.query.specialite;
	let filter = {};

	if(medecin){
		filter = {medecin : {$eq: medecin}};
	}

	console.log(filter);


	Patient.find(filter)
		.then(Patients => {
			res.status(201).json(Patients);
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});


};




