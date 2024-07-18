import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PersonStandingIcon } from "lucide-react";

export const campusPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "campus-page",
    title: "Deine Akademie. Unser Team.",
    type: "document",
    icon: PersonStandingIcon,
    groups: [],
    fields: [
      defineField({
        name: "heading",
        title: "Überschrift",
        type: "string",
      }),
      defineField({
        name: "previewText",
        title: "Auszug",
        type: "text",
      }),
      defineField({
        name: "previewReadMoreButtonLabel",
        title: "Mehr lesen Button Text",
        type: "string",
      }),
      defineField({
        name: "heroImage",
        title: "Hauptbild",
        type: "image",
      }),
      defineField({
        name: "staff",
        title: "Teammitglieder",
        type: "array",
        of: [
          defineArrayMember({
            name: "teamMember",
            title: "Teammitglied",
            type: "object",
            fields: [
              defineField({
                name: "name",
                title: "Name",
                type: "string",
              }),
              defineField({
                name: "position",
                title: "Funktion",
                description: "Was unterrichtet oder erledigt diese Person bei der EMA?",
                type: "string",
              }),
              defineField({
                name: "description",
                title: "Beschreibung",
                type: "text",
              }),
              defineField({
                name: "image",
                title: "Bild",
                description:
                  "Ein Foto, das die Person in Ihrem Schulalltag zeigt. Dieses Bild dient dem Kennenlernen der Person und den Räumlichkeiten oder dem Gelände.",
                type: "image",
              }),
            ],
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Deine Akademie. Unser Team." }),
    },
  }),
};
