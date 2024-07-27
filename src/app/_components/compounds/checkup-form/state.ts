import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CheckupFormState = {
  answers: Record<string, string | null>;
  updateAnswer: (questionID: string, answerID: string | null) => void;
};

export const useCheckupFormState = create(
  persist<CheckupFormState>(
    (set, get) => ({
      answers: {},
      updateAnswer: (questionID, answerID) => {
        set((state) => ({ ...state, answers: { ...state.answers, [questionID]: answerID } }));
      },
    }),
    {
      name: "checkup-form",
    },
  ),
);
