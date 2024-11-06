const mongoose = require("mongoose"); // Importe le module mongoose pour la gestion de la base de données MongoDB
const express = require("express"); // Importe le module express pour la création d'une application web
const bodyParser = require("body-parser"); // Importe le module body-parser pour l'analyse des données du corps de la requête
const { MONOGOURI } = require("./config/keys"); // Importe la clé de connexion à la base de données depuis le fichier de configuration
const createadmin = require("./services/createAdmin"); // Importe le service de création d'administrateur
const app = express(); // Crée une instance d'application Express

const login = require("./routes/login"); // Importe le module de gestion des routes pour la connexion
const signup = require("./routes/signup"); // Importe le module de gestion des routes pour l'inscription
const question = require("./routes/question"); // Importe le module de gestion des routes pour les questions
const testpaper = require("./routes/testPaper"); // Importe le module de gestion des routes pour les tests
const student = require("./routes/student"); // Importe le module de gestion des routes pour les étudiants
const result = require("./routes/result"); // Importe le module de gestion des routes pour les résultats
const admin = require("./routes/admin"); // Importe le module de gestion des routes pour les administrateurs
const snapshots = require("./routes/snapshots"); // Importe le module de gestion des routes pour les captures d'écran
const audio = require("./routes/audio"); // Importe le module de gestion des routes pour l'audio

const groups = require("./routes/group"); // Importe le module de gestion des routes pour les groupes
const PORT = process.env.PORT || 3900; // Définit le numéro de port pour l'application

mongoose
  .connect(MONOGOURI, { useUnifiedTopology: true, useNewUrlParser: true }) // Connecte l'application à la base de données MongoDB en utilisant l'URL de connexion et les options spécifiées
  .then(() => console.log("Connected to MongoDB...")) // Affiche un message si la connexion à la base de données est réussie
  .catch((err) => console.error("Could not connect to MongoDB...")); // Affiche une erreur si la connexion à la base de données échoue

app.use(bodyParser.json({ limit: "50mb" })); // Utilise body-parser pour analyser les données JSON du corps de la requête avec une limite de taille de 50 Mo
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
); // Utilise body-parser pour analyser les données URL encodées du corps de la requête avec une limite de taille de 50 Mo et des paramètres étendus
app.use(express.json()); // Utilise express pour analyser les données JSON du corps de la requête
app.use("/api/login", login); // Utilise le module de gestion des routes pour la route "/api/login"
app.use("/api/signup", signup); // Utilise le module de gestion des routes pour la route "/api/signup"
app.use("/api/questions", question); // Utilise le module de gestion des routes pour la route "/api/questions"
app.use("/api/test", testpaper); // Utilise le module de gestion des routes pour la route "/api/test"
app.use("/api/student", student); // Utilise le module de gestion des routes pour la route "/api/student"
app.use("/api/result", result); // Utilise le module de gestion des routes pour la route "/api/result"
app.use("/api/supervisor", admin); // Utilise le module de gestion des routes pour la route "/api/supervisor"
app.use("/api/snapshot", snapshots); // Utilise le module de gestion des routes pour la route "/api/snapshot"
app.use("/api/audio", audio); // Utilise le module de gestion des routes pour la route "/api/audio"

app.use("/api/groups", groups); // Utilise le module de gestion des routes pour la route "/api/groups"
createadmin(); // Crée un administrateur

if (process.env.NODE_ENV == "production") { // Vérifie si l'application est en mode production
  app.use(express.static("client/build")); // Utilise le dossier "client/build" pour servir les fichiers statiques
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html")); // Renvoie le fichier "index.html" pour toutes les autres routes
  });
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`)); // Écoute les connexions sur le port spécifié et affiche un message lorsque le serveur démarre
