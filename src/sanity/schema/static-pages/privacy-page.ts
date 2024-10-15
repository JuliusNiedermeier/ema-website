import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { ShieldIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";

export const privacyPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "privacy-page",
    title: "Datenschutz",
    type: "document",
    icon: ShieldIcon,
    fields: [
      navigationLabel,

      defineField({
        name: "seo",
        type: "seo-fields",
        validation: (r) => r.required(),
      }),

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
