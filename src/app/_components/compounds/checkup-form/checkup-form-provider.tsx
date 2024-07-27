"use client";

import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from "react";
import { CheckupFormState, useCheckupFormState } from "./state";
import { rankEducationalPrograms } from "./rank-educational-programs";

type BaseAnswer = { ID: string; answer: string };

type NumberAnswer = BaseAnswer & {
  isExclusionCriterion: false;
  ratings: Record<string, number>;
};

type BooleanAnswer = BaseAnswer & {
  isExclusionCriterion: true;
  ratings: Record<string, boolean>;
};

type Answer = NumberAnswer | BooleanAnswer;

export type CheckupFormContext = {
  questions: {
    ID: string;
    question: string;
    layout: "horizontal" | "vertical";
    allowMutlipleAnswers: boolean;
    answers: Answer[];
  }[];
  answers: CheckupFormState["answers"];
  updateAnswer: CheckupFormState["updateAnswer"];
  ranking: { ID: string; rank: number }[];
};

const CheckupFormContext = createContext<CheckupFormContext>({
  questions: [],
  answers: {},
  updateAnswer: () => {},
  ranking: [],
});

export const useCheckupForm = () => {
  const context = useContext(CheckupFormContext);
  if (!context) throw new Error("Hook useCheckupForm must be used inside a <CheckupFormProvider>.");
  return context;
};

type CheckupFormProviderProps = { questions: CheckupFormContext["questions"] };

export const CheckupFormProvider: FC<PropsWithChildren<CheckupFormProviderProps>> = ({ questions, children }) => {
  const { answers, updateAnswer } = useCheckupFormState();

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
