import { Answer, CheckupFormContext } from "./checkup-form-provider";

const handleAnswer = (rankingMap: Map<string, number>, blackList: Set<string>, answer: Answer) => {
  Object.keys(answer.ratings).forEach((programID) => {
    // If this answer is exclusive, blacklist this program if true
    if (answer.isExclusionCriterion) {
      if (answer.ratings[programID]) blackList.add(programID);
      return;
    }

    // If not exclusive, adjust this programs rank
    const currentProgramRank = rankingMap.has(programID) ? rankingMap.get(programID)! : 0;
    rankingMap.set(programID, currentProgramRank + answer.ratings[programID]);
  });
};

export const rankEducationalPrograms = (
  questions: CheckupFormContext["questions"],
  answers: CheckupFormContext["answers"],
) => {
  const programRankingMap = new Map<string, number>();

  const excludedPrograms = new Set<string>();

  questions.forEach((question) => {
    const answerIDs = answers[question.ID];
    const selectedAnswers = answerIDs ? question.answers.filter((answer) => answerIDs.includes(answer.ID)) : [];

    if (!selectedAnswers.length) return;

    selectedAnswers.forEach((answer) => handleAnswer(programRankingMap, excludedPrograms, answer));
  });

  return Array.from(programRankingMap)
    .filter(([ID]) => !excludedPrograms.has(ID))
    .map(([ID, rank]) => ({ ID, rank }))
    .toSorted((a, b) => b.rank - a.rank);
};
