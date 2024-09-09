"use client";

import { ComponentProps, FC, useState } from "react";
import { cn } from "~/app/_utils/cn";
import { LoaderCircle, SendHorizonalIcon } from "lucide-react";
import { Label, Paragraph } from "../primitives/typography";
import { sendInternalAppointmentRequest } from "~/server/resources/appointment/actions/send-internal-appointment-request";
import { Button, ButtonInteractionBubble } from "../primitives/button";
import { useMutation } from "@tanstack/react-query";
import { Turnstile } from "./turnstile";

export type AppointmentRequestFormProps = ComponentProps<"div"> & {
  emailPlaceholder: string;
  submitButtonLabel: string;
  successLabel: string;
  successText: string;
};

export const AppointmentRequestForm: FC<AppointmentRequestFormProps> = ({
  className,
  emailPlaceholder,
  submitButtonLabel,
  successLabel,
  successText,
  ...restProps
}) => {
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const valid = email && turnstileToken;

  const submitAppointmentRequest = useMutation({
    mutationFn: async (data: { email: string }) => {
      if (!valid) return false;
      const success = await sendInternalAppointmentRequest({
        email: data.email,
        turnstileToken: turnstileToken,
      });
      if (!success) throw new Error();
    },
  });

  return (
    <div className={cn("", className)} {...restProps}>
      <div
        className={cn("grid grid-rows-[0fr] overflow-hidden opacity-0 transition-all [&>*]:min-h-0", {
          "mb-8 grid-rows-[1fr] opacity-100": submitAppointmentRequest.isSuccess,
        })}
      >
        <div>
          <div className="flex flex-col gap-2 rounded-2xl bg-primary-900 p-4 text-neutral-900-text sm:flex-row sm:items-center sm:gap-4 sm:p-2">
            <div className="flex items-center gap-3 rounded-xl bg-primary-100 p-3 text-primary-100-text">
              <SendHorizonalIcon
                className={cn("-translate-x-4 opacity-0 transition-all delay-300", {
                  "translate-x-0 opacity-100": submitAppointmentRequest.isSuccess,
                })}
              />
              <Label>{successLabel}</Label>
            </div>
            <Paragraph>{successText}</Paragraph>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          className="block flex-1 rounded-2xl border bg-transparent p-4 font-serif text-neutral-100-text outline-none"
          type="email"
          placeholder={emailPlaceholder}
          value={email}
          onInput={(e) => setEmail(e.currentTarget.value)}
        />
        <Button
          className="w-full justify-center sm:w-fit"
          onClick={() => submitAppointmentRequest.mutate({ email })}
          disabled={!valid}
        >
          {submitAppointmentRequest.isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Label>{submitButtonLabel}</Label>
              <ButtonInteractionBubble />
            </>
          )}
        </Button>
      </div>
      <Turnstile
        onVerify={(token) => setTurnstileToken(token)}
        className="mx-auto mt-8 rounded-2xl mix-blend-darken"
        appearance="interaction-only"
      />
    </div>
  );
};
