import { toast } from "react-toastify"; // Importe le module toast de react-toastify pour afficher des notifications
import * as group from "../constants/groupConstant"; // Importe les constantes liées aux groupes
import errorHandler from "../errorHandler"; // Importe le gestionnaire d'erreurs personnalisé
import httpService from "../utils/httpService"; // Importe le module httpService personnalisé pour les requêtes HTTP
import Token from "../utils/Token"; // Importe le module Token personnalisé pour la gestion des jetons d'authentification

export const getAllGroup = () => async (dispatch) => {
  try {
    dispatch({ type: group.GROUP_LIST_REQUEST }); // Dispatche une action pour indiquer la demande de la liste des groupes

    const { data } = await httpService.get("/api/groups/allGroup", Token()); // Effectue une requête GET à l'endpoint '/api/groups/allGroup' avec le jeton d'authentification

    dispatch({ type: group.GROUP_LIST_SUCCESS, payload: data.group }); // Dispatche une action pour indiquer le succès de la récupération de la liste des groupes et envoie les données des groupes
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const createGroup = async (groupName, groupCode) => {
  try {
    const { data } = await httpService.post(
      "/api/groups/create-group",
      { groupName, groupCode },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/groups/create-group' avec les données groupName et groupCode, et utilise le jeton d'authentification
    toast.success("SuccessFully Created"); // Affiche une notification de succès
    return data; // Retourne les données récupérées de la réponse de la requête
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const joinGroup = async (groupCode) => {
  try {
    const { data } = await httpService.post(
      "/api/groups/join-group",
      { groupCode },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/groups/join-group' avec les données groupCode, et utilise le jeton d'authentification

    if (typeof data === "string") toast.info(data); // Affiche une notification d'information si les données retournées sont de type string
    else return data; // Retourne les données récupérées de la réponse de la requête
  } catch (ex) {
    errorHandler(ex); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getGroupStudents = async (groupId) => {
  try {
    const { data } = await httpService.post(
      "/api/groups/students",
      { groupId },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/groups/students' avec les données groupId, et utilise le jeton d'authentification

    return data; // Retourne les données récupérées de la réponse de la requête
  } catch (ex) {
    errorHandler(); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};

export const getGroupTestPaper = async (groupId) => {
  try {
    let { data } = await httpService.post(
      "/api/groups/tests",
      { groupId },
      Token()
    ); // Effectue une requête POST à l'endpoint '/api/groups/tests' avec les données groupId, et utilise le jeton d'authentification
    data = [].concat(data).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)); // Trie les données des tests par ordre décroissant de createdAt
    return data; // Retourne les données récupérées de la réponse de la requête
  } catch (ex) {
    errorHandler(); // Gère les erreurs en appelant le gestionnaire d'erreurs
  }
};
