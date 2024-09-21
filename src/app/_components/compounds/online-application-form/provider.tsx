"use client";

import { FC, PropsWithChildren, ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import { clamp } from "framer-motion";
import { OnlineApplicationFormState, useApplicationFormState } from "./state";
import { NameStep, NameStepProps } from "./steps/name";
import { AgeStep, AgeStepProps } from "./steps/age";
import { EmailStep, EmailStepProps } from "./steps/email";
import { IntroductionStep, IntroductionStepProps } from "./steps/introduction";
import { ProgramStep, ProgramStepProps } from "./steps/program";

export interface FormStepComponent<P = {}> extends FC<P> {
  validate: (formState: OnlineApplicationFormState) => boolean;
}

type StepData = {
  introduction: IntroductionStepProps;
  program: ProgramStepProps;
  name: NameStepProps;
  age: AgeStepProps;
  email: EmailStepProps;
};

type StepID = keyof StepData;

type Step = {
  ID: StepID;
  component: ReactNode;
  complete: boolean;
};

type FormContext = {
  steps: Step[];
  moveStep: (count: number) => void;
  currentStepIndex: number;
  firstIncompleteStepIndex: number;
};

const FormContext = createContext<FormContext>({
  moveStep: () => {},
  steps: [],
  currentStepIndex: 0,
  firstIncompleteStepIndex: -1,
});

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("Hook useApplicationForm must be used inside an <ApplicationFormProvider>.");
  return context;
};

export type FormProviderProps = {
  stepData: StepData;
};

export const FormProvider: FC<PropsWithChildren<FormProviderProps>> = ({ children, stepData }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const formState = useApplicationFormState();

  const steps = useMemo<Step[]>(
    () => [
      {
        ID: "introduction",
        component: <IntroductionStep {...stepData.introduction} />,
        complete: IntroductionStep.validate(formState),
      },
      { ID: "program", component: <ProgramStep {...stepData.program} />, complete: ProgramStep.validate(formState) },
      { ID: "name", component: <NameStep {...stepData.name} />, complete: NameStep.validate(formState) },
      { ID: "age", component: <AgeStep {...stepData.age} />, complete: AgeStep.validate(formState) },
      { ID: "email", component: <EmailStep {...stepData.email} />, complete: EmailStep.validate(formState) },
    ],
    [formState, stepData],
  );

  const firstIncompleteStepIndex = useMemo(() => steps.findIndex((step) => !step.complete), [steps]);

  const moveStep = useCallback(
    (count: number) => setCurrentStepIndex(clamp(0, steps.length - 1, currentStepIndex + count)),
    [steps.length, currentStepIndex],
  );

  return (
    <FormContext.Provider value={{ moveStep, steps, currentStepIndex, firstIncompleteStepIndex }}>
      {children}
    </FormContext.Provider>
  );
};
