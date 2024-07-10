import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PersonStandingIcon } from "lucide-react";

export const campusPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "campus-page",
    title: "Campus & Team",
    type: "document",
    icon: PersonStandingIcon,
    groups: [
      {
        name: "campus",
        title: "Campus",
      },
      {
        name: "team",
        title: "Team",
      },
    ],
    fields: [
      defineField({
        name: "heading",
        title: "Überschrift",
        type: "string",
        group: "campus",
      }),
      defineField({
        name: "previewText",
        title: "Auszug",
        type: "text",
        group: "campus",
      }),
      defineField({
        name: "previewReadMoreButtonLabel",
        title: "Mehr lesen Button Text",
        type: "string",
        group: "campus",
      }),
      defineField({
        name: "heroImage",
        title: "Hauptbild",
        type: "image",
        group: "campus",
      }),
      defineField({
        name: "images",
        title: "Weitere Bilder",
        type: "array",
        group: "campus",
        of: [
          defineArrayMember({
            name: "image-item",
            title: "Bild",
            type: "image",
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Dein Campus" }),
    },
  }),
};
