"use client";

import { BaseStep } from "../base-step";
import { FormStepComponent } from "../provider";
import { applicationInputSchema } from "~/server/resources/application/application-input-schema";
import { FormInput } from "../utils/input";
import { useApplicationFormState } from "../state";
import { Turnstile } from "../../turnstile";
import { useEffect } from "react";
import { z } from "zod";

export type EmailStepProps = {
  heading: string;
  description: string;
  placeholder: string;
};

export const EmailStep: FormStepComponent<EmailStepProps> = ({ heading, description, placeholder }) => {
  const { email, setEmail, setTurnstileToken } = useApplicationFormState();

  useEffect(() => setTurnstileToken(null), []);

  return (
    <BaseStep heading={heading} description={description}>
      <FormInput
        autoFocus
        placeholder={placeholder}
        value={email || ""}
        onInput={(e) => setEmail(e.currentTarget.value)}
      />
      <div className="mt-4 overflow-hidden rounded-3xl bg-neutral-100/10 p-2">
        <Turnstile
          onVerify={(token) => setTurnstileToken(token)}
          className="overflow-hidden rounded-2xl mix-blend-lighten hue-rotate-180 invert"
          appearance="always"
        />
      </div>
    </BaseStep>
  );
};

const schema = applicationInputSchema.pick({ email: true }).extend({ turnstileToken: z.string().min(1) });

EmailStep.validate = ({ email, turnstileToken }) => {
  return schema.safeParse({ email, turnstileToken }).success;
};
