import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { GraduationCapIcon } from "lucide-react";

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
        validation: (r) => r.required().min(5).max(20),
      }),

      defineField({
        name: "detailsHeading",
        title: "Überschrift der Bildungsgang-Beschreibung",
        type: "string",
      }),

      defineField({
        name: "durationAndTrainingTypeHeading",
        title: "Dauer und Ausbildungsart - Überschrift",
        type: "string",
      }),

      defineField({
        name: "lessonTimesHeading",
        title: "Unterrichtszeiten - Überschrift",
        type: "string",
      }),

      defineField({
        name: "holidaysHeading",
        title: "Ferien - Überschrift",
        type: "string",
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
          }),
          defineField({
            name: "applyButtonLabel",
            title: "Bewerbungbutton Text",
            type: "string",
          }),
          defineField({
            name: "backgroundGraphic",
            title: "Hintergrundgrafik",
            type: "default-image",
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
          }),
          defineField({
            name: "description",
            title: "Beschreibung",
            type: "string",
          }),
          defineField({
            name: "learningFieldsHeading",
            title: "Überschrift der Lernfelder",
            description: "5-20 Zeichen",
            type: "string",
            validation: (r) => r.required().min(5).max(20),
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
            validation: (r) => r.required().min(5).max(40),
          }),
          defineField({
            name: "orLabel",
            title: "Label zwischen Vorraussetzungepaketen",
            type: "string",
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
          }),
          defineField({
            name: "description",
            title: "Beschreibung",
            type: "text",
          }),
          defineField({
            name: "linkLabel",
            title: "Link-text",
            type: "string",
          }),
        ],
      }),

      defineField({
        name: "testimonialsHeading",
        title: "Testimonials-Überschrift",
        description: "5-40 Zeichen. Sollte die Zufriedenheit der Schüler unterstreichen.",
        type: "string",
        validation: (r) => r.required().min(3).max(40),
      }),

      defineField({
        name: "faqHeading",
        title: "FAQs-Überschrift",
        description: "10-40 Zeichen",
        type: "string",
        validation: (r) => r.required().min(10).max(40),
      }),

      defineField({
        name: "feesLinkLabel",
        title: "Text für den Link zur Schulbeitragsseite",
        type: "string",
      }),

      defineField({
        name: "alternativesHeading",
        title: "Überschrift zu den alternativen Bildungsgängen",
        description: "10-40 Zeichen",
        type: "string",
        validation: (r) => r.required().min(10).max(40),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Bildungsgang" }),
    },
  }),
};
