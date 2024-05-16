import type { Config } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";
import { cwd } from "process";

loadEnvConfig(cwd());

export default {
  schema: "./src/server/resources/schema.ts",
  out: "./drizzle",
  introspect: { casing: "preserve" },
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_CONNECTION_STRING!,
  },
} satisfies Config;
