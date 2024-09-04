import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { HandCoinsIcon } from "lucide-react";

export const feesPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "fees-page",
    title: "Schulbeitrag",
    type: "document",
    icon: HandCoinsIcon,
    fields: [
      defineField({
        name: "heading",
        title: "Überschrift",
        type: "string",
      }),
    ],
    preview: {
      prepare: () => ({ title: "Schulbeitrag" }),
    },
  }),
};
