import { Html, Body, Head, Tailwind, Text, Section } from "@react-email/components";
import { EmailFC } from "./types";

export const InternalApplicationNotificationMail: EmailFC<{
  name: string;
  age: number;
  motivation?: string;
  programName: string;
  email: string;
}> = (props) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body>
          <Text>
            {props.name} ({props.age} Jahre) hat sich für die {props.programName} angemeldet!
          </Text>

          {props.motivation && (
            <Section>
              <Text>Motivation:</Text>
              <Text>{props.motivation}</Text>
            </Section>
          )}

          <Section>
            <Text>Email:</Text>
            <Text>{props.email}</Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InternalApplicationNotificationMail;

InternalApplicationNotificationMail.PreviewProps = {
  name: "John Doe",
  age: 18,
  programName: "Preview program",
  email: "john.doe@example.com",
};