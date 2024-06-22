import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { MapPinIcon } from "lucide-react";

export const checkupPage: SchemaTypeDef = {
  singleton: true,
  definition: defineType({
    name: "checkup-page",
    title: "Checkup",
    type: "document",
    icon: MapPinIcon,
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
