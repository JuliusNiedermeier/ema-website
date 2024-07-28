import { Button, Html, Body, Head, Tailwind, Text } from "@react-email/components";
import { EmailFC } from "./types";

type ApplicationVerificationMailProps = {
  name: string;
  programName: string;
  verificationURL: string;
  heading: string;
  body: string;
  verifyButtonLabel: string;
  regards: string;
  senderName: string;
};

export const ApplicationVerificationMail: EmailFC<ApplicationVerificationMailProps> = (props) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body>
          <Text>{props.heading}</Text>
          <Text>{props.body}</Text>
          <Button href={props.verificationURL} className="bg-gray-800 text-gray-100 rounded-full px-8 py-4">
            {props.verifyButtonLabel}
          </Button>
          <Text>{props.regards}</Text>
          <Text>{props.senderName}</Text>
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
  heading: "Danke für deine Anmeldung",
  body: "...",
  verifyButtonLabel: "Anmeldung bestätitgen",
  regards: "Mit freundlichen Grüßen",
  senderName: "das Team der Emil Molt Akademie",
};
