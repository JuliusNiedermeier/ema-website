"use client";

import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { useApplicationFormState } from "../state";
import { FormStepComponent } from "../application-form-provider";
import { applicationInputSchema } from "~/server/resources/application/application-input-schema";

type InputLabels = { label: string; placeholder: string };

export type ApplicantStepProps = {
  heading: string;
  description: string;
  inputs: { name: InputLabels; age: InputLabels; motivation: InputLabels & { description: string } };
};

export const ApplicantStep: FormStepComponent<ApplicantStepProps> = ({ heading, description, inputs }) => {
  const { name, setName, age, setAge, motivation, setMotivation } = useApplicationFormState();

  return (
    <div>
      <Heading tag="h2">{heading}</Heading>
      <Paragraph>{description}</Paragraph>
      <div className="mt-16 flex flex-col gap-8">
        <div>
          <Label>{inputs.name.label}</Label>
          <input
            autoFocus
            type="text"
            placeholder={inputs.name.placeholder}
            className="mt-2 block w-full rounded-xl border border-primary-900 bg-transparent p-4 font-serif text-paragraph outline-none"
            value={name || ""}
            onInput={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div>
          <Label>{inputs.age.label}</Label>
          <input
            type="number"
            placeholder={inputs.age.placeholder}
            className="mt-2 block w-full rounded-xl border border-primary-900 bg-transparent p-4 font-serif text-paragraph outline-none"
            value={age || ""}
            onInput={(e) => setAge(Number(e.currentTarget.value))}
          />
        </div>
        <div>
          <Heading tag="h3" size="sm">
            {inputs.motivation.label}
          </Heading>
          <Paragraph>{inputs.motivation.description}</Paragraph>
          <textarea
            placeholder={inputs.motivation.placeholder}
            className="mt-6 block h-60 w-full rounded-xl border border-primary-900 bg-transparent p-4 font-serif text-paragraph outline-none"
            value={motivation || ""}
            onInput={(e) => setMotivation(e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  );
};

const schema = applicationInputSchema.pick({ name: true, age: true, motivation: true });

ApplicantStep.validate = (state) => {
  return schema.safeParse({ name: state.name, age: state.age, motivation: state.motivation }).success;
};
