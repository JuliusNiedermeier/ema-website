import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PersonStandingIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";

export const campusPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "campus-page",
    title: "Deine Akademie. Unser Team.",
    type: "document",
    icon: PersonStandingIcon,
    groups: [],
    fields: [
      navigationLabel,
      defineField({
        name: "heading",
        title: "Überschrift",
        type: "string",
      }),

      defineField({
        name: "teaser",
        title: "Auszug",
        type: "text",
        validation: (r) => r.required().min(50).max(300),
      }),

      defineField({
        name: "readMoreLabel",
        title: "Mehr lesen Button Text",
        type: "string",
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
                type: "default-image",
              }),
            ],
          }),
        ],
      }),

      defineField({
        name: "contactCTA",
        title: "Kontakt Call-To-Action",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "description",
            title: "Beschreibung",
            type: "text",
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Deine Akademie. Unser Team." }),
    },
  }),
};
