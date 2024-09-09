import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { MapPinIcon } from "lucide-react";

export const contactPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "contact-page",
    title: "Kontakt",
    type: "document",
    icon: MapPinIcon,
    groups: [],
    fields: [
      defineField({
        name: "heading",
        title: "Überschrift",
        type: "string",
      }),
      defineField({
        name: "description",
        title: "Beschreibung",
        description: "100-300 Zeichen. Worum geht es auf dieser Seite?",
        type: "text",
        validation: (r) => r.required().min(100).max(300),
      }),
      defineField({
        name: "preview",
        title: "Vorschau",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "intorduction",
            title: "Einleitung",
            type: "text",
          }),
          defineField({
            name: "readMoreButtonLabel",
            title: "Mehr lesen Text",
            type: "string",
          }),
        ],
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
          }),
          defineField({
            name: "email",
            title: "Email",
            type: "string",
          }),
          defineField({
            name: "instagram",
            title: "Instagram",
            type: "string",
          }),
        ],
      }),
      defineField({
        name: "officeHours",
        title: "Sprechzeiten",
        type: "array",
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
              }),
              defineField({
                name: "from",
                title: "Von",
                type: "time-select",
              }),
              defineField({
                name: "to",
                title: "Bis",
                type: "time-select",
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
          }),
          defineField({
            name: "description",
            title: "Beschreibung",
            type: "text",
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
              }),
              defineField({
                name: "zipAndCity",
                title: "PLZ und Stadt",
                type: "string",
              }),
            ],
          }),
          defineField({
            name: "map",
            title: "Kartenausschnitt",
            description: "Ein Kartenausschnitt, der den Standort der EMA zeigt.",
            type: "image",
            validation: (r) => r.required(),
          }),
          defineField({
            name: "mapsLink",
            title: "Standort-Link",
            description: "Ein Link zur Adresse der EMA auf Google Maps",
            type: "string",
            validation: (r) => r.required().min(10),
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Kontakt" }),
    },
  }),
};
