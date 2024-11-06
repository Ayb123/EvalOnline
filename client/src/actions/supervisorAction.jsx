import * as s from '../constants/supervisorConstant'; // Importe les constantes liées aux superviseurs
import http from '../utils/httpService'; // Importe le module httpService personnalisé pour les requêtes HTTP
import { toast } from 'react-toastify'; // Importe le module toast de react-toastify pour les notifications
import errorHandler from '../errorHandler'; // Importe le gestionnaire d'erreurs personnalisé
import Token from '../utils/Token'; // Importe le module Token personnalisé pour la gestion des jetons d'authentification

export const supervisorList = () => async dispatch => {
  try {
    dispatch({ type: s.SUPERVISOR_LIST_REQUEST });
    const { data } = await http.get(
      '/api/supervisor/auth/details/all',
      Token()
    ); // Effectue une requête GET à l'endpoint '/api/supervisor/auth/details/all' en utilisant le jeton d'authentification

    dispatch({
      type: s.SUPERVISOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const supervisorReqList = () => async dispatch => {
  try {
    dispatch({ type: s.SUPERVISOR_REQ_LIST_REQUEST });

    const { data } = await http.get(
      '/api/supervisor/request/details/all',
      Token()
    ); // Effectue une requête GET à l'endpoint '/api/supervisor/request/details/all' en utilisant le jeton d'authentification

    dispatch({
      type: s.SUPERVISOR_REQ_LIST_SUCCESS,
      payload: data,
    });
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const removeSupervisor = (
  supervisors,
  id,
  permission
) => async dispatch => {
  try {
    const { data } = await http.delete(`/api/supervisor/remove/${id}`, Token()); // Effectue une requête DELETE à l'endpoint '/api/supervisor/remove/${id}' en utilisant le jeton d'authentification

    const arr = supervisors.filter(s => s._id !== id);
    if (permission === true) {
      dispatch({ type: s.SUPERVISOR_LIST_SUCCESS, payload: arr });
    } else {
      dispatch({ type: s.SUPERVISOR_REQ_LIST_SUCCESS, payload: arr });
    }
    toast.success(data); // Affiche une notification de succès
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const updateSupervisor = (supervisor, status) => async (
  dispatch,
  getState
) => {
  const id = supervisor._id;
  try {
    dispatch({ type: s.SUPERVISOR_UPDATEPERM_REQUEST });
    const {
      supervisorList: { supervisors },
      supervisorReqList: { supervisors: requests },
    } = getState();

    const { data } = await http.post(
      `/api/supervisor/change/permission`,
      { id, status },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/supervisor/change/permission' avec les données id et status, en utilisant le jeton d'authentification

    dispatch({
      type: s.SUPERVISOR_UPDATEPERM_SUCCESS,
    });

    if (status === true) {
      const arr = requests.filter(s => s._id !== id);
      dispatch({ type: s.SUPERVISOR_REQ_LIST_SUCCESS, payload: arr });
      dispatch({
        type: s.SUPERVISOR_LIST_SUCCESS,
        payload: [...supervisors, supervisor],
      });
    } else {
      const arr = supervisors.filter(s => s._id !== id);
      dispatch({ type: s.SUPERVISOR_LIST_SUCCESS, payload: arr });
      dispatch({
        type: s.SUPERVISOR_REQ_LIST_SUCCESS,
        payload: [...requests, supervisor],
      });
    }
    toast.success(data); // Affiche une notification de succès
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const deleteMedia = async () => {
  try {
    const { data } = await http.delete(`/api/supervisor/delete/media`, Token()); // Effectue une requête DELETE à l'endpoint '/api/supervisor/delete/media' en utilisant le jeton d'authentification
    toast.success(data); // Affiche une notification de succès
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};
