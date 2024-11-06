module.exports = function (req, res, next) {
  // Exporte une fonction middleware avec trois paramètres : req (request), res (response), next (callback)

  if (req.user.category !== "SUPERVISOR" || req.user.supervisorPerm === false) {
    // Vérifie si la propriété 'category' de l'objet 'user' de la requête n'est pas égale à "SUPERVISOR"
    // OU si la propriété 'supervisorPerm' de l'objet 'user' de la requête est évaluée à 'false'
    // Cela signifie que l'utilisateur n'a pas les permissions de superviseur requises

    return res.status(403).send("Permission not granted");
    // Si l'utilisateur n'a pas les permissions de superviseur requises, renvoie une réponse avec le statut 403 (Forbidden) et un message "Permission not granted"
    // Le traitement de la requête s'arrête ici et la réponse est renvoyée sans exécuter les middleware ou les routes suivantes
  }

  // Si l'utilisateur a les permissions de superviseur requises, passe au middleware ou à la route suivante
  next();
};
