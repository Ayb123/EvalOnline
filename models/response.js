const mongoose = require("mongoose");
// Importation du module mongoose pour la manipulation de la base de données MongoDB

const responseSchema = new mongoose.Schema({
  // Définition du schéma pour la collection 'responses'

  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  // Champ 'questionId' de type ObjectId qui fait référence à un objet 'Question' par son ID
  // Il indique la question à laquelle la réponse est associée

  chosenOption: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Options",
    },
  ],
  // Champ 'chosenOption' de type tableau qui contient des références aux objets 'Options' par leur ID
  // Il représente les options choisies par l'étudiant pour cette question

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // Champ 'studentId' de type ObjectId qui fait référence à un objet 'User' par son ID
  // Il indique l'étudiant qui a soumis cette réponse

  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestPaper",
  },
  // Champ 'testId' de type ObjectId qui fait référence à un objet 'TestPaper' par son ID
  // Il indique l'examen ou le test auquel cette réponse est associée

});

const Response = mongoose.model("Response", responseSchema);
// Création du modèle 'Response' à partir du schéma 'responseSchema'

module.exports = Response;
// Exportation du modèle 'Response'
