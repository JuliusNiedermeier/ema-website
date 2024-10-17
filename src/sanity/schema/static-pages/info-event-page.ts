import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { InfoIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";
import { createArrayValidation, createStringValidation, getSizeString } from "~/sanity/lib/validations";

export const infoEventPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "info-event-page",
    title: "Infoabend",
    type: "document",
    icon: InfoIcon,
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
        title: "Teaser",
        description: getSizeString("description", "Zeichen. Worum geht es auf dieser Seite?"),
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "readMoreLabel",
        title: "Mehr-Lesen-Text",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "speaker",
        title: "Teammitglieder, die beim Infoabend sind",
        description: getSizeString([1, 10], "Mitglieder"),
        type: "array",
        validation: createArrayValidation([1, 10]),
        of: [
          defineArrayMember({
            name: "speaker",
            title: "Team-Mitglied",
            type: "default-image",
            validation: (r) => r.required(),
          }),
        ],
      }),

      defineField({
        name: "directionsCTA",
        title: "Wegbeschreibungs-Button",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "label",
            title: "Button-Text",
            description: getSizeString("label", "Zeichen"),
            type: "string",
            validation: createStringValidation("label"),
          }),

          defineField({
            name: "link",
            title: "Button-Text",
            type: "url",
            validation: (r) => r.required(),
          }),
        ],
      }),

      defineField({
        name: "nextDates",
        title: "Nächste Veranstaltungen",
        description: getSizeString([1, 4], "Veranstaltungen. Daten der nächsten Veranstaltungen."),
        type: "array",
        validation: createArrayValidation([1, 4]),
        of: [
          defineArrayMember({
            name: "event",
            title: "Beginn der Infoveranstaltung",
            type: "datetime",
            validation: (r) => r.required(),
          }),
        ],
      }),

      defineField({
        name: "timeSuffix",
        title: "Uhrzeit-Suffix",
        description: getSizeString(
          "label",
          `Zeichen. Der Text hinter der Uhrzeit einer Veranstaltung (meistens "Uhr").`,
        ),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "benefits",
        title: "Event Highlights/Vorteile",
        description: getSizeString([3, 6], "Einträge"),
        type: "array",
        validation: createArrayValidation([3, 6]),
        of: [
          defineArrayMember({
            name: "benefit",
            title: "Highlight/Vorteil",
            type: "object",
            validation: (r) => r.required(),
            fields: [
              defineField({
                name: "title",
                title: "Überschrift",
                description: getSizeString("heading", "Zeichen"),
                type: "string",
                validation: createStringValidation("heading"),
              }),

              defineField({
                name: "description",
                title: "Beschreibung",
                description: getSizeString("short-description", "Zeichen"),
                type: "text",
                validation: createStringValidation("short-description"),
              }),

              defineField({
                name: "image",
                title: "Bild",
                type: "default-image",
                validation: (r) => r.required(),
              }),
            ],

            preview: {
              select: {
                title: "title",
                subtitle: "description",
                media: "image",
              },
            },
          }),
        ],
      }),

      defineField({
        name: "alternativeCTA",
        title: "Alternative: Persönliche Beratung",
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
      prepare: () => ({ title: "Infoabend" }),
    },
  }),
};
