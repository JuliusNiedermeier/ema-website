import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { InfoIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";
import { createArrayValidation, createStringValidation } from "~/sanity/lib/validations";

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
        name: "heading",
        title: "Überschrift",
        description: "5-40 Zeichen",
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "teaser",
        title: "Teaser",
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
        name: "splineGraphic",
        title: "Grafik in der Vorschau",
        type: "default-image",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "consultants",
        title: "Gesprächspartner",
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
            type: "string",
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "recieveAppointmentLabel",
            title: "Termin erhalten",
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
            type: "string",
            validation: createStringValidation("label"),
          }),

          defineField({
            name: "submitLabel",
            title: "Text auf dem Button zum Absenden",
            type: "string",
            validation: createStringValidation("label"),
          }),

          defineField({
            name: "successLabel",
            title: "Erfolgsbenachrichtigungs-Überschrift",
            type: "string",
            validation: createStringValidation("label"),
          }),

          defineField({
            name: "successText",
            title: "Erfolgsbenachrichtigungs-Text",
            type: "string",
            validation: createStringValidation("heading"),
          }),
        ],
      }),

      defineField({
        name: "benefits",
        title: "Liste der Vorteile",
        type: "array",
        validation: createArrayValidation([3, 7]),
        of: [
          defineArrayMember({
            name: "benefit",
            title: "Vorteil",
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
      prepare: () => ({ title: "Persönliche Beratung" }),
    },
  }),
};
