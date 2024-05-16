import { Button, Html, Body, Head, Tailwind, Text } from "@react-email/components";
import { EmailFC } from "./types";

export const ApplicationVerificationMail: EmailFC<{ name: string; programName: string; verificationURL: string }> = (
  props,
) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body>
          <Text>Danke für dein Interesse, {props.name}!</Text>
          <Text>
            Bitte bestätige deine Anmeldung innerhalb der nächsten 24 Stunden, indem du auf den Button klickst.
          </Text>
          <Button href={props.verificationURL} className="bg-gray-800 text-gray-100 rounded-full px-8 py-4">
            Anmeldung bestätigen
          </Button>
          <Text>Wir freuen uns dir zeitnah ein persönliches Gespräch anbieten zu können.</Text>
          <Text>Mit freundlichen Grüßen</Text>
          <Text>das Kollegium der Emil Molt Akademie</Text>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ApplicationVerificationMail;

ApplicationVerificationMail.PreviewProps = {
  name: "John Doe",
  programName: "Preview program",
  verificationURL: "https://example.com",
};
