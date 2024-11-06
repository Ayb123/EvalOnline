const ResponseSheet = require("../models/responseSheet");
// Importation du modèle ResponseSheet pour interagir avec la collection des feuilles de réponse
const Result = require("../models/result");
// Importation du modèle Result pour interagir avec la collection des résultats
const SubResult = require("../models/subResult");
// Importation du modèle SubResult pour interagir avec la collection des sous-résultats
const TestPaper = require("../models/testpaper");
// Importation du modèle TestPaper pour interagir avec la collection des papiers de test
const { generateExcel } = require("./generateExcel");
// Importation de la fonction generateExcel pour générer un fichier Excel

const generateResult = async (req, res) => {
  // Fonction asynchrone pour générer un résultat

  const { studentId, testId } = req.body;
  // Extraction des données nécessaires de la requête

  const result = await Result.findOne({ testId, studentId }).populate(
    "subResult"
  );
  // Recherche du résultat en utilisant l'ID de test et l'ID d'étudiant fournis dans la requête,
  // en peuplant la référence aux sous-résultats

  if (result) return res.send(result);
  // Si un résultat existe déjà, renvoyer le résultat dans la réponse

  const responseSheet = await ResponseSheet.findOne({
    studentId,
    testId,
    isCompleted: true,
  })
    .populate("questions responses")
    .populate({
      path: "questions",
      populate: {
        path: "options",
      },
    });
  // Recherche de la feuille de réponse en utilisant l'ID d'étudiant, l'ID de test et le statut "isCompleted" défini sur true,
  // en peuplant les références aux questions, aux réponses et aux options de réponse

  if (!responseSheet) return res.send("Not Attempt");
  // Si la feuille de réponse n'est pas trouvée, renvoyer une réponse indiquant que l'étudiant n'a pas tenté le test

  const ansMap = ["A", "B", "C", "D", "E"];
  // Tableau de correspondance pour mapper les indices des options de réponse avec les lettres A, B, C, D, E

  const { questions, responses } = responseSheet;
  // Extraction des questions et des réponses de la feuille de réponse

  let score = 0;
  // Variable pour stocker le score total

  const subResults = questions.map((q, i) => {
    // Parcours des questions et des réponses pour générer les sous-résultats correspondants

    const res = responses[i].chosenOption;
    // Option choisie par l'étudiant pour la question actuelle

    const correctAnswer = [];
    // Tableau pour stocker les bonnes réponses de la question

    const response = [];
    // Tableau pour stocker les réponses de l'étudiant pour la question

    q.options.map((o, j) => {
      // Parcours des options de réponse de la question

      if (o.isAnswer) {
        correctAnswer.push(ansMap[j]);
        // Si une option est marquée comme bonne réponse, l'ajouter au tableau des bonnes réponses
      }

      for (let k = 0; k < res.length; ++k) {
        if (String(res[k]) === String(o._id)) {
          response.push(ansMap[j]);
          // Si l'option choisie par l'étudiant correspond à l'option en cours, l'ajouter au tableau des réponses de l'étudiant
        }
      }
    });

    const l1 = correctAnswer.length;
    const l2 = response.length;
    let isCorrect = false;
    // Variable pour indiquer si la réponse de l'étudiant est correcte ou non

    if (l1 === l2) {
      let count = 0;
      for (const p of correctAnswer) {
        for (const q of response) {
          if (p === q) {
            count++;
            break;
          }
        }
      }

      if (count === l1) {
        isCorrect = true;
        score += q.weightage;
        // Si le nombre de bonnes réponses correspond au nombre total de bonnes réponses de la question,
        // la réponse de l'étudiant est considérée comme correcte et le score est mis à jour en fonction du poids de la question
      }
    }

    const subresult = {
      questionId: q._id,
      weightage: q.weightage,
      correctAnswer,
      response,
      explaination: q.explaination,
      isCorrect,
    };
    // Création d'un objet subresult pour stocker les informations du sous-résultat

    return subresult;
    // Renvoi du sous-résultat
  });

  const subResult = await SubResult.insertMany(subResults);
  // Insertion des sous-résultats dans la base de données

  const resultdata = new Result({
    testId,
    studentId,
    responseSheet,
    subResult,
    score,
  });
  // Création d'un nouvel objet Result avec les données fournies

  await resultdata.save();
  // Sauvegarde du résultat dans la base de données

  res.send(resultdata);
  // Renvoi du résultat dans la réponse
};

