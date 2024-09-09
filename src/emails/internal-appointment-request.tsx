import { Html, Body, Head, Tailwind, Text, Section } from "@react-email/components";
import { EmailFC } from "./types";
import { type SendInternalAppointmentRequestConfig } from "~/server/resources/appointment/actions/send-internal-appointment-request";

export const InternalAppointmentRequestEmail: EmailFC<Omit<SendInternalAppointmentRequestConfig, "turnstileToken">> = ({
  email,
}) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body>
          <Text>{email} hat eine persönliche Beratung in der EMA angefragt.</Text>

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
  email: "john.doe@example.com",
};
