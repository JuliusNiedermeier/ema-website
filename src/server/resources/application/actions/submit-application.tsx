"use server";

import { drizzle } from "~/server/services/drizzle";
import { applicationTable } from "../schema";
import { resend, senderString } from "~/server/services/resend";
import { ApplicationVerificationMail } from "~/emails/application-verification";
import { applicationInputSchema } from "../application-input-schema";
import { z } from "zod";
import { cookies } from "next/headers";
import { applicationCookieName } from "../application-cookie";
import { env } from "~/env";

const BASE_URL = env.NEXT_PUBLIC_SITE_URL;

export const submitApplication = async (input: z.infer<typeof applicationInputSchema>) => {
  if (cookies().has(applicationCookieName)) return false;

  const [applicationRecord] = await drizzle.insert(applicationTable).values(input).returning();
  if (!applicationRecord) return false;

  const verificationURL = new URL(`${BASE_URL}/go/verify`);
  verificationURL.searchParams.set("application", applicationRecord.ID);
  verificationURL.searchParams.set("token", applicationRecord.verificationToken);

  const resendResponse = await resend.emails.send({
    from: senderString,
    to: applicationRecord.email,
    subject: "Bitte bestätige deine Email",
    react: (
      <ApplicationVerificationMail
        name={applicationRecord.name}
        programName={applicationRecord.programID}
        verificationURL={verificationURL.href}
      />
    ),
  });

  if (resendResponse.error) return false;

  const applicationStatusExpiryDate = new Date();
  applicationStatusExpiryDate.setMonth(applicationStatusExpiryDate.getMonth() + 6);

  cookies().set(applicationCookieName, applicationRecord.ID, {
    expires: applicationStatusExpiryDate,
    path: "/",
  });
  return true;
};
