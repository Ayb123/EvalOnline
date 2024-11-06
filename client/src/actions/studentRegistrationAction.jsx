import * as student_reg from '../constants/studentRegistrationConstant'; // Importe les constantes liées à l'inscription des étudiants
import * as test from '../constants/testConstant'; // Importe les constantes liées aux tests
import http from '../utils/httpService'; // Importe le module httpService personnalisé pour les requêtes HTTP
import Token from '../utils/Token'; // Importe le module Token personnalisé pour la gestion des jetons d'authentification
import errorHandler from '../errorHandler'; // Importe le gestionnaire d'erreurs personnalisé
import { toast } from 'react-toastify'; // Importe le module toast de react-toastify pour les notifications

export const studentRegistrationForTest = async (students, history) => {
  try {
    const testId = students.testId;
    const { data } = await http.post('/api/student/register', students); // Effectue une requête POST à l'endpoint '/api/student/register' avec les données des étudiants
    toast.success(data); // Affiche une notification de succès
    history.push(`/student/registration/test/${testId}/emailsent`); // Redirige l'utilisateur vers une autre page
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const openRegistrationforTest = ({
  testPapers,
  id,
  status,
}) => async dispatch => {
  try {
    const { data } = await http.post(
      '/api/test/change-registration-status',
      { id, status },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/test/change-registration-status' avec les données id et status, et utilise le jeton d'authentification

    const arr = [...testPapers];
    const index = arr.findIndex(test => test._id === id);

    arr[index].isRegistrationAvailable = status;

    dispatch({
      type: test.TEST_LIST_SUCCESS,
      payload1: arr,
    });
    toast.success(data); // Affiche une notification de succès
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getStudentDetail = id => async dispatch => {
  try {
    dispatch({ type: student_reg.STUDENT_DETAIL_REQUEST });

    const { data } = await http.post('/api/student/details', { id }, Token()); // Effectue une requête POST à l'endpoint '/api/student/details' avec les données id, et utilise le jeton d'authentification

    dispatch({
      type: student_reg.STUDENT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const downloadResult = async testId => {
  try {
    const { data } = await http.post(
      '/api/result/download',
      { testId },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/result/download' avec les données testId, et utilise le jeton d'authentification
    return data;
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getAllRegisteredStudent = testId => async dispatch => {
  try {
    dispatch({ type: student_reg.GET_ALL_REGISTERED_REQUEST });

    const { data } = await http.post(
      '/api/test/students/all',
      { testId },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/test/students/all' avec les données testId, et utilise le jeton d'authentification

    dispatch({
      type: student_reg.GET_ALL_REGISTERED_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const studentsPrevPaper = async () => {
  try {
    const { data } = await http.get('/api/student/previous-paper', Token()); // Effectue une requête GET à l'endpoint '/api/student/previous-paper', et utilise le jeton d'authentification

    return data;
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const studentTestPaperList = () => async dispatch => {
  try {
    dispatch({ type: student_reg.STUDENT_TEST_LIST_REQUEST });

    let { data } = await http.get('/api/student/alltest', Token()); // Effectue une requête GET à l'endpoint '/api/student/alltest', et utilise le jeton d'authentification

    data = [].concat(data).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    const paper1 = data.filter(
      p => !p.isTestConducted && p.paperType !== 'ASSIGNMENT'
    );
    const paper2 = data.filter(
      p => p.isTestConducted && p.paperType !== 'ASSIGNMENT'
    );
    const paper3 = data.filter(
      p => !p.isTestConducted && p.paperType === 'ASSIGNMENT'
    );
    const paper4 = data.filter(
      p => p.isTestConducted && p.paperType === 'ASSIGNMENT'
    );

    dispatch({
      type: student_reg.STUDENT_TEST_LIST_SUCCESS,
      payload1: paper1,
      payload2: paper2,
      payload3: paper3,
      payload4: paper4,
    });
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getStudentRecord = async studentId => {
  try {
    const { data } = await http.post(
      '/api/result/student/all',
      { studentId },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/result/student/all' avec les données studentId, et utilise le jeton d'authentification
    return data;
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};
