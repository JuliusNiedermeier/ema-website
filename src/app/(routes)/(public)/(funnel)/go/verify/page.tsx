import { HistoryIcon, MailCheckIcon, PartyPopperIcon, ShieldAlertIcon } from "lucide-react";
import { FC, PropsWithChildren, ReactNode } from "react";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { GoLayoutFooter, GoLayoutHeader } from "../_layout-components";
import { Container } from "~/app/_components/primitives/container";
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
import { ApplicationPageVerifyQueryResult, GoVerifyQueryResult } from "../../../../../../../generated/sanity/types";
import { restartApplicationProcess } from "~/server/resources/application/actions/restart-application-process";

const applicationPageVerifyQuery = groq`*[_type == "application-page"][0]{
  title,
  verification,
  error,
  success,
  alreadyDone,
  toHomePageLabel,
  applyAgainLabel
}`;

const goVerifyQuery = groq`*[_type == "educational-program" && _id == $ID][0]{
  name,
  educationalProgramType -> { name },
}`;

const interpolateString = (string: string, data: Record<string, string>) => {
  return Object.keys(data).reduce(
    (result, placeholder) => (result = result.replaceAll(`{${placeholder}}`, data[placeholder])),
    string,
  );
};

type StaticWrapperProps = {
  title: string;
};

const StaticWrapper: FC<PropsWithChildren<StaticWrapperProps>> = ({ children, title }) => {
  return (
    <div className="flex h-full flex-col">
      <GoLayoutHeader title={title} />
      <Container width="narrow" className="flex !max-w-96 flex-1 flex-col items-center justify-center text-center">
        {children}
      </Container>
      <GoLayoutFooter />
    </div>
  );
};

const GoVerifyPage: FC<{ searchParams: { application?: string; token?: string } }> = async ({ searchParams }) => {
  const data = await sanityFetch<ApplicationPageVerifyQueryResult>(applicationPageVerifyQuery, {
    tags: ["application-page"],
  });

  if (!data) notFound();

  if (searchParams.application && searchParams.token) {
    const verifiedApplication = await verifyApplication(searchParams.application, searchParams.token);

    if (!verifiedApplication) {
      return (
        <StaticWrapper title={data.title || ""}>
          <StepIcon variant="filled" className="h-16 w-16">
            <ShieldAlertIcon size={32} />
          </StepIcon>
          <Heading>{data.error?.link?.heading}</Heading>
          <Paragraph>{data.error?.link?.description}</Paragraph>
        </StaticWrapper>
      );
    }

    if (!verifiedApplication.internallyDelivered) {
      const internalNotificationSent = await sendInternalApplicationNotification(verifiedApplication);

      if (!internalNotificationSent) {
        return (
          <StaticWrapper title={data.title || ""}>
            <StepIcon variant="filled" className="h-16 w-16">
              <HistoryIcon size={32} />
            </StepIcon>
            <Heading>{data.error?.internal?.heading}</Heading>
            <Paragraph>{data.error?.internal?.description}</Paragraph>
          </StaticWrapper>
        );
      }
    }

    redirect("/go/verify");
  }

  const applicationID = cookies().get(applicationCookieName)?.value;

  if (!applicationID) redirect("/go");

  const application = await drizzle.query.applicationTable.findFirst({
    where: eq(applicationTable.ID, applicationID),
  });

  if (!application) {
    cookies().delete(applicationCookieName);
    redirect("/go");
  }

  const programDetails = await sanityFetch<GoVerifyQueryResult>(goVerifyQuery, {
    params: { ID: application.programID },
    tags: ["educational-program", "educational-program-type"],
  });

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
          message: interpolate(data.success?.description || ""), // TODO: interpolate data fields
        }
      : {
          icon: <PartyPopperIcon size={32} />,
          heading: interpolate(data.alreadyDone?.heading || ""),
          message: interpolate(data.alreadyDone?.description || ""), // TODO: interpolate data fields
        };

    return (
      <StaticWrapper title={data.title || ""}>
        <StepIcon variant="filled" className="h-16 w-16">
          {icon}
        </StepIcon>
        <Heading>{heading}</Heading>
        <Paragraph>{message}</Paragraph>

        <Button className="mt-8" href="/">
          <Label>{data.toHomePageLabel}</Label>
          <ButtonInteractionBubble />
        </Button>
        <form action={restartApplicationProcess}>
          <Button type="submit" size="sm" vairant="outline" className="mt-4 border-none">
            <Label className="underline">{data.applyAgainLabel}</Label>
          </Button>
        </form>
      </StaticWrapper>
    );
  } else {
    return (
      <StaticWrapper title={data.title || ""}>
        <StepIcon variant="filled" className="h-16 w-16">
          <MailCheckIcon size={32} />
        </StepIcon>
        <Heading>{interpolate(data.verification?.heading || "")}</Heading>
        <Paragraph>{interpolate(data.verification?.description || "")}</Paragraph>
      </StaticWrapper>
    );
  }
};

export default GoVerifyPage;
