import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { SignpostIcon } from "lucide-react";

export const checkupPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "checkup-page",
    title: "Checkup",
    type: "document",
    icon: SignpostIcon,
    groups: [],
    fields: [
      defineField({
        name: "heading",
        title: "Überschrift",
        type: "string",
        validation: (r) => r.required().min(5).max(40),
      }),
      defineField({
        name: "previewText",
        title: "Auszug",
        type: "text",
        validation: (r) => r.required().min(50).max(100),
      }),
      defineField({
        name: "previewReadMoreLabel",
        title: "Mehr lesen Text",
        type: "string",
        validation: (r) => r.required().min(5).max(20),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Checkup" }),
    },
  }),
};