const getStudentResults = async (req, res) => {
  // Fonction asynchrone pour récupérer les résultats d'un étudiant

  const { studentId } = req.body;
  // Extraction de l'ID d'étudiant de la requête

  const results = await Result.find({ studentId })
    .select("score testId")
    .populate({
      path: "testId",
      select: {
        title: 1,
        subject: 1,
        paperType: 1,
        startTime: 1,
        maxMarks: 1,
      },
    });
  // Recherche des résultats en utilisant l'ID d'étudiant,
  // en sélectionnant les champs "score" et "testId",
  // en peuplant la référence aux tests et en sélectionnant certains champs du test

  res.send(results);
  // Renvoi des résultats dans la réponse
};

const generateResultPdf = async (req, res) => {
  // Fonction asynchrone pour générer un résultat au format PDF

  const { studentId, testId } = req.body;
  // Extraction des données nécessaires de la requête

  const result = await Result.findOne({ testId, studentId });
  // Recherche du résultat en utilisant l'ID de test et l'ID d'étudiant fournis dans la requête

  if (result) return res.send(result);
  // Si un résultat existe déjà, renvoyer le résultat dans la réponse

  const responseSheet = null;
  const subResult = [];
  const score = -1;
  // Données par défaut pour générer un résultat vide

  const resultdata = new Result({
    testId,
    studentId,
    responseSheet,
    subResult,
    score,
  });
  // Création d'un nouvel objet Result avec les données fournies

  await resultdata.save();
  // Sauvegarde du résultat dans la base de données

  res.send(resultdata);
  // Renvoi du résultat dans la réponse
};

const getScore = async (req, res) => {
  // Fonction asynchrone pour récupérer les scores d'un test

  const { testId } = req.body;
  // Extraction de l'ID de test de la requête

  const result = await Result.find({ testId }).select(
    "score studentId maxMarks"
  );
  // Recherche des résultats en utilisant l'ID de test,
  // en sélectionnant les champs "score", "studentId" et "maxMarks"

  res.send(result);
  // Renvoi des résultats dans la réponse
};

const editScore = async (req, res) => {
  // Fonction asynchrone pour modifier un score

  const { testId, studentId, score } = req.body;
  // Extraction des données nécessaires de la requête

  const result = await Result.findOneAndUpdate(
    { testId, studentId },
    { score }
  );
  // Recherche du résultat en utilisant l'ID de test et l'ID d'étudiant fournis dans la requête,
  // et mise à jour du score avec la nouvelle valeur

  if (!result) return res.status(404).send("Result Not found");
  // Si aucun résultat n'est trouvé, renvoyer une réponse d'erreur

  res.send("Successfully updated");
  // Renvoi d'une réponse de succès
};

const download = async (req, res) => {
  // Fonction asynchrone pour télécharger un fichier

  const { testId } = req.body;
  // Extraction de l'ID de test de la requête

  const paper = await TestPaper.find({ _id: testId, isTestConducted: true });
  // Recherche du papier de test en utilisant l'ID de test et le statut "isTestConducted" défini sur true

  if (!paper) return res.status(404).send("Testpaper not found");
  // Si aucun papier de test n'est trouvé, renvoyer une réponse d'erreur

  const workbook = await generateExcel(testId);
  // Génération d'un fichier Excel en utilisant la fonction generateExcel

  var buff = await workbook.xlsx.writeBuffer();
  const str = buff.toString("base64");

  res.send(str);
  // Renvoi du fichier dans la réponse
};

const getRankList = async (req, res) => {
  // Fonction asynchrone pour récupérer la liste des classements

  const { testId } = req.body;
  // Extraction de l'ID de test de la requête

  const rankList = await Result.find({ testId })
    .select("studentId score")
    .sort("-score")
    .populate({
      path: "studentId",
      select: {
        name: 1,
        email: 1,
      },
    });
  // Recherche des résultats en utilisant l'ID de test,
  // en sélectionnant les champs "studentId" et "score",
  // en triant par ordre décroissant du score,
  // en peuplant la référence à l'étudiant et en sélectionnant certains champs de l'étudiant

  res.send(rankList);
  // Renvoi de la liste des classements dans la réponse
};

module.exports = {
  generateResult,
  getStudentResults,
  generateResultPdf,
  getScore,
  editScore,
  download,
  getRankList,
};
