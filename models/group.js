const mongoose = require('mongoose');
// Importation du module mongoose pour la manipulation de la base de données MongoDB

const Joi = require('joi');
// Importation du module Joi pour la validation des données

const groupSchema = new mongoose.Schema({
  // Définition du schéma de la collection 'groups'

  groupCode: {
    type: String,
    required: true
  },
  // Champ 'groupCode' de type String et requis

  groupName: {
    type: String,
    required: true
  },
  // Champ 'groupName' de type String et requis

  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  // Champ 'students' de type tableau qui contient des références aux objets 'User' par leur ID

  tests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TestPaper'
  }]
  // Champ 'tests' de type tableau qui contient des références aux objets 'TestPaper' par leur ID

}, { timestamps: { createdAt: true, updatedAt: false }});
// Option pour inclure un champ 'createdAt' qui enregistre la date de création automatiquement

const Group = mongoose.model('Group', groupSchema);
// Création du modèle 'Group' à partir du schéma 'groupSchema'

function validateGroup(group) {
  const schema = Joi.object({
    groupCode: Joi.string().required(),
    groupName: Joi.string().required()
  });
  // Définition du schéma de validation pour les champs 'groupCode' et 'groupName'

  return schema.validate(group);
  // Validation du groupe à l'aide du schéma Joi
}

module.exports = {
  Group,
  validateGroup
};
// Exportation du modèle 'Group' et de la fonction de validation 'validateGroup'
