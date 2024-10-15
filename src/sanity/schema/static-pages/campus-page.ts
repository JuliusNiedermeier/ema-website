import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PersonStandingIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";
import { createArrayValidation, createStringValidation } from "~/sanity/lib/validations";

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
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "teaser",
        title: "Auszug",
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "readMoreLabel",
        title: "Mehr lesen Button Text",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "staff",
        title: "Teammitglieder",
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
                type: "string",
                validation: createStringValidation("name"),
              }),

              defineField({
                name: "position",
                title: "Funktion",
                description: "Was unterrichtet oder erledigt diese Person bei der EMA?",
                type: "string",
                validation: createStringValidation("label"),
              }),

              defineField({
                name: "description",
                title: "Beschreibung",
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
            type: "string",
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "description",
            title: "Beschreibung",
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
