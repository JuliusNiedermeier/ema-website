import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { BookUserIcon, ShieldIcon } from "lucide-react";

export const impressumPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "impressum-page",
    title: "Impressum",
    type: "document",
    icon: BookUserIcon,
    fields: [
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
