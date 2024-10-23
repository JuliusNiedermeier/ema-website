import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { GraduationCapIcon } from "lucide-react";
import { createArrayValidation, createStringValidation, getSizeString } from "~/sanity/lib/validations";
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
        name: "seo",
        type: "seo-fields",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "name",
        title: "Bezeichnung des Bildungsgangs",
        description: getSizeString("heading", "Zeichen"),
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "slug",
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
        description: getSizeString(
          "heading",
          "Zeichen. Ein aussagekräftiger kurzer Slogan, der den Bildungsgang möglichst effektiv bewirbt.",
        ),
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "teaser",
        title: "Einleitende Kurzbeschreibung",
        description: getSizeString("description", "Zeichen"),
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "highlights",
        title: "Highlights des Bildungsgangs",
        description: getSizeString(
          [2, 4],
          "Highlights. Welche Aspekte des Bildungsgangs kommen bei Schülern besonders gut an? Welche Vorteile sollen hervorgehoben werden?",
        ),
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
                description: getSizeString("heading", "Zeichen. Eine kurze und möglichst eingängige Bezeichnung."),
                type: "string",
                validation: createStringValidation("heading"),
              }),

              defineField({
                name: "content",
                title: "Beschreibung",
                description: getSizeString("description", "Zeichen. Beschreibung des Highlights."),
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
            preview: {
              select: {
                title: "heading",
                subtitle: "content",
                media: "image",
              },
            },
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
            description: getSizeString("heading", "Zeichen"),
            type: "string",
            validation: createStringValidation("heading"),
            hidden: ({ document }) => !(document?.followUpPrograms as any)?.programs?.length,
          }),

          defineField({
            name: "description",
            title: "Beschreibung",
            description: getSizeString(
              "description",
              "Zeichen. Was sind die Vorteile diese Bildungsgänge zu verbinden?",
            ),
            type: "text",
            validation: createStringValidation("description"),
            hidden: ({ document }) => !(document?.followUpPrograms as any)?.programs?.length,
          }),

          defineField({
            name: "programs",
            title: "Bildungsgänge",
            description: "Maximal 10 Bildungsgänge",
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
        description: getSizeString(
          "description",
          "Zeichen. Dies ist der Anfang des Abschnitts, in dem die Einzelheiten des Bildungsganges beschrieben werden.",
        ),
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "duration",
        title: "Ausbildungsdauer",
        description: getSizeString("label", "Zeichen. Wie viele Jahre dauert die Ausbildung? Besipiel: '3 Jahre'"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "trainingType",
        title: "Ausbildungsart",
        description: getSizeString("label", "Zeichen. Beispiel: 'Ganztagesausbildung'"),
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
            description: getSizeString("label", "Zeichen. Format: '8:00 Uhr'"),
            type: "string",
            validation: createStringValidation("label"),
          }),

          defineField({
            name: "end",
            title: "Unterrichtsschluss",
            description: getSizeString("label", "Zeichen. Format: '8:00 Uhr'"),
            type: "string",
            validation: createStringValidation("label"),
          }),
        ],
      }),

      defineField({
        name: "holidays",
        title: "Ferieninformation",
        description: getSizeString("heading", "Zeichen"),
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "startDate",
        title: "Datum",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "subjects",
        title: "Fächer",
        description: getSizeString([1, 20], "Fächer"),
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
                description: getSizeString([1, 5], "Zeichen"),
                type: "string",
                validation: createStringValidation([1, 5]),
              }),

              defineField({
                name: "long",
                title: "Bezeichnung",
                description: getSizeString([10, 100], "Zeichen"),
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
        description: getSizeString([2, 10], "Einträge"),
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
                description: getSizeString("label", "Zeichen"),
                type: "string",
                validation: createStringValidation("label"),
              }),

              defineField({
                name: "heading",
                title: "Überschrift",
                description: getSizeString("label", "Zeichen"),
                type: "string",
                validation: createStringValidation("heading"),
              }),

              defineField({
                name: "content",
                title: "Inhalt",
                description: getSizeString("description", "Zeichen"),
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
            preview: {
              select: {
                title: "heading",
                subtitle: "content",
                media: "image",
              },
            },
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
            description: getSizeString(
              "description",
              "Zeichen. Was für Interessen oder Fähigkeiten sollten Bewerber mitbringen?",
            ),
            type: "text",
            validation: createStringValidation("description"),
          }),

          defineField({
            name: "requirementGroups",
            title: "Voraussetzungskombinationen",
            description: getSizeString(
              [1, 5],
              "Kombinationen. Sammlung von Kombinationen von Voraussetzungen, die für die Teilnahme an einem Bildungsweg erforderlich sind.",
            ),
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
                    description: getSizeString(
                      [1, 5],
                      "Voraussetzungen. Liste der einzelnen Voraussetzungen, die Teil eines Pakets sind.",
                    ),
                    type: "array",
                    validation: createArrayValidation([1, 5]),
                    of: [
                      defineArrayMember({
                        name: "requirement",
                        title: "Voraussetzung",
                        description: getSizeString(
                          "label",
                          "Zeichen. Eine einzelne Voraussetzung innerhalb eines Pakets.",
                        ),
                        type: "string",
                        validation: createStringValidation("label"),
                      }),
                    ],
                  }),
                ],
                preview: {
                  select: { requirements: "requirements" },
                  prepare: ({ requirements }) => ({ title: (requirements as string[]).join(", ") }),
                },
              }),
            ],
          }),
        ],
      }),

      defineField({
        name: "testimonialsIntroduction",
        title: "Einleitung zu den Testimonials",
        description: getSizeString(
          "description",
          `Zeichen. Beispiel: "Schüler lieben die Fachoberschule Wirtschaft. Das wir davon überzeugt sind ist klar - überzeug' dich besser selbst und lies was unsere Schüler sagen."`,
        ),
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
            description: getSizeString("description", "Zeichen"),
            type: "text",
            validation: createStringValidation("description"),
          }),

          defineField({
            name: "faq",
            title: "Einträge",
            type: "faq-items",
            description: getSizeString([3, 10], "Fragen"),
            validation: (r) => r.required().min(3).max(10),
          }),
        ],
      }),

      defineField({
        name: "alternativesIntroduction",
        title: "Einleitung über den alternativen Bildungsgängen",
        description: getSizeString("description", "Zeichen"),
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
                description: getSizeString("label", "Zeichen"),
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
            preview: {
              select: {
                income: "income",
                fee: "fee",
                isCoverageRate: "isCoverageRate",
              },
              prepare: ({ income, fee, isCoverageRate }) => ({
                title: `Einkommen: ${income} | Beitrag: ${fee}`,
                subtitle: isCoverageRate && "Kostendeckungssatz",
              }),
            },
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
