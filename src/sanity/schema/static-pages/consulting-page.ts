import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { InfoIcon } from "lucide-react";

export const consultingPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "consulting-page",
    title: "Persönliche Beratung",
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
          defineField({
            name: "splineGraphic",
            title: "Grafik in der Vorschau",
            type: "image",
          }),
        ],
      }),
      defineField({
        name: "consultants",
        title: "Gesprächspartner",
        type: "array",
        of: [
          defineArrayMember({
            name: "consultant",
            title: "Gesprächspartner",
            type: "object",
            fields: [
              defineField({
                name: "name",
                title: "Name",
                type: "string",
              }),
              defineField({
                name: "image",
                title: "Foto",
                type: "image",
              }),
            ],
          }),
        ],
      }),
      defineField({
        name: "steps",
        title: "Schritte",
        type: "object",
        fields: [
          defineField({
            name: "sendEmailLabel",
            title: "Email absenden",
            type: "string",
          }),
          defineField({
            name: "recieveAppointmentLabel",
            title: "Termin erhalten",
            type: "string",
          }),
        ],
      }),
      defineField({
        name: "form",
        title: "Formular",
        type: "object",
        fields: [
          defineField({
            name: "emailInputPlaceholder",
            title: "Email Platzhaltertext",
            type: "string",
          }),
          defineField({
            name: "submitLabel",
            title: "Text auf dem Button zum Absenden",
            type: "string",
          }),
          defineField({
            name: "successLabel",
            title: "Erfolgsbenachrichtigungs-Überschrift",
            type: "string",
          }),
          defineField({
            name: "successText",
            title: "Erfolgsbenachrichtigungs-Text",
            type: "string",
          }),
        ],
      }),
      defineField({
        name: "benefits",
        title: "Liste der Vorteile",
        type: "array",
        of: [
          defineArrayMember({
            name: "benefit",
            title: "Vorteil",
            type: "object",
            fields: [
              defineField({
                name: "label",
                type: "string",
              }),
            ],
          }),
        ],
      }),
      defineField({
        name: "alternativeCTA",
        title: "Alternative: Infoabend",
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
            description: "Text auf dem Button, der zum Infoabend verlinkt.",
            type: "string",
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Persönliche Beratung" }),
    },
  }),
};
