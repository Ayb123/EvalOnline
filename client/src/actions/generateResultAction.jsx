import * as gen_result from '../constants/generateResultConstant'; // Importe les constantes liées à la génération de résultats
import http from '../utils/httpService'; // Importe le module httpService personnalisé pour les requêtes HTTP
import errorHandler from '../errorHandler'; // Importe le gestionnaire d'erreurs personnalisé
import { toast } from 'react-toastify'; // Importe le module toast de react-toastify pour afficher des notifications
import Token from '../utils/Token'; // Importe le module Token personnalisé pour la gestion des jetons d'authentification

export const resultGenerate = ({ testId, studentId }) => async dispatch => {
  try {
    dispatch({ type: gen_result.GENERATE_RESULT_REQUEST }); // Dispatche une action pour indiquer le début de la génération des résultats

    const { data } = await http.post(
      '/api/result/generateresult',
      {
        testId,
        studentId,
      },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/result/generateresult' avec les données testId et studentId, et utilise le jeton d'authentification

    dispatch({ type: gen_result.GENERATE_RESULT_SUCCESS, payload: data }); // Dispatche une action pour indiquer la réussite de la génération des résultats et envoie les données des résultats générés
    toast.success('Result Generated'); // Affiche une notification de succès
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const resultGeneratePdf = async (testId, studentId) => {
  try {
    const { data } = await http.post(
      '/api/result/generateresult/pdf',
      {
        testId,
        studentId,
      },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/result/generateresult/pdf' avec les données testId et studentId, et utilise le jeton d'authentification
    //console.log(data);
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getScore = async testId => {
  try {
    const { data } = await http.post(
      '/api/result/all/score',
      {
        testId,
      },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/result/all/score' avec les données testId, et utilise le jeton d'authentification
    return data; // Retourne les données récupérées de la réponse de la requête
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const editResultScore = async (testId, studentId, score) => {
  try {
    const { data } = await http.post(
      '/api/result/edit/score',
      {
        testId,
        studentId,
        score,
      },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/result/edit/score' avec les données testId, studentId et score, et utilise le jeton d'authentification
    toast.success(data); // Affiche une notification de succès avec le message de la réponse de la requête
    getRanksOfStudent(); // Appelle la fonction getRanksOfStudent pour obtenir les classements des étudiants
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getRanksOfStudent = async testId => {
  try {
    const { data } = await http.post(
      '/api/result/students/rank',
      { testId },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/result/students/rank' avec les données testId, et utilise le jeton d'authentification
    return data; // Retourne les données récupérées de la réponse de la requête
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};
