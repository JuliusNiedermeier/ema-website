"use client";

import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from "react";
import { CheckupFormState, useCheckupFormState } from "./state";
import { rankEducationalPrograms } from "./rank-educational-programs";
import { HSLValue } from "~/app/_utils/color-swatch";

type BaseAnswer = { ID: string; answer: string };

type NumberAnswer = BaseAnswer & {
  isExclusionCriterion: false;
  ratings: Record<string, number>;
};

type BooleanAnswer = BaseAnswer & {
  isExclusionCriterion: true;
  ratings: Record<string, boolean>;
};

export type Answer = NumberAnswer | BooleanAnswer;

type CheckupFormProgram = {
  ID: string;
  name: string;
  programType: { name: string; slug: string };
  slogan: string;
  color: HSLValue;
  slug: string;
};

export type CheckupFormContext = {
  questions: {
    ID: string;
    question: string;
    layout: "horizontal" | "vertical";
    allowMutlipleAnswers: boolean;
    answers: Answer[];
  }[];
  programs: CheckupFormProgram[];
  answers: CheckupFormState["answers"];
  updateAnswer: CheckupFormState["updateAnswer"];
  results: CheckupFormProgram[];
};

const CheckupFormContext = createContext<CheckupFormContext>({
  questions: [],
  programs: [],
  answers: {},
  updateAnswer: () => {},
  results: [],
});

export const useCheckupForm = () => {
  const context = useContext(CheckupFormContext);
  if (!context) throw new Error("Hook useCheckupForm must be used inside a <CheckupFormProvider>.");
  return context;
};

type CheckupFormProviderProps = {
  questions: CheckupFormContext["questions"];
  programs: CheckupFormContext["programs"];
};

export const CheckupFormProvider: FC<PropsWithChildren<CheckupFormProviderProps>> = ({
  questions,
  programs,
  children,
}) => {
  const { answers, updateAnswer } = useCheckupFormState();

  const results = useMemo(() => {
    return rankEducationalPrograms(questions, answers)
      .filter(({ rank }) => rank > 0)
      .map((result) => programs.find((program) => program.ID === result.ID))
      .filter((program) => typeof program !== "undefined");
  }, [questions, answers, programs]);

  return (
    <CheckupFormContext.Provider value={{ questions, answers, updateAnswer, programs, results }}>
      {children}
    </CheckupFormContext.Provider>
  );
};
