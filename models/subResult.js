const mongoose = require("mongoose");
// Importation du module mongoose pour la manipulation de la base de données MongoDB

const subResultSchema = new mongoose.Schema({
  // Définition du schéma pour la collection 'subresults'

  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  // Champ 'questionId' de type ObjectId qui fait référence à un objet 'Question' par son ID
  // Il indique la question à laquelle ce sous-résultat est associé

  correctAnswer: {
    type: Array,
    required: true,
  },
  // Champ 'correctAnswer' de type tableau qui contient les réponses correctes pour la question
  // Il représente la réponse correcte pour ce sous-résultat

  response: {
    type: Array,
    required: true,
  },
  // Champ 'response' de type tableau qui contient les réponses fournies par l'utilisateur pour la question
  // Il représente la réponse fournie par l'utilisateur pour ce sous-résultat

  explaination: {
    type: String,
    default: "No explanation given",
  },
  // Champ 'explaination' de type chaîne de caractères (String) qui contient une explication pour le sous-résultat
  // Il représente l'explication associée à ce sous-résultat. Par défaut, il indique qu'aucune explication n'a été donnée.

  weightage: {
    type: Number,
    required: true,
  },
  // Champ 'weightage' de type nombre (Number) qui indique le poids ou la valeur de ce sous-résultat
  // Il représente le poids attribué à ce sous-résultat dans le calcul global du résultat

  isCorrect: {
    type: Boolean,
    required: true,
  },
  // Champ 'isCorrect' de type booléen (Boolean) qui indique si le sous-résultat est correct ou non
  // Il représente si la réponse fournie par l'utilisateur pour ce sous-résultat est correcte

});

const SubResult = mongoose.model("SubResult", subResultSchema);
// Création du modèle 'SubResult' à partir du schéma 'subResultSchema'

module.exports = SubResult;
// Exportation du modèle 'SubResult'
