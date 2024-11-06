const jwt = require("jsonwebtoken");
// Importation du module jsonwebtoken pour la gestion des tokens JWT

const { jwtPrivateKey } = require("../config/keys");
// Importation de la clé privée JWT depuis le fichier de configuration keys

const { User } = require("../models/user");
// Importation du modèle User depuis le fichier user.js dans le répertoire models

module.exports = async function (req, res, next) {
  // Exportation de la fonction middleware avec trois paramètres : req (request), res (response), next (callback)

  const token = req.header("x-auth-token");
  // Récupération du token d'authentification à partir de l'en-tête de la requête

  if (!token) return res.status(401).send("Access denied. No token provided.");
  // Vérifie si aucun token n'est fourni dans l'en-tête de la requête
  // Si aucun token n'est fourni, renvoie une réponse avec le statut 401 (Unauthorized) et un message "Access denied. No token provided."

  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    // Vérification et décodage du token à l'aide de la clé privée JWT
    // Le résultat du décodage est stocké dans la variable 'decoded'

    const { _id } = decoded;
    // Extraction de l'identifiant utilisateur (_id) du contenu décodé du token

    req.user = await User.findById(_id);
    // Recherche de l'utilisateur correspondant à l'identifiant (_id) dans la base de données à l'aide du modèle User
    // L'utilisateur trouvé est stocké dans la propriété 'user' de l'objet 'req' (request)

    next();
    // Appel de la fonction 'next' pour passer au middleware ou à la route suivante dans la chaîne de traitement de la requête
  } catch (ex) {
    return res.status(400).send("Invalid token.");
    // Si une erreur se produit lors de la vérification du token ou de la recherche de l'utilisateur,
    // renvoie une réponse avec le statut 400 (Bad Request) et un message "Invalid token."
  }
};
