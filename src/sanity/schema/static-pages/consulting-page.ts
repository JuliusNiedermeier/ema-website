import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { InfoIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";
import { createArrayValidation, createStringValidation, getSizeString } from "~/sanity/lib/validations";

export const consultingPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "consulting-page",
    title: "Persönliche Beratung",
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
        name: "splineGraphic",
        title: "Grafik in der Vorschau",
        type: "default-image",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "consultants",
        title: "Gesprächspartner",
        description: getSizeString([1, 10], "Einträge"),
        type: "array",
        validation: createArrayValidation([1, 10]),
        of: [
          defineArrayMember({
            name: "consultant",
            title: "Gesprächspartner",
            type: "default-image",
            validation: (r) => r.required(),
          }),
        ],
      }),

      defineField({
        name: "steps",
        title: "Schritte",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "sendEmailLabel",
            title: "Email absenden",
            description: getSizeString("heading", "Zeichen"),
            type: "string",
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "recieveAppointmentLabel",
            title: "Termin erhalten",
            description: getSizeString("heading", "Zeichen"),
            type: "string",
            validation: createStringValidation("heading"),
          }),
        ],
      }),

      defineField({
        name: "form",
        title: "Formular",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "emailInputPlaceholder",
            title: "Email Platzhaltertext",
            description: getSizeString("label", "Zeichen"),
            type: "string",
            validation: createStringValidation("label"),
          }),

          defineField({
            name: "submitLabel",
            title: "Text auf dem Button zum Absenden",
            description: getSizeString("label", "Zeichen"),
            type: "string",
            validation: createStringValidation("label"),
          }),

          defineField({
            name: "successLabel",
            title: "Erfolgsbenachrichtigungs-Überschrift",
            description: getSizeString("label", "Zeichen"),
            type: "string",
            validation: createStringValidation("label"),
          }),

          defineField({
            name: "successText",
            title: "Erfolgsbenachrichtigungs-Text",
            description: getSizeString("heading", "Zeichen"),
            type: "string",
            validation: createStringValidation("heading"),
          }),
        ],
      }),

      defineField({
        name: "benefits",
        title: "Liste der Vorteile",
        type: "array",
        description: getSizeString([2, 7], "Vorteile"),
        validation: createArrayValidation([3, 7]),
        of: [
          defineArrayMember({
            name: "benefit",
            title: "Vorteil",
            description: getSizeString("heading", "Zeichen"),
            type: "string",
            validation: createStringValidation("heading"),
          }),
        ],
      }),

      defineField({
        name: "alternativeCTA",
        title: "Alternative: Infoabend",
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
      prepare: () => ({ title: "Persönliche Beratung" }),
    },
  }),
};
