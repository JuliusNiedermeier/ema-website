import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { GraduationCapIcon } from "lucide-react";
import { createStringValidation } from "~/sanity/lib/validations";

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
        description:
          "5-20 Zeichen. Link-Text, der von anderen Seiten auf diesen einen Bildungsgang verweist. Zum Beispiel 'Mehr erfahren'.",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "detailsHeading",
        title: "Überschrift der Bildungsgang-Beschreibung",
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "durationAndTrainingTypeHeading",
        title: "Dauer und Ausbildungsart - Überschrift",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "lessonTimesHeading",
        title: "Unterrichtszeiten - Überschrift",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "holidaysHeading",
        title: "Ferien - Überschrift",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "startDate",
        title: "Ausbildungsbeginn",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "überschrift",
            type: "string",
            validation: createStringValidation("label"),
          }),

          defineField({
            name: "applyButtonLabel",
            title: "Bewerbungbutton Text",
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
            type: "string",
            validation: createStringValidation("short-description"),
          }),

          defineField({
            name: "learningFieldsHeading",
            title: "Überschrift der Lernfelder",
            description: "5-20 Zeichen",
            type: "string",
            validation: createStringValidation("heading"),
          }),
        ],
      }),

      defineField({
        name: "prerequisites",
        title: "Voraussetzungen",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "5-40 Zeichen",
            type: "string",
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "orLabel",
            title: "Label zwischen Vorraussetzungepaketen",
            type: "string",
            validation: createStringValidation("label"),
          }),
        ],
      }),

      defineField({
        name: "comparisonCTA",
        title: "Call-To-Action für die Vergleichsseite",
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
            validation: createStringValidation("short-description"),
          }),

          defineField({
            name: "linkLabel",
            title: "Link-text",
            type: "string",
            validation: createStringValidation("label"),
          }),
        ],
      }),

      defineField({
        name: "testimonialsHeading",
        title: "Testimonials-Überschrift",
        description: "5-40 Zeichen. Sollte die Zufriedenheit der Schüler unterstreichen.",
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "faqHeading",
        title: "FAQs-Überschrift",
        description: "10-40 Zeichen",
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "feesLinkLabel",
        title: "Text für den Link zur Schulbeitragsseite",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "alternativesHeading",
        title: "Überschrift zu den alternativen Bildungsgängen",
        description: "10-40 Zeichen",
        type: "string",
        validation: createStringValidation("heading"),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Bildungsgang" }),
    },
  }),
};
