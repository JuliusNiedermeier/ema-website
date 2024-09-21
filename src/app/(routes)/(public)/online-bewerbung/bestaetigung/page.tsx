import { HistoryIcon, MailCheckIcon, PartyPopperIcon, ShieldAlertIcon } from "lucide-react";
import { FC, ReactNode } from "react";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { StepIcon } from "~/app/_components/primitives/step-list";
import { cookies } from "next/headers";
import { applicationCookieName } from "~/server/resources/application/application-cookie";
import { notFound, redirect } from "next/navigation";
import { verifyApplication } from "~/server/resources/application/actions/verify-application";
import { drizzle } from "~/server/services/drizzle";
import { eq } from "drizzle-orm";
import { applicationTable } from "~/server/resources/schema";
import { sendInternalApplicationNotification } from "~/server/resources/application/actions/send-internal-application-notification";
import { Button, ButtonInteractionBubble } from "~/app/_components/primitives/button";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { restartApplicationProcess } from "~/server/resources/application/actions/restart-application-process";
import {
  OnlineApplicationVerifyPageProgramQueryResult,
  OnlineApplicationVerifyPageQueryResult,
} from "../../../../../../generated/sanity/types";
import { IconChip } from "~/app/_components/primitives/icon-chip";

const onlineApplicationVerifyPageQuery = groq`*[_type == "application-page"][0]{
  title,
  verification,
  error,
  success,
  alreadyDone,
  toHomePageLabel,
  applyAgainLabel
}`;

const onlineApplicationVerifyPageProgramQuery = groq`*[_type == "educational-program" && _id == $ID][0]{
  name,
  educationalProgramType -> { name },
}`;

const interpolateString = (string: string, data: Record<string, string>) => {
  return Object.keys(data).reduce(
    (result, placeholder) => (result = result.replaceAll(`{${placeholder}}`, data[placeholder])),
    string,
  );
};

const OnlineApplicationVerifyPage: FC<{ searchParams: { application?: string; token?: string } }> = async ({
  searchParams,
}) => {
  const data = await sanityFetch<OnlineApplicationVerifyPageQueryResult>(onlineApplicationVerifyPageQuery, {
    tags: ["application-page"],
  });

  if (!data) notFound();

  if (searchParams.application && searchParams.token) {
    const verifiedApplication = await verifyApplication(searchParams.application, searchParams.token);

    if (!verifiedApplication) {
      return (
        <div>
          <IconChip>
            <ShieldAlertIcon size={32} />
          </IconChip>
          <Heading className="text-primary-900-text">{data.error?.link?.heading}</Heading>
          <Paragraph className="text-neutral-900-text-muted">{data.error?.link?.description}</Paragraph>
        </div>
      );
    }

    if (!verifiedApplication.internallyDelivered) {
      const internalNotificationSent = await sendInternalApplicationNotification(verifiedApplication);

      if (!internalNotificationSent) {
        return (
          <div>
            <IconChip>
              <HistoryIcon size={32} />
            </IconChip>
            <Heading className="text-primary-900-text">{data.error?.internal?.heading}</Heading>
            <Paragraph className="text-neutral-900-text-muted">{data.error?.internal?.description}</Paragraph>
          </div>
        );
      }
    }

    redirect("/online-bewerbung/bestaetigung");
  }

  const applicationID = cookies().get(applicationCookieName)?.value;

  if (!applicationID) redirect("/online-bewerbung");

  const application = await drizzle.query.applicationTable.findFirst({
    where: eq(applicationTable.ID, applicationID),
  });

  if (!application) {
    cookies().delete(applicationCookieName);
    redirect("/online-bewerbung");
  }

  const programDetails = await sanityFetch<OnlineApplicationVerifyPageProgramQueryResult>(
    onlineApplicationVerifyPageProgramQuery,
    {
      params: { ID: application.programID },
      tags: ["educational-program", "educational-program-type"],
    },
  );

  const interpolate = (string: string) => {
    return interpolateString(string, {
      Name: application.name,
      Email: application.email,
      Datum: application.createdAt.toLocaleDateString("de"),
      Bildungsgang: `${programDetails?.educationalProgramType?.name} ${programDetails?.name}`,
    });
  };

  if (application.emailVerified) {
    const hasAppliedRecently = Date.now() - application.createdAt.valueOf() < 1000 * 60 * 60 * 24 * 3;

    type Config = {
      icon: ReactNode;
      heading: string;
      message: string;
    };

    const { icon, heading, message }: Config = hasAppliedRecently
      ? {
          icon: <PartyPopperIcon size={32} />,
          heading: interpolate(data.success?.heading || ""),
          message: interpolate(data.success?.description || ""),
        }
      : {
          icon: <PartyPopperIcon size={32} />,
          heading: interpolate(data.alreadyDone?.heading || ""),
          message: interpolate(data.alreadyDone?.description || ""),
        };

    return (
      <div>
        <IconChip>{icon}</IconChip>
        <Heading className="text-primary-900-text">{heading}</Heading>
        <Paragraph className="text-neutral-900-text-muted">{message}</Paragraph>

        <Button className="mt-8 bg-primary-100 text-primary-100-text" href="/">
          <Label>{data.toHomePageLabel}</Label>
          <ButtonInteractionBubble />
        </Button>
        <form action={restartApplicationProcess}>
          <Button type="submit" size="sm" vairant="outline" className="mt-4 border-none">
            <Label className="text-neutral-900-text-muted underline">{data.applyAgainLabel}</Label>
          </Button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <IconChip>
          <MailCheckIcon size={32} />
        </IconChip>
        <Heading className="text-primary-900-text">{interpolate(data.verification?.heading || "")}</Heading>
        <Paragraph className="text-neutral-900-text-muted">
          {interpolate(data.verification?.description || "")}
        </Paragraph>
      </div>
    );
  }
};

export default OnlineApplicationVerifyPage;
