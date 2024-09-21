"use client";

import { BaseStep } from "../base-step";
import { FormStepComponent } from "../provider";
import { applicationInputSchema } from "~/server/resources/application/application-input-schema";
import { FormInput } from "../utils/input";
import { useApplicationFormState } from "../state";

export type NameStepProps = {
  heading: string;
  description: string;
  placeholder: string;
};

export const NameStep: FormStepComponent<NameStepProps> = ({ heading, description, placeholder }) => {
  const { name, setName } = useApplicationFormState();

  return (
    <BaseStep heading={heading} description={description}>
      <FormInput placeholder={placeholder} value={name || ""} onInput={(e) => setName(e.currentTarget.value)} />
    </BaseStep>
  );
};

const schema = applicationInputSchema.pick({ name: true });

NameStep.validate = ({ name }) => {
  return schema.safeParse({ name }).success;
};
