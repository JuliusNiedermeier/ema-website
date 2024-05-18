"use server";

import { safely } from "~/app/_utils/safely";
import { drizzle } from "~/server/services/drizzle";
import { applicationTable } from "../schema";
import { and, eq } from "drizzle-orm";

export const verifyApplication = async (applicationID: string, token: string) => {
  const { data: updatedApplications } = await safely(
    drizzle
      .update(applicationTable)
      .set({ emailVerified: true })
      .where(and(eq(applicationTable.ID, applicationID), eq(applicationTable.verificationToken, token)))
      .returning(),
  );

  const updatedApplication = updatedApplications?.[0];

  if (!updatedApplication) return false;

  return updatedApplication;
};
