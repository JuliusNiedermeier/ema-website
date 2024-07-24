"use server";

import { env } from "~/env";
import { resend, senderString } from "~/server/services/resend";
import InternalAppointmentRequestEmail from "~/emails/internal-appointment-request";

export type SendInternalAppointmentRequestConfig = { type: "online" | "in-person"; name: string; email: string };

export const sendInternalAppointmentRequest = async ({ type, name, email }: SendInternalAppointmentRequestConfig) => {
  const resendResponse = await resend.emails.send({
    from: senderString,
    to: env.RESEND_INTERNAL_RECIPIENT_ADDRESS,
    subject: "Gesprächsanfrage",
    reply_to: email,
    react: <InternalAppointmentRequestEmail type={type} name={name} email={email} />,
  });

  if (resendResponse.error) return false;

  return true;
};
