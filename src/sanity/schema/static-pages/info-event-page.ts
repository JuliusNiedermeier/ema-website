import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { InfoIcon } from "lucide-react";

export const infoEventPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "info-event-page",
    title: "Infoabend",
    type: "document",
    icon: InfoIcon,
    groups: [],
    fields: [
      defineField({
        name: "heading",
        title: "Überschrift",
        description: "5-40 Zeichen",
        type: "string",
        validation: (r) => r.required().min(5).max(40),
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
            name: "readMoreLabel",
            title: "Mehr-Lesen-Text",
            type: "string",
          }),
        ],
      }),
      defineField({
        name: "speaker",
        title: "Teammitglieder, die beim Infoabend sind",
        type: "array",
        of: [
          defineArrayMember({
            name: "speaker",
            title: "Teammitglied",
            type: "image",
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
            title: "Veranstaltung",
            description: "Daten zu einer Infoveranstaltung",
            type: "object",
            fields: [
              defineField({
                name: "eventDate",
                title: "Beginn der Veranstaltung",
                description: "An welchem Datum und um wie viel Uhr beginnt diese Veranstltung?",
                type: "datetime",
                validation: (r) => r.required(),
              }),
            ],
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
                type: "image",
              }),
            ],
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
          defineField({
            name: "buttonLabel",
            title: "Button-Text",
            description: "Text auf dem Button, der zur persönlichen Beratung verlinkt.",
            type: "string",
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Infoabend" }),
    },
  }),
};
