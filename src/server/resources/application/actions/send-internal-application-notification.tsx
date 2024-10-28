"use server";

import { z } from "zod";
import { env } from "~/env";
import { resend, senderString } from "~/server/services/resend";
import { applicationTable, applicationTableSelectSchema } from "../schema";
import InternalApplicationNotificationMail from "~/emails/internal-application-notification";
import { drizzle } from "~/server/services/drizzle";
import { eq } from "drizzle-orm";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { InternalApplicationNotificationProgramQueryResult } from "../../../../../generated/sanity/types";

const internalApplicationNotificationProgramQuery = groq`*[_type == "educational-program" && _id == $ID][0]{
  name,
  "type": educationalProgramType -> name
}`;

export const sendInternalApplicationNotification = async (
  application: z.infer<typeof applicationTableSelectSchema>,
) => {
  const program = await sanityFetch<InternalApplicationNotificationProgramQueryResult>(
    internalApplicationNotificationProgramQuery,
    {
      params: { ID: application.programID },
      tags: ["educational-program"],
    },
  );

  if (!program) return false;

  const resendResponse = await resend.emails.send({
    from: senderString,
    to: env.RESEND_INTERNAL_RECIPIENT_ADDRESS,
    subject: "Neue Anmeldung",
    reply_to: application.email,
    react: (
      <InternalApplicationNotificationMail
        programName={`${program.type} ${program.name}`}
        name={application.name}
        age={application.age}
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
