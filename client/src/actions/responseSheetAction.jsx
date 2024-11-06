import http from '../utils/httpService'; // Importe le module httpService personnalisé pour les requêtes HTTP
import errorHandler from '../errorHandler'; // Importe le gestionnaire d'erreurs personnalisé
import { toast } from 'react-toastify'; // Importe le module toast de react-toastify pour afficher des notifications
import Token from '../utils/Token'; // Importe le module Token personnalisé pour la gestion des jetons d'authentification

export const responseSheetOfStudent = async ({ studentId, testId }) => {
  try {
    const { data } = await http.post(
      '/api/student/responseSheet',
      {
        studentId,
        testId,
      },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/student/responseSheet' avec les données studentId et testId, et utilise le jeton d'authentification

    toast.success(data); // Affiche une notification de succès
    return data;
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getResponsePdf = async (studentId, testId) => {
  try {
    const { data } = await http.post(
      '/api/student/responseSheet/pdf',
      {
        studentId,
        testId,
      },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/student/responseSheet/pdf' avec les données studentId et testId, et utilise le jeton d'authentification

    return data;
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const addAnswerForGivenQuestion = async body => {
  try {
    const { data } = await http.post(
      '/api/student/updateResponse',
      body,
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/student/updateResponse' avec les données body, et utilise le jeton d'authentification

    toast.success(data); // Affiche une notification de succès
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const uploadPdf = async (testId, studentId, pdf) => {
  try {
    const { data } = await http.post(
      '/api/student/pdf/upload',
      {
        testId,
        studentId,
        pdf,
      },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/student/pdf/upload' avec les données testId, studentId et pdf, et utilise le jeton d'authentification

    toast.success(`ResponseSheet uploaded successfully`); // Affiche une notification de succès
    return data;
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const checkGivenTestForStudent = async (testId, studentId) => {
  try {
    const { data } = await http.post(
      '/api/student/test/complete',
      { testId, studentId },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/student/test/complete' avec les données testId et studentId, et utilise le jeton d'authentification

    return data;
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};
