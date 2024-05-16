import { eq } from "drizzle-orm";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { safely } from "~/app/_utils/safely";
import InternalApplicationNotificationMail from "~/emails/internal-application-notification";
import { env } from "~/env";
import { applicationTable } from "~/server/resources/schema";
import { drizzle } from "~/server/services/drizzle";
import { resend, senderString } from "~/server/services/resend";

const Error: FC = () => {
  return (
    <Container>
      <Heading>Etwas ging schief</Heading>
      <Paragraph>Wir konnten deine Anmeldung leider nicht bestätigen. Bitte wende dich direkt an uns.</Paragraph>
    </Container>
  );
};

const AlreadyVerified: FC = () => {
  return (
    <Container>
      <Heading>Deine Anmeldung wurde bereits verifiziert.</Heading>
      <Paragraph>Du brauchst nichts mehr zu tun.</Paragraph>
    </Container>
  );
};

const Success: FC<{ name: string }> = ({ name }) => {
  return (
    <Container>
      <Heading>Herzlichen Glückwunsch, {name}!</Heading>
      <Paragraph>Deine Anmeldung ist vollständig. Wir werden uns zeitnah mit dir in Verbindung setzen.</Paragraph>
    </Container>
  );
};

const GoVerificationPage: FC<{ params: { applicationID: string } }> = async ({ params: { applicationID } }) => {
  const { data: updatedApplications } = await safely(
    drizzle
      .update(applicationTable)
      .set({ emailVerified: true })
      .where(eq(applicationTable.ID, applicationID))
      .returning(),
  );

  const application = updatedApplications?.[0];

  if (!application) return <Error />;

  if (application.internallyDelivered) return <AlreadyVerified />;

  const resendResponse = await resend.emails.send({
    from: senderString,
    to: env.RESEND_INTERNAL_RECIPIENT_ADDRESS,
    subject: "Neue Anmeldung",
    reply_to: application.email,
    react: (
      <InternalApplicationNotificationMail
        name={application.name}
        age={application.age}
        programName={application.programID}
        motivation={application.motivation || undefined}
        email={application.email}
      />
    ),
  });

  if (resendResponse.error) return <Error />;

  await drizzle
    .update(applicationTable)
    .set({ internallyDelivered: true })
    .where(eq(applicationTable.ID, application.ID));

  return <Success name={application.name} />;
};

export default GoVerificationPage;
