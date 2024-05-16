import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleClient } from "drizzle-orm/neon-http";
import { env } from "~/env";
import * as schema from "~/server/resources/schema";

const sql = neon(env.POSTGRES_CONNECTION_STRING);
export const drizzle = drizzleClient(sql, { schema });
