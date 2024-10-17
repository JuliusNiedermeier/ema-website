import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PersonStandingIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";
import { createArrayValidation, createStringValidation, getSizeString } from "~/sanity/lib/validations";

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
        name: "seo",
        type: "seo-fields",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "heading",
        title: "Überschrift",
        description: getSizeString("heading", "Zeichen"),
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "teaser",
        title: "Auszug",
        description: getSizeString("description", "Zeichen"),
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "readMoreLabel",
        title: "Mehr lesen Button Text",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "staff",
        title: "Teammitglieder",
        description: getSizeString([2, 10], "Teammitglieder"),
        type: "array",
        validation: createArrayValidation([2, 20]),
        of: [
          defineArrayMember({
            name: "teamMember",
            title: "Teammitglied",
            type: "object",
            validation: (r) => r.required(),
            fields: [
              defineField({
                name: "name",
                title: "Name",
                description: getSizeString("name", "Zeichen"),
                type: "string",
                validation: createStringValidation("name"),
              }),

              defineField({
                name: "position",
                title: "Funktion",
                description: getSizeString(
                  "label",
                  "Zeichen. Was unterrichtet oder erledigt diese Person bei der EMA?",
                ),
                type: "string",
                validation: createStringValidation("label"),
              }),

              defineField({
                name: "description",
                title: "Beschreibung",
                description: getSizeString("description", "Zeichen"),
                type: "text",
                validation: createStringValidation("description"),
              }),

              defineField({
                name: "image",
                title: "Bild",
                description:
                  "Ein Foto, das die Person in Ihrem Schulalltag zeigt. Dieses Bild dient dem Kennenlernen der Person und den Räumlichkeiten oder dem Gelände.",
                type: "default-image",
                validation: (r) => r.required(),
              }),
            ],
            preview: {
              select: {
                title: "name",
                subtitle: "position",
                media: "image",
              },
            },
          }),
        ],
      }),

      defineField({
        name: "contactCTA",
        title: "Kontakt Call-To-Action",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: getSizeString("heading", "Zeichen"),
            type: "string",
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "description",
            title: "Beschreibung",
            description: getSizeString("description", "Zeichen"),
            type: "text",
            validation: createStringValidation("description"),
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Deine Akademie. Unser Team." }),
    },
  }),
};
