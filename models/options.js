const mongoose = require("mongoose");
// Importation du module mongoose pour la manipulation de la base de données MongoDB

const optionSchema = new mongoose.Schema({
  // Définition du schéma pour la collection 'options'

  optionBody: {
    type: String,
    required: true,
  },
  // Champ 'optionBody' de type String et requis

  isAnswer: {
    type: Boolean,
    default: false,
  },
  // Champ 'isAnswer' de type Boolean avec une valeur par défaut de 'false'

});
// Définition du schéma pour les options d'une question particulière

const Options = mongoose.model("Options", optionSchema);
// Création du modèle 'Options' à partir du schéma 'optionSchema'

module.exports = Options;
// Exportation du modèle 'Options'
