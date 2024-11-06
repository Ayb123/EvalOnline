import * as test from '../constants/testConstant'; // Importe les constantes liées aux tests
import http from '../utils/httpService'; // Importe le module httpService personnalisé pour les requêtes HTTP
import { toast } from 'react-toastify'; // Importe le module toast de react-toastify pour les notifications
import Token from '../utils/Token'; // Importe le module Token personnalisé pour la gestion des jetons d'authentification
import errorHandler from '../errorHandler'; // Importe le gestionnaire d'erreurs personnalisé

export const createTest = testPaper => async dispatch => {
  try {
    const { data } = await http.post('/api/test/create', testPaper, Token()); // Effectue une requête POST à l'endpoint '/api/test/create' avec les données testPaper, en utilisant le jeton d'authentification

    if (testPaper.paperType !== 'ASSIGNMENT')
      dispatch(getNotConductedTestPaper());
    else dispatch(getNotConductedAssignment());
    toast.success(data); // Affiche une notification de succès
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getNotConductedTestPaper = () => async dispatch => {
  try {
    dispatch({ type: test.TEST_LIST_REQUEST });

    let { data } = await http.get('/api/test/details/all', Token()); // Effectue une requête GET à l'endpoint '/api/test/details/all' en utilisant le jeton d'authentification
    data = [].concat(data).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    dispatch({
      type: test.TEST_LIST_SUCCESS,
      payload1: data,
    });
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getNotConductedAssignment = () => async dispatch => {
  try {
    dispatch({ type: test.TEST_LIST_REQUEST });

    let { data } = await http.get('/api/test/assignment/details/all', Token()); // Effectue une requête GET à l'endpoint '/api/test/assignment/details/all' en utilisant le jeton d'authentification

    data = [].concat(data).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    dispatch({
      type: test.TEST_LIST_SUCCESS,
      payload3: data,
    });
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getConductedTestPaper = () => async dispatch => {
  try {
    dispatch({ type: test.TEST_LIST_REQUEST });
    let { data } = await http.get('/api/test/conducted/details/all', Token()); // Effectue une requête GET à l'endpoint '/api/test/conducted/details/all' en utilisant le jeton d'authentification

    data = [].concat(data).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

    dispatch({
      type: test.TEST_LIST_SUCCESS,
      //payload1: notConductedTestPapers,
      payload2: data,
    });
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getConductedAssignment = () => async dispatch => {
  try {
    dispatch({ type: test.TEST_LIST_REQUEST });
    let { data } = await http.get(
      '/api/test/assignment/conducted/details/all',
      Token()
    ); // Effectue une requête GET à l'endpoint '/api/test/assignment/conducted/details/all' en utilisant le jeton d'authentification

    data = [].concat(data).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    dispatch({
      type: test.TEST_LIST_SUCCESS,
      //payload1: notConductedTestPapers,
      payload4: data,
    });
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const testPaperDelete = (testPapers, id, show) => async dispatch => {
  try {
    const { data } = await http.post('/api/test/delete', { id }, Token()); // Effectue une requête POST à l'endpoint '/api/test/delete' avec l'ID du test à supprimer, en utilisant le jeton d'authentification

    const arr = testPapers.filter(t => t._id !== id);

    if (show) {
      dispatch({ type: test.TEST_LIST_SUCCESS, payload1: arr });
    } else {
      dispatch({ type: test.TEST_LIST_SUCCESS, payload2: arr });
    }

    toast.success(data); // Affiche une notification de succès
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const testBegin = (id, index, testPapers) => async dispatch => {
  try {
    await http.post('/api/test/begin', { id }, Token()); // Effectue une requête POST à l'endpoint '/api/test/begin' avec l'ID du test à commencer, en utilisant le jeton d'authentification

    const arr = [...testPapers];
    arr[index].isTestBegins = true;
    arr[index].isRegistrationAvailable = false;

    if (arr[index].paperType !== 'ASSIGNMENT') {
      dispatch({
        type: test.TEST_LIST_SUCCESS,
        payload1: arr,
      });
    } else {
      dispatch({
        type: test.TEST_LIST_SUCCESS,
        payload3: arr,
      });
    }

    toast.success('test has been started'); // Affiche une notification de succès
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const testEnd = async ({ testId, studentId }) => {
  try {
    const { data } = await http.post(
      '/api/student/endTest',
      {
        testId,
        studentId,
      },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/student/endTest' avec l'ID du test et l'ID de l'étudiant pour terminer le test, en utilisant le jeton d'authentification

    toast.success(data); // Affiche une notification de succès
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const testEndByTeacher = (testPapers, id) => async dispatch => {
  try {
    const { data } = await http.post('/api/test/end', { id }, Token()); // Effectue une requête POST à l'endpoint '/api/test/end' avec l'ID du test à terminer, en utilisant le jeton d'authentification

    const arr1 = testPapers.filter(t => t._id !== id);
    const arr2 = testPapers.filter(t => t._id === id);

    if (arr2[0].paperType !== 'ASSIGNMENT') {
      dispatch({
        type: test.TEST_LIST_SUCCESS,
        payload1: arr1,
      });
      dispatch(getConductedTestPaper());
    } else {
      dispatch(getConductedAssignment());
      //dispatch(getNotConductedAssignment());
      dispatch({
        type: test.TEST_LIST_SUCCESS,
        payload3: arr1,
      });
    }

    toast.success(data); // Affiche une notification de succès
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getSinglePaper = id => async dispatch => {
  try {
    dispatch({ type: test.SINGLE_TESTPAPER_REQUEST });

    const { data } = await http.post('/api/student/questions', { id }, Token()); // Effectue une requête POST à l'endpoint '/api/student/questions' avec l'ID du test, en utilisant le jeton d'authentification

    dispatch({
      type: test.SINGLE_TESTPAPER_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const checkTestStart = async id => {
  try {
    const { data } = await http.post(
      '/api/test/check-test-start',
      { id },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/test/check-test-start' avec l'ID du test, en utilisant le jeton d'authentification
    return data;
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getTestDetails = async id => {
  try {
    const { data } = await http.get(`/api/test/get/${id}`, Token()); // Effectue une requête GET à l'endpoint '/api/test/get/${id}' avec l'ID du test, en utilisant le jeton d'authentification
    return data;
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const startTestTime = async testId => {
  try {
    const { data } = await http.post(
      '/api/student/test/start-time',
      {
        testId,
      },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/student/test/start-time' avec l'ID du test, en utilisant le jeton d'authentification
    return data;
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getTestCategory = async testId => {
  try {
    const { data } = await http.post(
      '/api/student/test/category',
      { testId },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/student/test/category' avec l'ID du test, en utilisant le jeton d'authentification
    return data;
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getScoreOfAllStudents = async testId => {
  try {
    const { data } = await http.post(
      '/api/test/student-score-details',
      { testId },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/test/student-score-details' avec l'ID du test, en utilisant le jeton d'authentification
    return data;
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};
