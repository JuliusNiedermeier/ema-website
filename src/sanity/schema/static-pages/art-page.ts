import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { MapPinIcon } from "lucide-react";

export const artPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "art-page",
    title: "Kunst",
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
        name: "preview",
        title: "Vorschau",
        type: "object",
        fields: [
          defineField({
            name: "excerpt",
            title: "Auszug",
            type: "text",
            validation: (r) => r.required().min(50).max(300),
          }),
          defineField({
            name: "readMoreButtonLabel",
            title: "Mehr lesen Text",
            type: "string",
            validation: (r) => r.required().min(5).max(20),
          }),
          defineField({
            name: "backgroundImage",
            title: "Hintergrundbild",
            type: "image",
            validation: (r) => r.required(),
          }),
          defineField({ name: "leftImage", title: "Bild links", type: "image", validation: (r) => r.required() }),
          defineField({ name: "rightImage", title: "Bild rechts", type: "image", validation: (r) => r.required() }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Kunst" }),
    },
  }),
};
