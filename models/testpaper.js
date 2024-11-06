const mongoose = require("mongoose");
// Importation du module mongoose pour la manipulation de la base de données MongoDB

const testSchema = new mongoose.Schema(
  {
    // Définition du schéma pour la collection 'testpapers'

    title: {
      type: String,
      required: true,
    },
    // Champ 'title' de type chaîne de caractères (String) qui représente le titre du test
    // Il est requis (required) pour créer un document de test

    category: {
      type: String,
      required: true,
    },
    // Champ 'category' de type chaîne de caractères (String) qui représente la catégorie du test
    // Il est requis (required) pour créer un document de test

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    // Champ 'questions' de type tableau qui contient les références aux questions associées au test
    // Chaque élément du tableau est un ObjectId faisant référence à un document 'Question'

    pdf: {
      type: String,
    },
    // Champ 'pdf' de type chaîne de caractères (String) qui représente le lien ou le chemin vers un fichier PDF associé au test

    subject: {
      type: String,
      required: true,
    },
    // Champ 'subject' de type chaîne de caractères (String) qui représente le sujet du test
    // Il est requis (required) pour créer un document de test

    duration: {
      type: Number,
      required: true,
    },
    // Champ 'duration' de type nombre (Number) qui représente la durée du test en minutes
    // Il est requis (required) pour créer un document de test

    isTestBegins: {
      type: Boolean,
      default: false,
    },
    // Champ 'isTestBegins' de type booléen (Boolean) qui indique si le test a commencé ou non
    // Par défaut, sa valeur est false

    isRegistrationAvailable: {
      type: Boolean,
      default: false,
    },
    // Champ 'isRegistrationAvailable' de type booléen (Boolean) qui indique si l'inscription au test est disponible ou non
    // Par défaut, sa valeur est false

    isTestConducted: {
      type: Boolean,
      default: false,
    },
    // Champ 'isTestConducted' de type booléen (Boolean) qui indique si le test a été réalisé ou non
    // Par défaut, sa valeur est false

    isSnapshots: {
      type: Boolean,
      default: false,
    },
    // Champ 'isSnapshots' de type booléen (Boolean) qui indique si des captures d'écran sont prises pendant le test ou non
    // Par défaut, sa valeur est false

    paperType: {
      type: String,
      required: true,
    },
    // Champ 'paperType' de type chaîne de caractères (String) qui représente le type de papier du test (organisation, groupe ou devoir)
    // Il est requis (required) pour créer un document de test

    isAudioRec: {
      type: Boolean,
      default: false,
    },
    // Champ 'isAudioRec' de type booléen (Boolean) qui indique si l'enregistrement audio est activé pendant le test ou non
    // Par défaut, sa valeur est false

    startTime: {
      type: Date,
      required: true,
    },
    // Champ 'startTime' de type Date qui représente l'heure de début du test
    // Il est requis (required) pour créer un document de test

    maxMarks: {
      type: Number,
      required: true,
    },
    // Champ 'maxMarks' de type nombre (Number) qui représente le nombre maximum de points attribuables au test
    // Il est requis (required) pour créer un document de test
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);
// Le deuxième argument de mongoose.Schema indique les options supplémentaires
// Ici, on utilise l'option 'timestamps' pour inclure automatiquement les horodatages de création et de mise à jour

const TestPaper = mongoose.model("TestPaper", testSchema);
// Création du modèle 'TestPaper' à partir du schéma 'testSchema'

module.exports = TestPaper;
// Exportation du modèle 'TestPaper'
