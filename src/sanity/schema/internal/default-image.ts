import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";

export const defaultImage: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    name: "default-image",
    type: "image",
    fields: [
      defineField({
        name: "alt",
        type: "string",
        title: "Alternativtext",
        description: getSizeString(
          "heading",
          "Zeichen. Falls das Bild nicht geladen werden kann, wird dieser Text als Platzhalter angezeigt.",
        ),
        validation: createStringValidation("heading"),
      }),
    ],
  }),
};
