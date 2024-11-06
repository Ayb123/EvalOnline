import http from '../utils/httpService'; // Importe le module httpService personnalisé pour les requêtes HTTP
import errorHandler from '../errorHandler'; // Importe le gestionnaire d'erreurs personnalisé
import Token from '../utils/Token'; // Importe le module Token personnalisé pour la gestion des jetons d'authentification

export const uploadImage = async (testId, studentId, image) => {
  try {
    const { data } = await http.post(
      '/api/snapshot/upload',
      {
        testId,
        studentId,
        image,
      },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/snapshot/upload' avec les données testId, studentId et image, et utilise le jeton d'authentification
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getAllImages = async (testId, studentId) => {
  try {
    const { data } = await http.post(
      '/api/snapshot/get/all',
      {
        testId,
        studentId,
      },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/snapshot/get/all' avec les données testId et studentId, et utilise le jeton d'authentification

    return data;
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};
