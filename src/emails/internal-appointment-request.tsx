import { Html, Body, Head, Tailwind, Text, Section } from "@react-email/components";
import { EmailFC } from "./types";
import { type SendInternalAppointmentRequestConfig } from "~/server/resources/appointment/actions/send-internal-appointment-request";

export const InternalAppointmentRequestEmail: EmailFC<SendInternalAppointmentRequestConfig> = ({
  type,
  name,
  email,
}) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body>
          <Text>
            {name} hat {type === "online" ? "einen Video-Call" : "ein Gespräch in der EMA"} angefragt!
          </Text>

          <Section>
            <Text>Email:</Text>
            <Text>{email}</Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InternalAppointmentRequestEmail;

InternalAppointmentRequestEmail.PreviewProps = {
  type: "in-person",
  name: "John Doe",
  email: "john.doe@example.com",
};
