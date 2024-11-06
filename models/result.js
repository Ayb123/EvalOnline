const mongoose = require("mongoose");
// Importation du module mongoose pour la manipulation de la base de données MongoDB

const { ObjectId } = mongoose.Schema.Types;

const resultSchema = new mongoose.Schema({
  // Définition du schéma pour la collection 'results'

  testId: {
    type: ObjectId,
    ref: "TestPaper",
    required: true,
  },
  // Champ 'testId' de type ObjectId qui fait référence à un objet 'TestPaper' par son ID
  // Il indique le test auquel ce résultat est associé

  studentId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  // Champ 'studentId' de type ObjectId qui fait référence à un objet 'User' par son ID
  // Il indique l'étudiant auquel ce résultat est associé

  responseSheet: {
    type: ObjectId,
    ref: "ResponseSheet",
  },
  // Champ 'responseSheet' de type ObjectId qui fait référence à un objet 'ResponseSheet' par son ID
  // Il représente la feuille de réponse associée à ce résultat (facultatif)

  subResult: [
    {
      type: ObjectId,
      ref: "SubResult",
    },
  ],
  // Champ 'subResult' de type tableau qui contient des références aux objets 'SubResult' par leur ID
  // Il représente les sous-résultats associés à ce résultat

  score: {
    type: Number,
    required: true,
  },
  // Champ 'score' de type Number qui représente le score obtenu dans ce résultat
  // Il est obligatoire d'avoir une valeur de score

});

const Result = mongoose.model("Result", resultSchema);
// Création du modèle 'Result' à partir du schéma 'resultSchema'

module.exports = Result;
// Exportation du modèle 'Result'
