"use client";

import { GraduationCapIcon, ShieldCheckIcon, UserRoundIcon } from "lucide-react";
import { FC, PropsWithChildren, ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import { ProgramsStep, ProgramsStepProps } from "./steps/programs";
import { ApplicantStep } from "./steps/applicant";
import { ContactStep } from "./steps/contact";
import { clamp } from "framer-motion";
import { ApplicationFormState, useApplicationFormState } from "./state";

export interface FormStepComponent<P = {}> extends FC<P> {
  validate: (formState: ApplicationFormState) => boolean;
}

type Step = {
  ID: string;
  component: ReactNode;
  icon: ReactNode;
  complete: boolean;
};

type ApplicationFormContext = {
  steps: Step[];
  moveStep: (count: number) => void;
  currentStepIndex: number;
  firstIncompleteStepIndex: number;
};

const ApplicationFormContext = createContext<ApplicationFormContext>({
  moveStep: () => {},
  steps: [],
  currentStepIndex: 0,
  firstIncompleteStepIndex: -1,
});

export const useApplicationForm = () => {
  const context = useContext(ApplicationFormContext);
  if (!context) throw new Error("Hook useApplicationForm must be used inside an <ApplicationFormProvider>.");
  return context;
};

export type ApplicationFormProviderProps = {
  programs: ProgramsStepProps["programs"];
};

export const ApplicationFormProvider: FC<PropsWithChildren<ApplicationFormProviderProps>> = ({
  children,
  programs,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const formState = useApplicationFormState();

  const steps = useMemo<Step[]>(
    () => [
      {
        ID: "Program",
        icon: <GraduationCapIcon />,
        component: <ProgramsStep programs={programs} />,
        complete: ProgramsStep.validate(formState),
      },
      {
        ID: "Applicant",
        icon: <UserRoundIcon />,
        component: <ApplicantStep />,
        complete: ApplicantStep.validate(formState),
      },
      {
        ID: "Verification",
        icon: <ShieldCheckIcon />,
        component: <ContactStep />,
        complete: ContactStep.validate(formState),
      },
    ],
    [programs, formState],
  );

  const firstIncompleteStepIndex = useMemo(() => steps.findIndex((step) => !step.complete), [steps]);

  const moveStep = useCallback(
    (count: number) => setCurrentStepIndex(clamp(0, steps.length - 1, currentStepIndex + count)),
    [steps.length, currentStepIndex],
  );

  return (
    <ApplicationFormContext.Provider value={{ moveStep, steps, currentStepIndex, firstIncompleteStepIndex }}>
      {children}
    </ApplicationFormContext.Provider>
  );
};
