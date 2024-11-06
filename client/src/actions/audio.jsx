import http from '../utils/httpService'; // Importe le module httpService personnalisé pour les requêtes HTTP
import errorHandler from '../errorHandler'; // Importe le gestionnaire d'erreurs personnalisé
import Token from '../utils/Token'; // Importe le module Token personnalisé pour la gestion des jetons d'authentification

export const uploadAudio = async (testId, studentId, audioRecording) => {
  try {
    const { data } = await http.post(
      '/api/audio/upload',
      {
        testId,
        studentId,
        audioRecording,
      },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/audio/upload' avec les données testId, studentId et audioRecording, et utilise le jeton d'authentification
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getAllAudioRec = async (testId, studentId) => {
  try {
    const { data } = await http.post(
      '/api/audio/get/all',
      {
        testId,
        studentId,
      },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/audio/get/all' avec les données testId et studentId, et utilise le jeton d'authentification
    return data; // Retourne les données récupérées de la réponse de la requête
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};
