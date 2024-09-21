"use client";

import { BaseStep } from "../base-step";
import { FormStepComponent } from "../provider";

export type IntroductionStepProps = {
  heading: string;
  description: string;
};

export const IntroductionStep: FormStepComponent<IntroductionStepProps> = ({ heading, description }) => {
  return <BaseStep heading={heading} description={description} />;
};

IntroductionStep.validate = () => true;
