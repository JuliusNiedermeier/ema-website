"use client";

import { BaseStep } from "../base-step";
import { FormStepComponent } from "../provider";
import { applicationInputSchema } from "~/server/resources/application/application-input-schema";
import { FormInput } from "../utils/input";
import { useApplicationFormState } from "../state";

export type AgeStepProps = {
  heading: string;
  description: string;
  placeholder: string;
};

export const AgeStep: FormStepComponent<AgeStepProps> = ({ heading, description, placeholder }) => {
  const { age, setAge } = useApplicationFormState();

  return (
    <BaseStep heading={heading} description={description}>
      <FormInput
        placeholder={placeholder}
        value={age || ""}
        onInput={(e) => setAge(Number(e.currentTarget.value))}
        type="number"
      />
    </BaseStep>
  );
};

const schema = applicationInputSchema.pick({ age: true });

AgeStep.validate = ({ age }) => {
  return schema.safeParse({ age }).success;
};
