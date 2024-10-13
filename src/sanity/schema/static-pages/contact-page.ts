import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { MapPinIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";
import { createArrayValidation, createStringValidation } from "~/sanity/lib/validations";

export const contactPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "contact-page",
    title: "Kontakt",
    type: "document",
    icon: MapPinIcon,
    groups: [],
    fields: [
      navigationLabel,

      defineField({
        name: "heading",
        title: "Überschrift",
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "teaser",
        title: "Beschreibung",
        description: "100-300 Zeichen. Worum geht es auf dieser Seite?",
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "readMoreLabel",
        title: "Mehr-Lesen-Text",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "contactInformation",
        title: "Kontaktinformationen",
        type: "object",
        fields: [
          defineField({
            name: "phone",
            title: "Telefon",
            type: "string",
            validation: createStringValidation([8, 20]),
          }),

          defineField({
            name: "email",
            title: "Email",
            type: "string",
            validation: createStringValidation([5, 50]),
          }),

          defineField({
            name: "instagram",
            title: "Instagram",
            type: "string",
            validation: createStringValidation([5, 30]),
          }),
        ],
      }),

      defineField({
        name: "officeHours",
        title: "Sprechzeiten",
        type: "array",
        validation: createArrayValidation([1, 7]),
        of: [
          defineArrayMember({
            name: "day",
            title: "Tag",
            type: "object",
            options: { columns: 3 },
            fields: [
              defineField({
                name: "day",
                title: "Tag",
                type: "string",
                validation: createStringValidation("label"),
              }),

              defineField({
                name: "from",
                title: "Von",
                type: "time-select",
                validation: (r) => r.required(),
              }),

              defineField({
                name: "to",
                title: "Bis",
                type: "time-select",
                validation: (r) => r.required(),
              }),
            ],
            preview: {
              select: { day: "day", from: "from", to: "to" },
              prepare: ({ day, from, to }) => ({
                title: day,
                subtitle: from && to && `${from} - ${to} Uhr`,
              }),
            },
          }),
        ],
      }),

      defineField({
        name: "location",
        title: "Standort",
        type: "object",
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

          defineField({
            name: "address",
            title: "Adresse",
            type: "object",
            fields: [
              defineField({
                name: "street",
                title: "Straße & Hausnummer",
                type: "string",
                validation: createStringValidation("label"),
              }),

              defineField({
                name: "zipAndCity",
                title: "PLZ und Stadt",
                type: "string",
                validation: createStringValidation("label"),
              }),
            ],
          }),

          defineField({
            name: "mapImage",
            title: "Kartenausschnitt",
            description: "Ein Kartenausschnitt, der den Standort der EMA zeigt.",
            type: "default-image",
            validation: (r) => r.required(),
          }),

          defineField({
            name: "mapsLink",
            title: "Standort-Link",
            description: "Ein Link zur Adresse der EMA auf Google Maps",
            type: "url",
            validation: (r) => r.required(),
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Kontakt" }),
    },
  }),
};
