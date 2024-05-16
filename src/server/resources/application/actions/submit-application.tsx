"use server";

import { drizzle } from "~/server/services/drizzle";
import { applicationTable } from "../schema";
import { resend, senderString } from "~/server/services/resend";
import { ApplicationVerificationMail } from "~/emails/application-verification";

const BASE_URL = "http://192.168.178.75:3000"; // Should be switched to an actual env variable

export type SubmitApplicationActionInput = {
  programID: string;
  name: string;
  age: number;
  motivation?: string;
  email: string;
};

export const submitApplication = async (input: SubmitApplicationActionInput) => {
  const [applicationRecord] = await drizzle.insert(applicationTable).values(input).returning();
  if (!applicationRecord) return null;

  const verificationURL = `${BASE_URL}/go/verify/${applicationRecord.ID}`;

  const resendResponse = await resend.emails.send({
    from: senderString,
    to: applicationRecord.email,
    subject: "Bitte bestätige deine Email",
    react: (
      <ApplicationVerificationMail
        name={applicationRecord.name}
        programName={applicationRecord.programID}
        verificationURL={verificationURL}
      />
    ),
  });

  if (resendResponse.error) return null;
};