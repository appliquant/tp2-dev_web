"user strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const medecinRoutes = require("./routes/medecin");
const patientRoutes = require("./routes/patient");
const seed = require("./routes/db");

const app = express();
const port = 3000;

// Body parser
app.use(bodyParser.json());

// Headers pour les requêtes (cors)
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methodes", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

// Vérifier des headers
app.use((req, res, next) => {
	// Requête POST et PUT, header doit être "application/json"
	if (req.method === "POST" || req.method === "PUT") {
		if (req.headers["content-type"] !== "application/json") {
			return res.status(400).json({ message: "Content-Type doit être application/json" });
		}
	}
	next();
});


// Routes de l'application
app.use(medecinRoutes);
app.use(patientRoutes);
app.use(seed);

// Gestion des erreurs
app.use((error, req, res, next) => {
	const status = error.statusCode ? error.statusCode : 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({ message: message, data: data });
});

// Connexion à la base de données
mongoose.set("strictQuery", true);
mongoose
	// .connect("mongodb://127.0.0.1:27017/HealHub")
	.connect("mongodb+srv://psss:CVgF5NE1bbRmqxix@cluster-tp2-devweb.w4nl6ax.mongodb.net/test")
	.then(() => {
		app.listen(port);
		console.log("Serveur à l'écoute sur : http://localhost:" + port);
	});