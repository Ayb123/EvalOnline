const mongoose = require("mongoose");
// Importation du module mongoose pour la manipulation de la base de données MongoDB

const responseSheetSchema = new mongoose.Schema({
  // Définition du schéma pour la collection 'responseSheets'

  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestPaper",
    required: true,
  },
  // Champ 'testId' de type ObjectId qui fait référence à un objet 'TestPaper' par son ID
  // Il indique le test auquel cette feuille de réponse est associée

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Champ 'studentId' de type ObjectId qui fait référence à un objet 'User' par son ID
  // Il indique l'étudiant qui a rempli cette feuille de réponse

  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  ],
  // Champ 'questions' de type tableau qui contient des références aux objets 'Question' par leur ID
  // Il représente les questions présentes dans cette feuille de réponse

  responses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Response",
      required: true,
    },
  ],
  // Champ 'responses' de type tableau qui contient des références aux objets 'Response' par leur ID
  // Il représente les réponses fournies par l'étudiant dans cette feuille de réponse

  pdf: {
    type: String,
  },
  // Champ 'pdf' de type String qui représente le chemin ou l'emplacement du fichier PDF associé à cette feuille de réponse

  isCompleted: {
    type: Boolean,
    default: false,
  },
  // Champ 'isCompleted' de type Boolean qui indique si l'étudiant a soumis ou complété la feuille de réponse
  // La valeur par défaut est définie sur 'false'

});

const ResponseSheet = mongoose.model("ResponseSheet", responseSheetSchema);
// Création du modèle 'ResponseSheet' à partir du schéma 'responseSheetSchema'

module.exports = ResponseSheet;
// Exportation du modèle 'ResponseSheet'
