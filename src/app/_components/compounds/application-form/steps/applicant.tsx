"use client";

import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { useApplicationFormState } from "../state";
import { FormStepComponent } from "../application-form-provider";
import { applicationInputSchema } from "~/server/resources/application/application-input-schema";

export const ApplicantStep: FormStepComponent = () => {
  const { name, setName, age, setAge, motivation, setMotivation } = useApplicationFormState();

  return (
    <div>
      <Heading>Erzähle uns etwas mehr über Dich.</Heading>
      <Paragraph>
        Wir wollen Dich kennenlernen und uns mit Dir über deine Ziele austauschen. Bitte beantworte die folgenden Fragen
        bevor du fortfährst.
      </Paragraph>
      <div className="mt-16 flex flex-col gap-8">
        <div>
          <Label>Wie heißt du?</Label>
          <input
            autoFocus
            type="text"
            placeholder="Dein name"
            className="mt-2 block w-full rounded-xl border border-primary-900 bg-transparent p-4 font-serif text-paragraph outline-none"
            value={name || ""}
            onInput={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div>
          <Label>Wie alt bist du?</Label>
          <input
            type="number"
            placeholder="Dein Alter"
            className="mt-2 block w-full rounded-xl border border-primary-900 bg-transparent p-4 font-serif text-paragraph outline-none"
            value={age || ""}
            onInput={(e) => setAge(Number(e.currentTarget.value))}
          />
        </div>
        <div>
          <Heading size="sm">Was sind deine Ziele?</Heading>
          <Paragraph>
            Bitte teile uns in eine paar Sätzen mit weshalb du dich bei uns bewirbst und was deine Ziele sind.
          </Paragraph>
          <textarea
            placeholder="Deine Motivation"
            className="mt-2 block h-60 w-full rounded-xl border border-primary-900 bg-transparent p-4 font-serif text-paragraph outline-none"
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
