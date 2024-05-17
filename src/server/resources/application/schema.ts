import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

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

export const applicationTableInsertSchema = createInsertSchema(applicationTable, {
  email: (s) => s.email.email(),
  age: (s) => s.age.min(16).max(100),
  name: (s) => s.name.min(2),
}).omit({ ID: true, createdAt: true });

export const applicationTableUpdateSchema = createInsertSchema(applicationTable).omit({ ID: true, createdAt: true });
export const applicationTableSelectSchema = createSelectSchema(applicationTable);
