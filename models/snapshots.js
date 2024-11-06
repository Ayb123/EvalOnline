const mongoose = require("mongoose");
// Importation du module mongoose pour la manipulation de la base de données MongoDB

const snapShotSchema = new mongoose.Schema(
  {
    // Définition du schéma pour la collection 'snapshots'

    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestPaper",
      required: true,
    },
    // Champ 'testId' de type ObjectId qui fait référence à un objet 'TestPaper' par son ID
    // Il indique le test auquel cette capture d'écran est associée

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Champ 'studentId' de type ObjectId qui fait référence à un objet 'User' par son ID
    // Il indique l'étudiant auquel cette capture d'écran est associée

    images: [
      {
        type: String,
        required: true,
      },
    ],
    // Champ 'images' de type tableau qui contient des chemins ou emplacements de fichiers images (String)
    // Il représente les images capturées pour ce test par l'étudiant

  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Snapshots = mongoose.model("Snapshots", snapShotSchema);
// Création du modèle 'Snapshots' à partir du schéma 'snapShotSchema'

module.exports = Snapshots;
// Exportation du modèle 'Snapshots'
