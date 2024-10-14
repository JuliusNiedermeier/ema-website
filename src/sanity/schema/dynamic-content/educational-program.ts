import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { GraduationCapIcon } from "lucide-react";
import { createArrayValidation, createStringValidation } from "~/sanity/lib/validations";
import { EducationalProgram } from "../../../../generated/sanity/types";

export const educationalProgram: SchemaTypeDef = {
  type: "dynamic-content",
  definition: defineType({
    name: "educational-program",
    title: "Bildungsgang",
    type: "document",
    icon: GraduationCapIcon,

    validation: (r) =>
      r.custom((program: EducationalProgram | undefined) => {
        return !program?.showHighlightLink || program.highlightLink
          ? true
          : "Es sind nicht alle erforderlichen Felder ausgefüllt.";
      }),

    fields: [
      defineField({
        name: "name",
        title: "Bezeichnung des Bildungsgangs",
        description: "5-30 Zeichen",
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "slug",
        title: "URL freundlicher Text",
        type: "default-slug",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "order",
        title: "Reihenfolge",
        type: "educational-program-order",
      }),

      defineField({
        name: "educationalProgramType",
        title: "Bildungsweg",
        description: "Zu welchem Bildungsweg gehört dieser Bildungsgang?",
        type: "reference",
        to: { type: "educational-program-type" },
        validation: (r) => r.required(),
      }),

      defineField({
        name: "slogan",
        title: "Bildungsgang Slogan",
        description:
          "10-40 Zeichen. Ein aussagekräftiger kurzer Slogan, der den Bildungsgang möglichst effektiv bewirbt.",
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "teaser",
        title: "Einleitende Kurzbeschreibung",
        description: "50-300 Zeichen",
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "highlights",
        title: "Highlights des Bildungsgangs",
        description:
          "2-4 Highlights. Welche Aspekte des Bildungsgangs kommen bei Schülern besonders gut an? Welche Vorteile sollen hervorgehoben werden?",
        type: "array",
        validation: createArrayValidation([2, 4]),
        of: [
          defineArrayMember({
            name: "highlight",
            title: "Highlight",
            type: "object",
            validation: (r) => r.required(),
            fields: [
              defineField({
                name: "heading",
                title: "Highlight Bezeichnung",
                description: "5-20 Zeichen. Eine kurze und möglichst eingängige Bezeichnung.",
                type: "string",
                validation: createStringValidation("heading"),
              }),

              defineField({
                name: "content",
                title: "Beschreibung",
                description: "20-150 Zeichen. Beschreibung des Highlights.",
                type: "text",
                validation: createStringValidation("description"),
              }),

              defineField({
                name: "image",
                title: "Bild",
                type: "default-image",
                validation: (r) => r.required(),
              }),
            ],
          }),
        ],
      }),

      defineField({
        name: "certificate",
        title: "Abschluss",
        type: "program-certificate",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "followUpPrograms",
        title: "Welche Bildungsgänge der EMA können im Anschluss absolviert werden?",
        description:
          "Dem Besucher wird hier ein weiterer Bildungsgang empfohlen, der ihm nach dieser Ausbildung offen steht.",
        type: "object",
        validation: (r) =>
          r.custom((followUpProgramTypes: EducationalProgram["followUpPrograms"]) => {
            return !followUpProgramTypes?.programs?.length ||
              (followUpProgramTypes.heading && followUpProgramTypes.description)
              ? true
              : "Es sind nicht alle erforderlichen Felder ausgefüllt.";
          }),
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "10-40 Zeichen",
            type: "string",
            validation: createStringValidation("heading"),
            hidden: ({ document }) => !(document?.followUpPrograms as any)?.programs?.length,
          }),

          defineField({
            name: "description",
            title: "Beschreibung",
            description: "Was sind die Vorteile diese Bildungsgänge zu verbinden?",
            type: "text",
            validation: createStringValidation("description"),
            hidden: ({ document }) => !(document?.followUpPrograms as any)?.programs?.length,
          }),

          defineField({
            name: "programs",
            title: "Bildungsgänge",
            type: "array",
            validation: (r) => r.max(10),
            of: [
              defineArrayMember({
                name: "educationalProgram",
                title: "Folgebildungsgang",
                type: "reference",
                to: { type: "educational-program" },
                validation: (r) => r.required(),
              }),
            ],
          }),
        ],
      }),

      defineField({
        name: "detailsIntroduction",
        title: "Einleitung der Bildungsgang-Beschreibung",
        description:
          "Dies ist der Anfang des Abschnitts, in dem die Einzelheiten des Bildungsganges beschrieben werden.",
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "duration",
        title: "Ausbildungsdauer",
        description: "5-20 Zeichen. Wie viele Jahre dauert die Ausbildung? Besipiel: '3 Jahre'",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "trainingType",
        title: "Ausbildungsart",
        description: "5-20 Zeichen. Beispiel: 'Ganztagesausbildung'",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "lessonTimes",
        title: "Unterrichtszeiten",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "start",
            title: "Unterrichtsbeginn",
            description: "8-13 Zeichen. Format: '8:00 Uhr'",
            type: "string",
            validation: createStringValidation("label"),
          }),

          defineField({
            name: "end",
            title: "Unterrichtsschluss",
            description: "8-13 Zeichen. Format: '8:00 Uhr'",
            type: "string",
            validation: createStringValidation("label"),
          }),
        ],
      }),

      defineField({
        name: "holidays",
        title: "Ferieninformation",
        description: "10-100 Zeichen",
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "startDate",
        title: "Datum",
        description: "8-20 Zeichen",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "subjects",
        title: "Fächer",
        description: "Mindestens 3 Fächer erforderlich",
        type: "array",
        validation: createArrayValidation([1, 20]),
        of: [
          defineArrayMember({
            name: "subject",
            title: "Fach",
            type: "reference",
            to: { type: "subject" },
            validation: (r) => r.required(),
          }),
        ],
      }),

      defineField({
        name: "learningFields",
        title: "Lernfelder",
        type: "array",
        validation: (r) => r.max(20),
        of: [
          defineArrayMember({
            name: "learning-field",
            title: "Lernfeld",
            type: "object",
            validation: (r) => r.required(),
            fields: [
              defineField({
                name: "short",
                title: "Abkürzung",
                type: "string",
                validation: createStringValidation([1, 5]),
              }),

              defineField({
                name: "long",
                title: "Bezeichnung",
                type: "string",
                validation: createStringValidation([10, 100]),
              }),
            ],
            preview: {
              select: {
                title: "short",
                subtitle: "long",
              },
            },
          }),
        ],
      }),

      defineField({
        name: "showHighlightLink",
        title: "Link zu einer Highlight-Seite anzeigen",
        type: "boolean",
      }),

      defineField({
        name: "highlightLink",
        title: "Link zu einer Highlight-Seite",
        type: "generic-cta",
        hidden: ({ document }) => !document?.showHighlightLink,
      }),

      defineField({
        name: "informationGallery",
        title: "Weitere Informationen",
        description: "2-10 Einträge",
        type: "array",
        validation: createArrayValidation([2, 10]),
        of: [
          defineArrayMember({
            name: "item",
            title: "Eintrag",
            description: "Eintrag bestehend aus einem Bild, einer Überschrift und einem kurzen Text.",
            type: "object",
            validation: (r) => r.required(),
            fields: [
              defineField({
                name: "preHeading",
                title: "Über-Überschrift",
                description: "<20 Zeichen",
                type: "string",
                validation: createStringValidation("label"),
              }),

              defineField({
                name: "heading",
                title: "Überschrift",
                description: "5-40 Zeichen",
                type: "string",
                validation: createStringValidation("heading"),
              }),

              defineField({
                name: "content",
                title: "Inhalt",
                description: "200-500 Zeichen",
                type: "text",
                validation: createStringValidation("description"),
              }),

              defineField({
                name: "image",
                title: "Bild",
                description:
                  "Ein bild das entweder direkten Bezug auf den Text hat oder entfernter mit dem Bildungsweg zusammenhängt.",
                type: "default-image",
                validation: (r) => r.required(),
              }),
            ],
          }),
        ],
      }),

      defineField({
        name: "prerequisites",
        title: "Voraussetzungen",
        description: "Welche Voraussetzungen müssen Bewerber für diesen Bildungsgang erfüllen?",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "description",
            title: "Schriftliche Beschreibung der Grundvoraussetzungen",
            description: "50-300 Zeichen. Was für Interessen oder Fähigkeiten sollten Bewerber mitbringen?",
            type: "text",
            validation: createStringValidation("description"),
          }),

          defineField({
            name: "requirementGroups",
            title: "Voraussetzungskombinationen",
            description:
              "1-5 Kombinationen. Sammlung von Kombinationen von Voraussetzungen, die für die Teilnahme an einem Bildungsweg erforderlich sind.",
            type: "array",
            validation: createArrayValidation([1, 5]),
            of: [
              defineArrayMember({
                name: "requirementGroup",
                title: "Voraussetzungspaket",
                description: "Ein Paket von Voraussetzungen, die zusammen eine Teilnahmebedingung bilden.",
                type: "object",
                validation: (r) => r.required(),
                fields: [
                  defineField({
                    name: "requirements",
                    title: "Voraussetzungen",
                    description:
                      "1-5 Voraussetzungen. Liste der einzelnen Voraussetzungen, die Teil eines Pakets sind.",
                    type: "array",
                    validation: createArrayValidation([1, 5]),
                    of: [
                      defineArrayMember({
                        name: "requirement",
                        title: "Voraussetzung",
                        description: "3-50 Zeichen. Eine einzelne Voraussetzung innerhalb eines Pakets.",
                        type: "string",
                        validation: createStringValidation("label"),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),

      defineField({
        name: "testimonialsIntroduction",
        title: "Einleitung zu den Testimonials",
        description:
          '50-200 Zeichen. Beispiel: "Schüler lieben die Fachoberschule Wirtschaft. Das wir davon überzeugt sind ist klar – überzeug\' dich besser selbst und lies was unsere Schüler sagen."',
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "faq",
        title: "FAQ - Frequently Asked Questions",
        description: "Die häufigsten Fragen zu diesem Bildungsgang können hier beantwortet werden.",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "introduction",
            title: "Beschreibung",
            description: "10-200 Zeichen",
            type: "text",
            validation: createStringValidation("description"),
          }),

          defineField({
            name: "faq",
            title: "Einträge",
            type: "faq-items",
            validation: (r) => r.required().min(3).max(10),
          }),
        ],
      }),

      defineField({
        name: "alternativesIntroduction",
        title: "Einleitung über den alternativen Bildungsgängen",
        description: "50-300 Zeichen",
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "fees",
        title: "Schulbeiträge",
        type: "array",
        validation: createArrayValidation([1, 30]),
        of: [
          defineArrayMember({
            name: "fee",
            title: "Beitrag",
            type: "object",
            validation: (r) => r.required(),
            fields: [
              defineField({
                name: "income",
                title: "Einkommen",
                type: "string",
                validation: createStringValidation("label"),
              }),

              defineField({
                name: "fee",
                title: "Beitrag",
                type: "number",
                validation: (r) => r.required(),
              }),

              defineField({
                name: "isCoverageRate",
                title: "Ist dies der Kostendeckungssatz?",
                type: "boolean",
              }),
            ],
          }),
        ],
      }),
    ],
    preview: {
      select: {
        title: "name",
        subtitle: "educationalProgramType.name",
        media: "highlights.0.image",
      },
    },
  }),
};
