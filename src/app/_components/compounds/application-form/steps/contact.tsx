"use client";

import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { useApplicationFormState } from "../state";
import { FormStepComponent } from "../application-form-provider";
import { applicationInputSchema } from "~/server/resources/application/application-input-schema";
import { Turnstile } from "../../turnstile";
import { z } from "zod";
import { useEffect } from "react";

export const ContactStep: FormStepComponent = () => {
  const { email, setEmail, setTurnstileToken } = useApplicationFormState();

  useEffect(() => setTurnstileToken(null), []);

  return (
    <div>
      <Heading>An welche Email dürfen wir dir ein Zusage senden?</Heading>
      <Paragraph>
        Wir benötigen eine aktuelle Email-Adresse von dir um uns für eine Zusage oder Fragen an dich wenden zu können.
      </Paragraph>
      <div className="mt-16 flex flex-col gap-8">
        <div>
          <Label>Email-Adresse</Label>
          <input
            autoFocus
            type="email"
            placeholder="Aktuelle Email-Adresse"
            className="mt-2 block w-full rounded-xl border border-primary-900 bg-transparent p-4 font-serif text-paragraph outline-none"
            value={email || ""}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <Turnstile onVerify={(token) => setTurnstileToken(token)} />
      </div>
    </div>
  );
};

const schema = applicationInputSchema.pick({ email: true }).extend({ turnstileToken: z.string().min(1) });

ContactStep.validate = ({ email, turnstileToken }) => {
  return schema.safeParse({ email, turnstileToken }).success;
};
