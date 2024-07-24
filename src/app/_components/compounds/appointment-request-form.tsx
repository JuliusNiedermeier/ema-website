"use client";

import { ComponentProps, FC, useState } from "react";
import { cn } from "~/app/_utils/cn";
import { Tab, TabList } from "../primitives/tabs";
import { IconChip } from "../primitives/icon-chip";
import { LoaderCircle, MapPinIcon, VideoIcon } from "lucide-react";
import { Heading, Label, Paragraph } from "../primitives/typography";
import {
  sendInternalAppointmentRequest,
  type SendInternalAppointmentRequestConfig,
} from "~/server/resources/appointment/actions/send-internal-appointment-request";
import { Button, ButtonInteractionBubble } from "../primitives/button";
import { useMutation } from "@tanstack/react-query";
import { Card } from "../primitives/card";

export type AppointmentRequestFormProps = ComponentProps<"div"> & {
  onlineTypeLabel: string;
  inPersonTypeLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  submitButtonLabel: string;
  defaultType: SendInternalAppointmentRequestConfig["type"];
};

export const AppointmentRequestForm: FC<AppointmentRequestFormProps> = ({
  className,
  onlineTypeLabel,
  inPersonTypeLabel,
  namePlaceholder,
  emailPlaceholder,
  submitButtonLabel,
  defaultType,
  ...restProps
}) => {
  const [type, setType] = useState(defaultType);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submitAppointmentRequest = useMutation({
    mutationFn: async (data: { type: AppointmentRequestFormProps["defaultType"]; name: string; email: string }) => {
      const success = await sendInternalAppointmentRequest({ type: data.type, name: data.name, email: data.email });
      if (!success) throw new Error();
    },
  });

  return (
    <div className={cn("", className)} {...restProps}>
      {submitAppointmentRequest.isSuccess ? (
        <Card className="mb-8">
          <Heading>Danke, wir haben deine Anfrage erhalten!</Heading>
          <Paragraph>Wir werden uns in Kürze bei dir per Email melden und einen Termin mit dir vereinbaren.</Paragraph>
        </Card>
      ) : (
        <>
          <TabList>
            <Tab
              active={type === "online"}
              className="justify-start gap-4 pl-2"
              onClick={() => setType("online")}
              asChild
            >
              <button>
                <IconChip on={type === "online" ? "dark" : "light"}>
                  <VideoIcon size="18" />
                </IconChip>
                <Label className={cn({ "text-neutral-900-text": type === "online" })}>{onlineTypeLabel}</Label>
              </button>
            </Tab>
            <Tab
              active={type === "in-person"}
              className="justify-start gap-4 pl-2"
              onClick={() => setType("in-person")}
              asChild
            >
              <button>
                <IconChip on={type === "in-person" ? "dark" : "light"}>
                  <MapPinIcon size="18" />
                </IconChip>
                <Label className={cn({ "text-neutral-900-text": type === "in-person" })}>{onlineTypeLabel}</Label>
              </button>
            </Tab>
          </TabList>
          <input
            className="mt-8 block w-full rounded-2xl border border-neutral-900-text bg-transparent p-4 font-serif text-neutral-900-text outline-none"
            placeholder={namePlaceholder}
            value={name}
            onInput={(e) => setName(e.currentTarget.value)}
          />
          <input
            className="mt-8 block w-full rounded-2xl border border-neutral-900-text bg-transparent p-4 font-serif text-neutral-900-text outline-none"
            type="email"
            placeholder={emailPlaceholder}
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
          <Button
            className="mt-8 w-full justify-center bg-primary-100 text-primary-100-text"
            onClick={() => submitAppointmentRequest.mutate({ type, name, email })}
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
        </>
      )}
    </div>
  );
};
