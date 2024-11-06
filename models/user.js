const mongoose = require("mongoose");
// Importation du module mongoose pour la manipulation de la base de données MongoDB

const userSchema = new mongoose.Schema(
  {
    // Définition du schéma pour la collection 'users'

    name: {
      type: String,
      required: true,
    },
    // Champ 'name' de type chaîne de caractères (String) qui représente le nom de l'utilisateur
    // Il est requis (required) pour créer un document d'utilisateur

    email: {
      type: String,
      required: true,
    },
    // Champ 'email' de type chaîne de caractères (String) qui représente l'adresse e-mail de l'utilisateur
    // Il est requis (required) pour créer un document d'utilisateur

    password: {
      type: String,
      required: true,
    },
    // Champ 'password' de type chaîne de caractères (String) qui représente le mot de passe de l'utilisateur
    // Il est requis (required) pour créer un document d'utilisateur

    category: {
      type: String,
      required: true,
    },
    // Champ 'category' de type chaîne de caractères (String) qui représente la catégorie de l'utilisateur
    // Il est requis (required) pour créer un document d'utilisateur
    // Les valeurs possibles peuvent être 'admin', 'supervisor' ou 'student'

    supervisorPerm: {
      type: Boolean,
      default: false,
    },
    // Champ 'supervisorPerm' de type booléen (Boolean) qui indique si l'utilisateur a des permissions de superviseur
    // Par défaut, sa valeur est false

    group: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    // Champ 'group' de type tableau qui contient les références aux groupes auxquels l'utilisateur appartient
    // Chaque élément du tableau est un ObjectId faisant référence à un document 'Group'

    testId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestPaper",
      },
    ],
    // Champ 'testId' de type tableau qui contient les références aux tests auxquels l'utilisateur est inscrit
    // Chaque élément du tableau est un ObjectId faisant référence à un document 'TestPaper'
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);
// Le deuxième argument de mongoose.Schema indique les options supplémentaires
// Ici, on utilise l'option 'timestamps' pour inclure automatiquement les horodatages de création et de mise à jour

const User = mongoose.model("User", userSchema);
// Création du modèle 'User' à partir du schéma 'userSchema'

module.exports = {
  User,
};
// Exportation du modèle 'User'
