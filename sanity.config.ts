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
import { AppWindowIcon, GlobeIcon, LayoutGridIcon } from "lucide-react";

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

        const modifiedSingletonTypes = singletonTypes.map((type) => {
          // Sets a specific document of the singleton type as a direct child of the list item.
          // The name of the schema type is used as the document ID here.
          // This implicitly creates the first document of the singleton type when navigating into it.
          // For subsequent visits the created document will be displayed.

          const typeName = (type.getSchemaType() as SchemaType).name;

          // The solution proposed by the Sanity documentation uses the type name as document ID.
          // https://www.sanity.io/docs/structure-builder-cheat-sheet#5cd7ca204386
          // This could lead to unexpected behaviour when deleting a singleton page and opening it again
          // IDs in Sanity must be unique, and are not released after deletion

          // Possible solution without explicitly setting the ID. An ID will be assigned automatically.
          // return type.child(S.document().schemaType(typeName).documentId(type.getId()!));

          // Solution proposed by Sanity
          return type.child(S.editor().id(typeName).schemaType(typeName).documentId(typeName));
        });

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
          .items([
            S.listItem().title("Seiten").icon(AppWindowIcon).child(S.list().title("Seiten").items(pageTypes)),
            S.listItem()
              .title("Sammlungen")
              .icon(LayoutGridIcon)
              .child(S.list().title("Sammlungen").items(repeatableTypes)),
            S.listItem()
              .title("Globale Bereiche")
              .icon(GlobeIcon)
              .child(S.list().title("Globale Bereiche").items(configTypes)),
          ]);
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    colorInput(),
  ],
});
