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
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { ApplicationVerificationEmailQueryResult } from "../../../../../generated/sanity/types";
import { verifyTurnstileToken } from "~/server/utils/verify-turnstile-token";

const applicationVerificationEmailQuery = groq`*[_type == "application-verification-email"][0]`;

export const submitApplication = async (input: z.infer<typeof applicationInputSchema>, turnstileToken: string) => {
  if (cookies().has(applicationCookieName)) return false;

  if (!(await verifyTurnstileToken(turnstileToken))) return false;

  const [applicationRecord] = await drizzle.insert(applicationTable).values(input).returning();
  if (!applicationRecord) return false;

  const emailContent = await sanityFetch<ApplicationVerificationEmailQueryResult>(applicationVerificationEmailQuery, {
    tags: ["application-verification-email"],
  });

  if (!emailContent) return false;

  const verificationURL = new URL(`${env.NEXT_PUBLIC_SITE_URL}/online-bewerbung/bestaetigung`);
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
        heading={emailContent.heading?.replaceAll("{name}", applicationRecord.name) || ""}
        body={emailContent.body?.replaceAll("{name}", applicationRecord.name) || ""}
        verifyButtonLabel={emailContent.verifyButtonLabel || ""}
        regards={emailContent.regards || ""}
        senderName={emailContent.senderName || ""}
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
