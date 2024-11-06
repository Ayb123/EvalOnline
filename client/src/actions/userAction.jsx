// Import des modules nécessaires
import http from '../utils/httpService'; // Import du module httpService depuis le fichier '../utils/httpService'
import { toast } from 'react-toastify'; // Import du module toast depuis la bibliothèque 'react-toastify'
import { QUESTION_LIST_RESET } from '../constants/questionConstant'; // Import de la constante QUESTION_LIST_RESET depuis le fichier '../constants/questionConstant'
import { TEST_LIST_RESET } from '../constants/testConstant'; // Import de la constante TEST_LIST_RESET depuis le fichier '../constants/testConstant'
import { STUDENT_TEST_LIST_RESET } from '../constants/studentRegistrationConstant'; // Import de la constante STUDENT_TEST_LIST_RESET depuis le fichier '../constants/studentRegistrationConstant'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/userConstanst'; // Import des constantes USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS et USER_LOGOUT depuis le fichier '../constants/userConstanst'
import { GROUP_RESET } from '../constants/groupConstant'; // Import de la constante GROUP_RESET depuis le fichier '../constants/groupConstant'
import errorHandler from '../errorHandler'; // Import de la fonction errorHandler depuis le fichier '../errorHandler'

// Fonction asynchrone pour l'enregistrement d'un utilisateur
export const userRegister = async (newUser, history) => {
  try {
    // Appel d'une requête POST asynchrone vers '/api/signup' avec les données de newUser
    await http.post('/api/signup', newUser);

    // Affichage d'une notification de succès
    toast.success('Successfully Register');

    // Redirection vers la page de connexion ('/login')
    history.push('/login');
  } catch (ex) {
    // Gestion des erreurs avec la fonction errorHandler
    errorHandler(ex);
  }
};

// Fonction pour la connexion d'un utilisateur
export const login = (email, password) => async dispatch => {
  try {
    // Déclenchement de l'action USER_LOGIN_REQUEST pour indiquer le début de la requête de connexion
    dispatch({ type: USER_LOGIN_REQUEST });

    // Appel d'une requête POST asynchrone vers '/api/login' avec les données de l'email et du mot de passe
    const { data } = await http.post('/api/login', { email, password });

    // Déclenchement de l'action USER_LOGIN_SUCCESS avec les données renvoyées par la requête
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // Affichage d'une notification de succès
    toast.success('Successfully login');

    // Stockage des informations de l'utilisateur dans le stockage local du navigateur
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (ex) {
    // Gestion des erreurs avec la fonction errorHandler
    errorHandler(ex);
  }
};

// Fonction pour la déconnexion de l'utilisateur
export const logout = () => async dispatch => {
  // Suppression des informations de l'utilisateur du stockage local du navigateur
  localStorage.removeItem('userInfo');

  // Déclenchement des actions de réinitialisation des différentes constantes
  dispatch({ type: QUESTION_LIST_RESET });
  dispatch({ type: TEST_LIST_RESET });
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: GROUP_RESET });
  dispatch({ type: STUDENT_TEST_LIST_RESET });
  dispatch({ type: 'SET_URL_RESET' });
};
