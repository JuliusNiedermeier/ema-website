"use server";

import { env } from "~/env";
import { resend, senderString } from "~/server/services/resend";
import InternalAppointmentRequestEmail from "~/emails/internal-appointment-request";
import { verifyTurnstileToken } from "~/server/utils/verify-turnstile-token";

export type SendInternalAppointmentRequestConfig = {
  email: string;
  turnstileToken: string;
};

export const sendInternalAppointmentRequest = async ({
  email,
  turnstileToken,
}: SendInternalAppointmentRequestConfig) => {
  if (!(await verifyTurnstileToken(turnstileToken))) return false;

  const resendResponse = await resend.emails.send({
    from: senderString,
    to: env.RESEND_INTERNAL_RECIPIENT_ADDRESS,
    subject: "Gesprächsanfrage",
    reply_to: email,
    react: <InternalAppointmentRequestEmail type={"in-person"} name={"Test"} email={email} />,
  });

  if (resendResponse.error) return false;

  return true;
};
