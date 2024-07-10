/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...index]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { SchemaType, defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { env } from "~/env";
import { apiVersion } from "~/sanity/config";
import { colorInput } from "@sanity/color-input";

import { schema, pageTypeNames, configTypeNames, repeatableTypeNames } from "~/sanity/schema";

export default defineConfig({
  basePath: "/studio",
  name: "ema-content-studio",
  title: "EMA Content Studio",
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  schema,
  document: {
    newDocumentOptions: (items, { creationContext }) => {
      if (creationContext.type === "global") {
        // Removes all singleton types from the global create button.
        return items.filter((item) => !pageTypeNames.has(item.templateId) && !configTypeNames.has(item.templateId));
      }
      return items;
    },
  },
  plugins: [
    structureTool({
      structure: (S) => {
        // Get list of all singleton types
        const singletonTypes = S.documentTypeListItems().filter((S) => {
          const typeName = (S.getSchemaType() as SchemaType).name;
          return pageTypeNames.has(typeName) || configTypeNames.has(typeName);
        });

        const modifiedSingletonTypes = singletonTypes.map((type) =>
          // Sets a specific document of the singleton type as a direct child of the list item.
          // The name of the schema type is used as the document ID here.
          // This implicitly creates the first document of the singleton type when navigating into it.
          // For subsequent visits the created document will be displayed.
          type.child(
            S.document()
              .schemaType((type.getSchemaType() as SchemaType).name)
              .documentId(type.getId()!),
          ),
        );

        // Get list of page types
        const pageTypes = modifiedSingletonTypes.filter((type) =>
          pageTypeNames.has((type.getSchemaType() as SchemaType).name),
        );

        // Get list of config types
        const configTypes = modifiedSingletonTypes.filter((type) =>
          configTypeNames.has((type.getSchemaType() as SchemaType).name),
        );

        // Get list of repeatable types
        const repeatableTypes = S.documentTypeListItems().filter((S) =>
          repeatableTypeNames.has((S.getSchemaType() as SchemaType).name),
        );

        return S.list()
          .id("content")
          .title("Content")
          .items([...pageTypes, S.divider(), ...repeatableTypes, S.divider(), ...configTypes]);
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    colorInput(),
  ],
});
