"use client";

import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from "react";

type BaseAnswer = { answer: string };

type NumberAnswer = BaseAnswer & {
  isExclusionCriterion: false;
  ratings: Record<string, number>;
};

type BooleanAnswer = BaseAnswer & {
  isExclusionCriterion: true;
  ratings: Record<string, boolean>;
};

type Answer = NumberAnswer | BooleanAnswer;

type CheckupFormContext = {
  questions: {
    question: string;
    layout: "horizontal" | "vertical";
    answers: Answer[];
  }[];
  answers: (number | null)[];
  updateAnswer: (questionIndex: number, answerIndex: number | null) => void;
  ranking: { ID: string; rank: number }[];
};

const CheckupFormContext = createContext<CheckupFormContext>({
  questions: [],
  answers: [],
  updateAnswer: () => {},
  ranking: [],
});

export const useCheckupForm = () => {
  const context = useContext(CheckupFormContext);
  if (!context) throw new Error("Hook useCheckupForm must be used inside a <CheckupFormProvider>.");
  return context;
};

const rankEducationalPrograms = (
  questions: CheckupFormContext["questions"],
  answers: CheckupFormContext["answers"],
) => {
  const programRankingMap = new Map<string, number>();

  const excludedPrograms = new Set<string>();

  questions.forEach((question, questionIndex) => {
    const selectedAnswer = typeof answers[questionIndex] === "number" ? question.answers[answers[questionIndex]] : null;

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

type CheckupFormProviderProps = { questions: CheckupFormContext["questions"] };

export const CheckupFormProvider: FC<PropsWithChildren<CheckupFormProviderProps>> = ({ questions, children }) => {
  const [answers, setAnswers] = useState<CheckupFormContext["answers"]>(new Array(questions.length).fill(null));

  const updateAnswer: CheckupFormContext["updateAnswer"] = (questionIndex, answerIndex) => {
    setAnswers((v) => v.toSpliced(questionIndex, 1, answerIndex));
  };

  const ranking = useMemo<CheckupFormContext["ranking"]>(
    () => rankEducationalPrograms(questions, answers),
    [questions, answers],
  );

  return (
    <CheckupFormContext.Provider value={{ questions, answers, updateAnswer, ranking }}>
      {children}
    </CheckupFormContext.Provider>
  );
};
