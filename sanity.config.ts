/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...index]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "~/sanity/env";
import { schema } from "~/sanity/schema";

export default defineConfig({
  basePath: "/studio",
  name: "ema-content-studio",
  title: "EMA Content Studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});