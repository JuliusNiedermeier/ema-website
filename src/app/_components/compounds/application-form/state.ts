import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ApplicationFormState = {
  program: string | null;
  setProgram: (ID: string | null) => void;

  name: string | null;
  setName: (name: string | null) => void;

  age: number | null;
  setAge: (age: number | null) => void;

  motivation: string | null;
  setMotivation: (motivation: string | null) => void;

  email: string | null;
  setEmail: (email: string | null) => void;
};

export const useApplicationFormState = create(
  persist<ApplicationFormState>(
    (set, get) => ({
      program: null,
      setProgram: (ID) => set((state) => ({ ...state, program: ID })),

      name: null,
      setName: (name) => set((state) => ({ ...state, name })),

      age: null,
      setAge: (age) => set((state) => ({ ...state, age })),

      motivation: null,
      setMotivation: (motivation) => set((state) => ({ ...state, motivation })),

      email: null,
      setEmail: (email) => set((state) => ({ ...state, email })),
    }),
    {
      name: "application-form",
    },
  ),
);
