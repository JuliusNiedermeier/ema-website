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
        name: "map",
        title: "Karte",
        type: "object",
        fields: [
          defineField({
            name: "image",
            title: "Kartenausschnitt",
            description: "Ein Kartenausschnitt, der den Standort der EMA zeigt.",
            type: "image",
            validation: (r) => r.required(),
          }),
          defineField({
            name: "buttonLabel",
            title: "Standort-Link Button Text",
            description: "Text auf dem Link zum Standort.",
            type: "string",
            validation: (r) => r.required().min(5).max(30),
          }),
          defineField({
            name: "buttonLink",
            title: "Standort-Link",
            description: "Ein Link zur Adresse der EMA auf Google Maps",
            type: "string",
            validation: (r) => r.required().min(10),
          }),
        ],
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
        name: "infoEvening",
        title: "Infoveranstaltung",
        type: "object",
        fields: [
          defineField({
            name: "name",
            title: "Name des Abschnitts",
            type: "string",
          }),
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "previewText",
            title: "Vorschautext",
            type: "text",
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
        ],
      }),
      defineField({
        name: "personalConsulting",
        title: "One-on-one Gespräch",
        type: "object",
        fields: [
          defineField({
            name: "name",
            title: "Name des Abschnitts",
            type: "string",
          }),
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "previewText",
            title: "Vorschautext",
            type: "text",
          }),
          defineField({
            name: "booking",
            title: "Terminanfrage",
            description: "",
            type: "object",
            fields: [
              defineField({
                name: "type",
                title: "Auswahl der Art des Gesprächs",
                description: "Auswahl zwischen Online oder Vor-Ort-Meeting",
                type: "object",
                fields: [
                  defineField({
                    name: "onlineLabel",
                    title: "Bezeichnung des Online-Meetings",
                    type: "string",
                  }),
                  defineField({
                    name: "offlineLabel",
                    title: "Bezeichnung des Vor-Ort-Meetings",
                    type: "string",
                  }),
                ],
              }),
              defineField({
                name: "namePlaceholder",
                title: "Platzhaltertext im Name-Eingabefeld",
                description: "Text der im Name-Eingabefeld angezeigt wird, solange das Feld leer ist.",
                type: "string",
              }),
              defineField({
                name: "emailPlaceholder",
                title: "Platzhaltertext im Email-Eingabefeld",
                description: "Text der im Email-Eingabefeld angezeigt wird, solange das Feld leer ist.",
                type: "string",
              }),
              defineField({
                name: "requestButtonLabel",
                title: "Text des Buttons zum Anfordern eines Termins",
                description: "5-20 Zeichen",
                type: "string",
                validation: (r) => r.required().min(5).max(20),
              }),
              defineField({
                name: "alternativeContact",
                title: "Alternative Kontaktwege",
                description: "Hinweis auf andere Wege einen Termin zu vereinbaren.",
                type: "string",
              }),
            ],
          }),
        ],
      }),
      defineField({
        name: "contact",
        title: "Kontaktdaten",
        type: "object",
        fields: [
          defineField({
            name: "name",
            title: "Name des Abschnitts",
            type: "string",
          }),
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
            name: "email",
            title: "Email",
            type: "object",
            fields: [
              defineField({
                name: "heading",
                title: "Überschrift",
                type: "string",
                validation: (r) => r.required().min(5).max(20),
              }),
              defineField({
                name: "email",
                title: "Email",
                type: "string",
                validation: (r) => r.required().email(),
              }),
            ],
          }),
          defineField({
            name: "phone",
            title: "Telefon",
            type: "object",
            fields: [
              defineField({
                name: "heading",
                title: "Überschrift",
                type: "string",
                validation: (r) => r.required().min(5).max(20),
              }),
              defineField({
                name: "number",
                title: "Telefonnummer",
                type: "string",
                validation: (r) => r.required().min(5).max(20),
              }),
            ],
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Kontakt" }),
    },
  }),
};
