module.exports = function (req, res, next) {
  // Une fonction middleware avec trois paramètres : req (request), res (response), next (callback)
//Un middleware est une fonction intermédiaire qui peut être utilisée dans le flux de traitement des requêtes dans une application web. Il s'agit d'un concept couramment utilisé dans les frameworks web pour gérer les requêtes HTTP de manière modulaire et flexible.
  if (req.user.category !== "ADMIN") {
    // Vérifie si la propriété 'category' de l'objet 'user' de la requête n'est pas égale à "ADMIN"
    // Cela implique que l'utilisateur n'a pas les privilèges d'administrateur

    return res.status(403).send("Access denied");
    // Si l'utilisateur n'a pas les privilèges d'administrateur, renvoie une réponse avec le statut 403 (Forbidden) et un message "Access denied"
    // Le traitement de la requête s'arrête ici et la réponse est renvoyée sans exécuter les middleware ou les routes suivantes
  }

  // Si l'utilisateur a les privilèges d'administrateur, passe au middleware ou à la route suivante
  next();
};
