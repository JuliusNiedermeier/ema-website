import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { GraduationCapIcon } from "lucide-react";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";

export const educationalProgramPage: SchemaTypeDef = {
  type: "dynamic-page",
  definition: defineType({
    name: "educational-program-page",
    title: "Bildungsgang",
    type: "document",
    icon: GraduationCapIcon,
    groups: [],
    fields: [
      defineField({
        name: "readMoreLabel",
        title: "Preview-Link-Text",
        description: getSizeString(
          "label",
          "Zeichen. Link-Text, der von anderen Seiten auf diesen einen Bildungsgang verweist. Zum Beispiel 'Mehr erfahren'.",
        ),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "detailsHeading",
        title: "Überschrift der Bildungsgang-Beschreibung",
        description: getSizeString("heading", "Zeichen"),
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "durationAndTrainingTypeHeading",
        title: "Dauer und Ausbildungsart - Überschrift",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "lessonTimesHeading",
        title: "Unterrichtszeiten - Überschrift",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "holidaysHeading",
        title: "Ferien - Überschrift",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "startDate",
        title: "Ausbildungsbeginn",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "heading",
            title: "überschrift",
            description: getSizeString("label", "Zeichen"),
            type: "string",
            validation: createStringValidation("label"),
          }),

          defineField({
            name: "applyButtonLabel",
            title: "Bewerbungbutton Text",
            description: getSizeString("label", "Zeichen"),
            type: "string",
            validation: createStringValidation("label"),
          }),

          defineField({
            name: "backgroundGraphic",
            title: "Hintergrundgrafik",
            type: "default-image",
            validation: (r) => r.required(),
          }),
        ],
      }),

      defineField({
        name: "subjects",
        title: "Fächer",
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
            description: getSizeString("short-description", "Zeichen"),
            type: "string",
            validation: createStringValidation("short-description"),
          }),

          defineField({
            name: "learningFieldsHeading",
            title: "Überschrift der Lernfelder",
            description: getSizeString("heading", "Zeichen"),
            type: "string",
            validation: createStringValidation("heading"),
          }),
        ],
      }),

      defineField({
        name: "prerequisites",
        title: "Voraussetzungen",
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
            name: "orLabel",
            title: "Label zwischen Vorraussetzungepaketen",
            description: getSizeString("label", "Zeichen"),
            type: "string",
            validation: createStringValidation("label"),
          }),
        ],
      }),

      defineField({
        name: "comparisonCTA",
        title: "Call-To-Action für die Vergleichsseite",
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
            description: getSizeString("short-description", "Zeichen"),
            type: "text",
            validation: createStringValidation("short-description"),
          }),

          defineField({
            name: "linkLabel",
            title: "Link-text",
            description: getSizeString("label", "Zeichen"),
            type: "string",
            validation: createStringValidation("label"),
          }),
        ],
      }),

      defineField({
        name: "testimonialsHeading",
        title: "Testimonials-Überschrift",
        description: getSizeString("heading", "Zeichen. Sollte die Zufriedenheit der Schüler unterstreichen."),
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "faqHeading",
        title: "FAQs-Überschrift",
        description: getSizeString("heading", "Zeichen"),
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "feesLinkLabel",
        title: "Text für den Link zur Schulbeitragsseite",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "alternativesHeading",
        title: "Überschrift zu den alternativen Bildungsgängen",
        description: getSizeString("heading", "Zeichen"),
        type: "string",
        validation: createStringValidation("heading"),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Bildungsgang" }),
    },
  }),
};
