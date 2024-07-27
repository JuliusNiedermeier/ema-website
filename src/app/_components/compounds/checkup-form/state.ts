import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CheckupFormState = {
  answers: Record<string, string[]>;
  updateAnswer: (questionID: string, answerID: string, enable: boolean, allowMultipleAnswers?: boolean) => void;
};

const toggleAnswer = (answers: string[], answerID: string, enable: boolean) => {
  const set = new Set(answers);
  enable ? set.add(answerID) : set.delete(answerID);
  return Array.from(set);
};

export const useCheckupFormState = create(
  persist<CheckupFormState>(
    (set, get) => ({
      answers: {},
      updateAnswer: (questionID, answerID, enable, allowMultipleAnswers = false) => {
        set((state) => {
          const newAnswers = allowMultipleAnswers
            ? toggleAnswer(state.answers[questionID] || [], answerID, enable)
            : enable
              ? [answerID]
              : [];

          return { ...state, answers: { ...state.answers, [questionID]: newAnswers } };
        });
      },
    }),
    {
      name: "checkup-form",
    },
  ),
);
