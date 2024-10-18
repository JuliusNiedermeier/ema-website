/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...index]]\page.tsx` route
 */

import { SchemaType } from "sanity";
import { structureTool } from "sanity/structure";
import {
  staticPageTypeNames,
  dynamicPageTypeNames,
  globalComponentTypeNames,
  dynamicContentTypeNames,
  globalConfigTypeNames,
  emailTypeNames,
} from "~/sanity/schema";
import { CircleHelpIcon, MailIcon, SquareMousePointerIcon } from "lucide-react";
import { HelpArticle } from "~/sanity/components/help-article";

export const structure = structureTool({
  structure: (S) => {
    // Get list of all singleton types
    const singletonTypes = S.documentTypeListItems().filter((S) => {
      const typeName = (S.getSchemaType() as SchemaType).name;
      return (
        staticPageTypeNames.has(typeName) ||
        dynamicPageTypeNames.has(typeName) ||
        globalComponentTypeNames.has(typeName) ||
        globalConfigTypeNames.has(typeName) ||
        emailTypeNames.has(typeName)
      );
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

    // Get list of static page types
    const staticPageTypes = modifiedSingletonTypes.filter((type) =>
      staticPageTypeNames.has((type.getSchemaType() as SchemaType).name),
    );

    // Get list of dynamic-page types
    const dynamicPageTypes = modifiedSingletonTypes.filter((type) =>
      dynamicPageTypeNames.has((type.getSchemaType() as SchemaType).name),
    );

    // Get list of dynamic-content types
    const dynamicContentTypes = S.documentTypeListItems().filter((S) =>
      dynamicContentTypeNames.has((S.getSchemaType() as SchemaType).name),
    );

    // Get list of global-component types
    const globalComponentTypes = modifiedSingletonTypes.filter((type) =>
      globalComponentTypeNames.has((type.getSchemaType() as SchemaType).name),
    );

    // Get list of email types
    const emailTypes = modifiedSingletonTypes.filter((type) =>
      emailTypeNames.has((type.getSchemaType() as SchemaType).name),
    );

    // Get list of global-config types
    const globaleConfigTypes = modifiedSingletonTypes.filter((type) =>
      globalConfigTypeNames.has((type.getSchemaType() as SchemaType).name),
    );

    return S.list()
      .id("content")
      .title("Content")
      .items([
        ...dynamicContentTypes,

        S.divider(),
        S.listItem({ id: "pages", title: "Statische Seiten", icon: SquareMousePointerIcon }).child(
          S.list({
            id: "pages",
            title: "Seiten",
            items: [...staticPageTypes, S.divider(), ...dynamicPageTypes],
          }),
        ),
        S.listItem({ id: "email", title: "Emails", icon: MailIcon }).child(
          S.list({ id: "email", title: "Emails", items: emailTypes }),
        ),

        S.divider(),
        ...globalComponentTypes,

        S.divider(),
        ...globaleConfigTypes,
        S.listItem({ id: "help", title: "Hilfe", icon: CircleHelpIcon }).child(
          S.component({ id: "help", component: HelpArticle }),
        ),
      ]);
  },
});
