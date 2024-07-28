import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { ShieldIcon } from "lucide-react";

export const privacyPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "privacy-page",
    title: "Datenschutz",
    type: "document",
    icon: ShieldIcon,
    fields: [
      defineField({
        name: "content",
        title: "Inhalt",
        type: "textPortableContent",
        validation: (r) => r.required(),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Datenschutz" }),
    },
  }),
};
