"use server";

import { env } from "~/env";

export const verifyTurnstileToken = async (token: string) => {
  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  const formData = new FormData();
  formData.append("secret", env.TURNSTILE_SECRET_KEY);
  formData.append("response", token);

  try {
    const response = await fetch(url, { body: formData, method: "POST" });
    const result = (await response.json()) as { success: boolean };
    return result.success;
  } catch (err) {
    console.error(err);
    return false;
  }
};
