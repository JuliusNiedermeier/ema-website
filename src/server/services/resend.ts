import { Resend } from "resend";
import { env } from "~/env";

export const resend = new Resend(env.RESEND_API_KEY);

export const senderString = `${env.RESEND_PUBLIC_SENDER_NAME} <${env.RESEND_SENDER_ADDRESS}>`;
