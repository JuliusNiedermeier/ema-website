import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { InfoIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";

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
        name: "heading",
        title: "Überschrift",
        description: "5-40 Zeichen",
        type: "string",
        validation: (r) => r.required().min(5).max(40),
      }),

      defineField({
        name: "teaser",
        title: "Teaser",
        description: "100-300 Zeichen. Worum geht es auf dieser Seite?",
        type: "text",
        validation: (r) => r.required().min(100).max(300),
      }),

      defineField({
        name: "readMoreLabel",
        title: "Mehr-Lesen-Text",
        type: "string",
      }),

      defineField({
        name: "speaker",
        title: "Teammitglieder, die beim Infoabend sind",
        type: "array",
        of: [
          defineArrayMember({
            name: "speaker",
            title: "Team-Mitglied",
            type: "default-image",
          }),
        ],
      }),

      defineField({
        name: "directionsCTA",
        title: "Wegbeschreibungs-Button",
        type: "object",
        fields: [
          defineField({
            name: "label",
            title: "Button-Text",
            type: "string",
          }),
          defineField({
            name: "link",
            title: "Button-Text",
            type: "url",
          }),
        ],
      }),

      defineField({
        name: "nextDates",
        title: "Nächste Veranstaltungen",
        description: "Daten der nächsten drei Infoveranstaltungen",
        type: "array",
        of: [
          defineArrayMember({
            name: "event",
            title: "Beginn der Infoveranstaltung",
            type: "datetime",
          }),
        ],
      }),

      defineField({
        name: "timeSuffix",
        title: "Uhrzeit-Suffix",
        description: 'Der Text hinter der Uhrzeit einer Veranstaltung (meistens "Uhr").',
        type: "string",
        validation: (r) => r.required().min(1).max(10),
      }),

      defineField({
        name: "benefits",
        title: "Event Highlights/Vorteile",
        type: "array",
        of: [
          defineArrayMember({
            name: "benefit",
            title: "Highlight/Vorteil",
            type: "object",
            fields: [
              defineField({
                name: "title",
                title: "Überschrift",
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
                type: "default-image",
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
      prepare: () => ({ title: "Infoabend" }),
    },
  }),
};
