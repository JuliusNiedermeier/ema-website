import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { BookUserIcon, ShieldIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";

export const impressumPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "impressum-page",
    title: "Impressum",
    type: "document",
    icon: BookUserIcon,
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
      prepare: () => ({ title: "Impressum" }),
    },
  }),
};
