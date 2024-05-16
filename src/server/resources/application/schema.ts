import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const applicationTable = pgTable("application", {
  ID: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  programID: text("program_id").notNull(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  email: text("email").notNull(),
  emailVerified: boolean("email_verified").notNull().default(false),
  motivation: text("motivation"),
  internallyDelivered: boolean("internally_delivered").notNull().default(false),
});
