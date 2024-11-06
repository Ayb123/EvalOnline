if (process.env.NODE_ENV === "production") {
  // Si l'environnement de production est détecté
  // Exporte les configurations de production depuis le fichier "./prod"
  module.exports = require("./prod");
} else {
  // Sinon, si l'environnement de développement est détecté
  // Exporte les configurations de développement depuis le fichier "./dev"
  module.exports = require("./dev");
}
