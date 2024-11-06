import * as question from '../constants/questionConstant'; // Importe les constantes liées aux questions
import http from '../utils/httpService'; // Importe le module httpService personnalisé pour les requêtes HTTP
import { toast } from 'react-toastify'; // Importe le module toast de react-toastify pour afficher des notifications
import { getNotConductedTestPaper } from './testAction'; // Importe l'action getNotConductedTestPaper depuis le fichier testAction
import Token from '../utils/Token'; // Importe le module Token personnalisé pour la gestion des jetons d'authentification
import errorHandler from '../errorHandler'; // Importe le gestionnaire d'erreurs personnalisé

export const addQuestion = (questions, newQuestion) => async dispatch => {
  try {
    const { data } = await http.post(
      '/api/questions/create',
      newQuestion,
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/questions/create' avec les données newQuestion, et utilise le jeton d'authentification

    const arr = [...questions];
    arr.push(data);
    dispatch({
      type: question.QUESTION_LIST_SUCCESS,
      payload: arr,
    }); // Dispatche une action pour indiquer le succès de l'ajout de la question et envoie les données mises à jour des questions
    //dispatch(getAllQuestions());
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getAllQuestions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: question.QUESTION_LIST_REQUEST }); // Dispatche une action pour indiquer la demande de la liste des questions

    const { data } = await http.get('/api/questions/details/all', Token()); // Effectue une requête GET à l'endpoint '/api/questions/details/all' avec le jeton d'authentification

    dispatch({
      type: question.QUESTION_LIST_SUCCESS,
      payload: data,
    }); // Dispatche une action pour indiquer le succès de la récupération de la liste des questions et envoie les données des questions
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const deleteQuestion = (questions, id) => async (dispatch, getState) => {
  try {
    const { data } = await http.delete(`/api/questions/delete/${id}`, Token()); // Effectue une requête DELETE à l'endpoint '/api/questions/delete/${id}' avec le jeton d'authentification
    const arr = questions.filter(ques => ques._id !== id); // Filtre les questions pour supprimer celle avec l'id spécifié

    dispatch({ type: question.QUESTION_LIST_SUCCESS, payload: arr }); // Dispatche une action pour indiquer le succès de la suppression de la question et envoie les données mises à jour des questions
    dispatch(getNotConductedTestPaper()); // Appelle l'action getNotConductedTestPaper pour mettre à jour les tests non réalisés

    toast.success(data); // Affiche une notification de succès
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};
