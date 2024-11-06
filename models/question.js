const mongoose = require("mongoose");
// Importation du module mongoose pour la manipulation de la base de données MongoDB

const questionSchema = new mongoose.Schema(
  {
    // Définition du schéma pour la collection 'questions'

    questionBody: {
      type: String,
      required: true,
    },
    // Champ 'questionBody' de type String et requis, représentant le corps de la question

    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Options",
        required: true,
      },
    ],
    // Champ 'options' de type tableau qui contient des références aux objets 'Options' par leur ID
    // Ces options représentent les différentes réponses possibles à la question

    subject: {
      type: String,
      required: true,
    },
    // Champ 'subject' de type String et requis, représentant le sujet de la question

    weightage: {
      type: Number,
      default: 1,
    },
    // Champ 'weightage' de type Number avec une valeur par défaut de 1
    // Il représente le poids ou l'importance de la question

    explaination: {
      type: String,
      default: "No explaination given",
    },
    // Champ 'explaination' de type String avec une valeur par défaut de "No explanation given"
    // Il représente une explication associée à la question

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Champ 'createdBy' de type ObjectId qui fait référence à un objet 'User' par son ID
    // Il indique l'utilisateur qui a créé la question

    isDeleted: {
      type: Boolean,
      default: false,
    },
    // Champ 'isDeleted' de type Boolean avec une valeur par défaut de false
    // Il indique si la question a été supprimée ou non

  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);
// Définition du schéma pour les questions

const Question = mongoose.model("Question", questionSchema);
// Création du modèle 'Question' à partir du schéma 'questionSchema'

module.exports = Question;
// Exportation du modèle 'Question'
