"use client";

import { GraduationCapIcon, ShieldCheckIcon, UserRoundIcon } from "lucide-react";
import { FC, PropsWithChildren, ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import { ProgramsStep, ProgramsStepProps } from "./steps/programs";
import { ApplicantStep, ApplicantStepProps } from "./steps/applicant";
import { ContactStep, ContactStepProps } from "./steps/contact";
import { clamp } from "framer-motion";
import { ApplicationFormState, useApplicationFormState } from "./state";

export interface FormStepComponent<P = {}> extends FC<P> {
  validate: (formState: ApplicationFormState) => boolean;
}

type StepID = "program" | "applicant" | "verification";

type Step = {
  ID: StepID;
  title: string;
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
  stepTitles: Record<StepID, string>;
  stepData: { program: ProgramsStepProps; applicant: ApplicantStepProps; verification: ContactStepProps };
};

export const ApplicationFormProvider: FC<PropsWithChildren<ApplicationFormProviderProps>> = ({
  children,
  stepTitles,
  stepData,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const formState = useApplicationFormState();

  const steps = useMemo<Step[]>(
    () => [
      {
        ID: "program",
        title: stepTitles.program,
        icon: <GraduationCapIcon />,
        component: <ProgramsStep {...stepData.program} />,
        complete: ProgramsStep.validate(formState),
      },
      {
        ID: "applicant",
        title: stepTitles.applicant,
        icon: <UserRoundIcon />,
        component: <ApplicantStep {...stepData.applicant} />,
        complete: ApplicantStep.validate(formState),
      },
      {
        ID: "verification",
        title: stepTitles.verification,
        icon: <ShieldCheckIcon />,
        component: <ContactStep {...stepData.verification} />,
        complete: ContactStep.validate(formState),
      },
    ],
    [formState, stepTitles, stepData],
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
