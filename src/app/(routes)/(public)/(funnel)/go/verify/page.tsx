import { HistoryIcon, MailCheckIcon, PartyPopperIcon, ShieldAlertIcon } from "lucide-react";
import { FC, PropsWithChildren, ReactNode } from "react";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { GoLayoutFooter, GoLayoutHeader } from "../_layout-components";
import { Container } from "~/app/_components/primitives/container";
import { StepIcon } from "~/app/_components/primitives/step-list";
import { cookies } from "next/headers";
import { applicationCookieName } from "~/server/resources/application/application-cookie";
import { redirect } from "next/navigation";
import { verifyApplication } from "~/server/resources/application/actions/verify-application";
import { drizzle } from "~/server/services/drizzle";
import { eq } from "drizzle-orm";
import { applicationTable } from "~/server/resources/schema";
import { sendInternalApplicationNotification } from "~/server/resources/application/actions/send-internal-application-notification";
import { Button, ButtonInteractionBubble } from "~/app/_components/primitives/button";
import { groq } from "next-sanity";
import { sanity } from "~/sanity/lib/client";
import { GoVerifyQueryResult } from "../../../../../../../generated/sanity/types";
import { restartApplicationProcess } from "~/server/resources/application/actions/restart-application-process";

const goVerifyQuery = groq`*[_type == "educational-program" && _id == $ID][0]{
  name,
  educationalProgramType -> { name },
}`;

const StaticWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-full flex-col">
      <GoLayoutHeader />
      <Container width="narrow" className="flex !max-w-96 flex-1 flex-col items-center justify-center text-center">
        {children}
      </Container>
      <GoLayoutFooter />
    </div>
  );
};

const GoVerifyPage: FC<{ searchParams: { application?: string; token?: string } }> = async ({ searchParams }) => {
  if (searchParams.application && searchParams.token) {
    const verifiedApplication = await verifyApplication(searchParams.application, searchParams.token);

    if (!verifiedApplication) {
      return (
        <StaticWrapper>
          <StepIcon variant="filled" className="h-16 w-16">
            <ShieldAlertIcon size={32} />
          </StepIcon>
          <Heading>Das hat nicht geklappt...</Heading>
          <Paragraph>
            Etwas stimmt mit dem Link nicht. Wir konnten deine Mailadresse leider nicht bestätigen. Versuche es bitte
            später nochmal.
          </Paragraph>
        </StaticWrapper>
      );
    }

    if (!verifiedApplication.internallyDelivered) {
      const internalNotificationSent = await sendInternalApplicationNotification(verifiedApplication);

      if (!internalNotificationSent) {
        return (
          <StaticWrapper>
            <StepIcon variant="filled" className="h-16 w-16">
              <HistoryIcon size={32} />
            </StepIcon>
            <Heading>Das hat nicht geklappt...</Heading>
            <Paragraph>
              Wegen technischen Schwierigkeiten, haben wir deine Anmeldung leider nicht erhalten. Versuche es bitte mit
              dem selben Link später noch einmal.
            </Paragraph>
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

  if (application.emailVerified) {
    const programDetails = await sanity.fetch<GoVerifyQueryResult>(
      goVerifyQuery,
      { ID: application.programID },
      { next: { tags: ["educational-program", "educational-program-type"] } },
    );

    const programName = `${programDetails?.educationalProgramType?.name} ${programDetails?.name}`;

    const hasAppliedRecently = Date.now() - application.createdAt.valueOf() < 1000 * 60 * 60 * 24 * 3;

    type Config = {
      icon: ReactNode;
      heading: string;
      message: string;
    };

    const { icon, heading, message }: Config = hasAppliedRecently
      ? {
          icon: <PartyPopperIcon size={32} />,
          heading: "Alles geschafft!",
          message: `Wir haben deine Anmeldung für die ${programName} erhalten und werden uns in den nächsten Tagen bei dir melden.`,
        }
      : {
          icon: <PartyPopperIcon size={32} />,
          heading: "Du hast dich bereits angemeldet.",
          message: `Wir haben am ${application.createdAt.toLocaleDateString("de")} von dir bereits eine Anmeldung für die ${programName} erhalten.`,
        };

    return (
      <StaticWrapper>
        <StepIcon variant="filled" className="h-16 w-16">
          {icon}
        </StepIcon>
        <Heading>{heading}</Heading>
        <Paragraph>{message}</Paragraph>

        <Button className="mt-8" href="/">
          <Label>Zur Startseite</Label>
          <ButtonInteractionBubble />
        </Button>
        <form action={restartApplicationProcess}>
          <Button type="submit" size="sm" vairant="outline" className="mt-4 border-none">
            <Label className="underline">Erneut anmelden</Label>
          </Button>
        </form>
      </StaticWrapper>
    );
  } else {
    return (
      <StaticWrapper>
        <StepIcon variant="filled" className="h-16 w-16">
          <MailCheckIcon size={32} />
        </StepIcon>
        <Heading>Bitte bestätige deine Mailadresse</Heading>
        <Paragraph>
          Wir haben einen Bestätigunslink an {application.email} gesendet. <br /> Bitte schließe deine Anmeldung ab,
          indem du auf den Link in der Mail klickst.
        </Paragraph>
      </StaticWrapper>
    );
  }
};

export default GoVerifyPage;
