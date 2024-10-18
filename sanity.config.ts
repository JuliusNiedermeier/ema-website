/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...index]]\page.tsx` route
 */

import { defineConfig, isDev } from "sanity";
import { env } from "~/env";
import { colorInput } from "@sanity/color-input";
import { media } from "sanity-plugin-media";

import {
  schema,
  staticPageTypeNames,
  dynamicPageTypeNames,
  globalComponentTypeNames,
  globalConfigTypeNames,
  emailTypeNames,
} from "~/sanity/schema";
import { StringInput } from "~/sanity/components/string-input";
import { StudioIcon } from "~/sanity/components/studio-icon";
import { structure } from "~/sanity/tools/structure";
import { presentation } from "~/sanity/tools/presentation";
import { vision } from "~/sanity/tools/vision";

export default defineConfig({
  basePath: "/studio",
  name: "ema-content-studio",
  title: "Content Studio",
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  schema,
  icon: StudioIcon,
  form: { components: { input: StringInput } },
  document: {
    newDocumentOptions: (items, { creationContext }) => {
      if (creationContext.type === "global") {
        // Removes all singleton types from the global create button.
        return items.filter(
          (item) =>
            !staticPageTypeNames.has(item.templateId) &&
            !globalComponentTypeNames.has(item.templateId) &&
            !dynamicPageTypeNames.has(item.templateId) &&
            !globalConfigTypeNames.has(item.templateId) &&
            !emailTypeNames.has(item.templateId),
        );
      }
      return items;
    },
  },
  plugins: isDev
    ? [structure, vision, colorInput(), media(), presentation]
    : [structure, colorInput(), media(), presentation],
});
