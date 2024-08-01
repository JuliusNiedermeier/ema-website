"use server";

import { cookies } from "next/headers";
import { applicationCookieName } from "../application-cookie";
import { redirect } from "next/navigation";

export const restartApplicationProcess = async () => {
  cookies().delete(applicationCookieName);
  redirect("/go");
};
