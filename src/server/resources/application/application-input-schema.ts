import { applicationTableInsertSchema } from "./schema";

export const applicationInputSchema = applicationTableInsertSchema.omit({
  emailVerified: true,
  internallyDelivered: true,
});
