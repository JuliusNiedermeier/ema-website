import { CheckupFormContext } from "./checkup-form-provider";

export const rankEducationalPrograms = (
  questions: CheckupFormContext["questions"],
  answers: CheckupFormContext["answers"],
) => {
  const programRankingMap = new Map<string, number>();

  const excludedPrograms = new Set<string>();

  questions.forEach((question) => {
    const answerID = answers[question.ID];
    const selectedAnswer = answerID ? question.answers.find((answer) => answer.ID === answerID) : null;

    if (!selectedAnswer) return;

    Object.keys(selectedAnswer.ratings).forEach((programID) => {
      // If this answer is exclusive, blacklist this program if true
      if (selectedAnswer.isExclusionCriterion) {
        if (selectedAnswer.ratings[programID]) excludedPrograms.add(programID);
        return;
      }

      // If not exclusive, adjust this programs rank
      const currentProgramRank = programRankingMap.has(programID) ? programRankingMap.get(programID)! : 0;
      programRankingMap.set(programID, currentProgramRank + selectedAnswer.ratings[programID]);
    });
  });

  return Array.from(programRankingMap)
    .filter(([ID]) => !excludedPrograms.has(ID))
    .map(([ID, rank]) => ({ ID, rank }))
    .toSorted((a, b) => b.rank - a.rank);
};
