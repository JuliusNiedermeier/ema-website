"use client";

import { ComponentProps, FC, useState } from "react";
import { cn } from "~/app/_utils/cn";
import { LoaderCircle, SendHorizonalIcon } from "lucide-react";
import { Label, Paragraph } from "../primitives/typography";
import { sendInternalAppointmentRequest } from "~/server/resources/appointment/actions/send-internal-appointment-request";
import { Button, ButtonInteractionBubble } from "../primitives/button";
import { useMutation } from "@tanstack/react-query";
import { Turnstile } from "./turnstile";
import Link from "next/link";

export type AppointmentRequestFormProps = ComponentProps<"div"> & {
  emailPlaceholder: string;
  submitButtonLabel: string;
  successLabel: string;
  successText: string;
  privacyLinkLabel: string;
};

export const AppointmentRequestForm: FC<AppointmentRequestFormProps> = ({
  className,
  emailPlaceholder,
  submitButtonLabel,
  successLabel,
  successText,
  privacyLinkLabel,
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

  const showSuccess = submitAppointmentRequest.isSuccess;

  return (
    <div className={cn("", className)} {...restProps}>
      <div
        className={cn("grid translate-y-10 grid-rows-[0fr] overflow-hidden opacity-0 transition-all [&>*]:min-h-0", {
          "grid-rows-[1fr] opacity-100": showSuccess,
        })}
      >
        <div>
          <div
            className={cn(
              "flex flex-col gap-2 rounded-2xl bg-primary-900 p-4 text-neutral-900-text sm:flex-row sm:items-center sm:gap-4 sm:p-2",
              { "pb-14 sm:pb-14": showSuccess },
            )}
          >
            <div className="flex items-center gap-3 rounded-xl bg-primary-100 p-3 text-primary-100-text">
              <SendHorizonalIcon
                className={cn("-translate-x-4 opacity-0 transition-all delay-300", {
                  "translate-x-0 opacity-100": showSuccess,
                })}
              />
              <Label>{successLabel}</Label>
            </div>
            <Paragraph>{successText}</Paragraph>
          </div>
        </div>
      </div>
      <div className="relative z-10 flex flex-col gap-2 border-primary-900 ring-neutral-100 sm:flex-row sm:gap-0 sm:rounded-full sm:border-2 sm:ring">
        <input
          className="block flex-1 rounded-full border-2 border-primary-900 bg-primary-100 px-8 py-4 text-center font-serif text-neutral-100-text placeholder-neutral-100-text-muted outline-none ring ring-neutral-100 sm:rounded-r-none sm:border-none sm:text-left sm:ring-0"
          autoFocus
          type="email"
          placeholder={emailPlaceholder}
          value={email}
          onInput={(e) => setEmail(e.currentTarget.value)}
        />
        <Button
          className="w-full justify-center sm:-ml-8 sm:w-fit"
          onClick={() => submitAppointmentRequest.mutate({ email })}
          disabled={!valid}
        >
          {submitAppointmentRequest.isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Label>{submitButtonLabel}</Label>
              <ButtonInteractionBubble className="bg-primary-100 text-primary-100-text" />
            </>
          )}
        </Button>
      </div>
      <Link href="/datenschutz" className="mx-auto mt-2 block w-fit text-neutral-100-text-muted">
        <Label>{privacyLinkLabel}</Label>
      </Link>
      <Turnstile
        onVerify={(token) => setTurnstileToken(token)}
        className="mx-auto mt-4 rounded-2xl mix-blend-darken"
        appearance="interaction-only"
      />
    </div>
  );
};
