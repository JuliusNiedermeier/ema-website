"use server";

import { z } from "zod";
import { env } from "~/env";
import { resend, senderString } from "~/server/services/resend";
import { applicationTable, applicationTableSelectSchema } from "../schema";
import InternalApplicationNotificationMail from "~/emails/internal-application-notification";
import { drizzle } from "~/server/services/drizzle";
import { eq } from "drizzle-orm";

export const sendInternalApplicationNotification = async (
  application: z.infer<typeof applicationTableSelectSchema>,
) => {
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

  if (resendResponse.error) return false;

  await drizzle
    .update(applicationTable)
    .set({ internallyDelivered: true })
    .where(eq(applicationTable.ID, application.ID));

  return true;
};
