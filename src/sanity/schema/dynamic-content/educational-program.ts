import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { GraduationCapIcon } from "lucide-react";

export const educationalProgram: SchemaTypeDef = {
  type: "dynamic-content",
  definition: defineType({
    name: "educational-program",
    title: "Bildungsgang",
    type: "document",
    icon: GraduationCapIcon,
    fields: [
      defineField({
        name: "name",
        title: "Bezeichnung des Bildungsgangs",
        description: "5-30 Zeichen",
        type: "string",
        validation: (r) => r.required().min(5).max(30),
      }),
      defineField({
        name: "slug",
        title: "URL freundlicher Text",
        type: "default-slug",
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
        name: "promotionalHeadline",
        title: "Bildungsgang Slogan",
        description:
          "10-40 Zeichen. Ein aussagekräftiger kurzer Slogan, der den Bildungsgang möglichst effektiv bewirbt.",
        type: "string",
        validation: (r) => r.required().min(10).max(40),
      }),
      defineField({
        name: "introduction",
        title: "Einleitende Kurzbeschreibung",
        description: "50-300 Zeichen",
        type: "text",
        validation: (r) => r.required().min(50).max(300),
      }),
      defineField({
        name: "highlights",
        title: "Highlights des Bildungsgangs",
        description:
          "2-4 Highlights. Welche Aspekte des Bildungsgangs kommen bei Schülern besonders gut an? Welche Vorteile sollen hervorgehoben werden?",
        type: "array",
        validation: (r) => r.required().min(2).max(4),
        of: [
          defineArrayMember({
            name: "highlight",
            title: "Highlight",
            type: "object",
            fields: [
              defineField({
                name: "heading",
                title: "Highlight Bezeichnung",
                description: "5-20 Zeichen. Eine kurze und möglichst eingängige Bezeichnung.",
                type: "string",
                validation: (r) => r.required().min(5).max(20),
              }),
              defineField({
                name: "content",
                title: "Beschreibung",
                description: "20-150 Zeichen. Beschreibung des Highlights.",
                type: "text",
                validation: (r) => r.required().min(20).max(150),
              }),
            ],
          }),
        ],
      }),
      defineField({
        name: "certificate",
        title: "Abschluss",
        type: "program-certificate",
      }),
      defineField({
        name: "programDetails",
        title: "Eckdaten zum Bildungsgang",
        description: "Wichtige Daten, und Zeiten.",
        type: "object",
        fields: [
          defineField({
            name: "durationAndType",
            title: "Ausbildungsdauer & Art der Ausbildung",
            type: "object",
            fields: [
              defineField({
                name: "heading",
                title: "Überschrift",
                description: "5-30 Zeichen",
                type: "string",
                validation: (r) => r.required().min(5).max(30),
              }),
              defineField({
                name: "duration",
                title: "Ausbildungsdauer",
                description: "5-20 Zeichen. Wie viele Jahre dauert die Ausbildung? Besipiel: '3 Jahre'",
                type: "string",
                validation: (r) => r.required().min(5).max(20),
              }),
              defineField({
                name: "type",
                title: "Ausbildungsart",
                description: "5-20 Zeichen. Beispiel: 'Ganztagesausbildung'",
                type: "string",
                validation: (r) => r.required().min(5).max(20),
              }),
            ],
          }),
          defineField({
            name: "lessonTimes",
            title: "Unterrichtszeiten",
            type: "object",
            fields: [
              defineField({
                name: "heading",
                title: "Überschrift",
                description: "5-30 Zeichen",
                type: "string",
                validation: (r) => r.required().min(5).max(30),
              }),
              defineField({
                name: "start",
                title: "Unterrichtsbeginn",
                description: "8-13 Zeichen. Format: '8:00 Uhr'",
                type: "string",
                validation: (r) => r.required().min(8).max(13),
              }),
              defineField({
                name: "end",
                title: "Unterrichtsschluss",
                description: "8-13 Zeichen. Format: '8:00 Uhr'",
                type: "string",
                validation: (r) => r.required().min(8).max(13),
              }),
            ],
          }),
          defineField({
            name: "holidays",
            title: "Ferien",
            type: "object",
            fields: [
              defineField({
                name: "heading",
                title: "Überschrift",
                description: "5-30 Zeichen",
                type: "string",
                validation: (r) => r.required().min(5).max(30),
              }),
              defineField({
                name: "info",
                title: "Ferieninformation",
                description: "10-100 Zeichen",
                type: "string",
                validation: (r) => r.required().min(10).max(100),
              }),
            ],
          }),
          defineField({
            name: "startDate",
            title: "Ausbildungsbeginn",
            description: "An welchem Datum beginnt diese Ausbildung?",
            type: "object",
            fields: [
              defineField({
                name: "heading",
                title: "Überschrift",
                description: "5-30 Zeichen",
                type: "string",
                validation: (r) => r.required().min(5).max(30),
              }),
              defineField({
                name: "date",
                title: "Datum",
                description: "8-20 Zeichen",
                type: "string",
                validation: (r) => r.required().min(8).max(20),
              }),
            ],
          }),
        ],
      }),
      defineField({
        name: "furtherInformation",
        title: "Weitere Informationen",
        description: "2-10 Einträge",
        type: "array",
        validation: (r) => r.min(2).max(10),
        of: [
          defineArrayMember({
            name: "item",
            title: "Eintrag",
            description: "Eintrag bestehend aus einem Bild, einer Überschrift und einem kurzen Text.",
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
                name: "content",
                title: "Inhalt",
                description: "200-500 Zeichen",
                type: "text",
                validation: (r) => r.required().min(200).max(500),
              }),
              defineField({
                name: "image",
                title: "Bild",
                description:
                  "Ein bild das entweder direkten Bezug auf den Text hat oder entfernter mit dem Bildungsweg zusammenhängt.",
                type: "image",
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
            title: "Schriftliche Beschreibung der Grundvoraussetzungen",
            description: "50-300 Zeichen. Was für Interessen oder Fähigkeiten sollten Bewerber mitbringen?",
            type: "text",
            validation: (r) => r.required().min(50).max(300),
          }),
          defineField({
            name: "requirementGroups",
            title: "Voraussetzungskombinationen",
            description:
              "1-5 Kombinationen. Sammlung von Kombinationen von Voraussetzungen, die für die Teilnahme an einem Bildungsweg erforderlich sind.",
            type: "array",
            validation: (r) => r.min(1).max(5),
            of: [
              defineArrayMember({
                name: "requirementGroup",
                title: "Voraussetzungspaket",
                description: "Ein Paket von Voraussetzungen, die zusammen eine Teilnahmebedingung bilden.",
                type: "object",
                fields: [
                  defineField({
                    name: "requirements",
                    title: "Voraussetzungen",
                    description:
                      "1-5 Voraussetzungen. Liste der einzelnen Voraussetzungen, die Teil eines Pakets sind.",
                    type: "array",
                    validation: (r) => r.min(1).max(5),
                    of: [
                      defineArrayMember({
                        name: "requirement",
                        title: "Voraussetzung",
                        description: "3-50 Zeichen. Eine einzelne Voraussetzung innerhalb eines Pakets.",
                        type: "string",
                        validation: (r) => r.required().min(3).max(50),
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
        name: "subjects",
        title: "Fächer",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "5-20 Zeichen",
            type: "string",
            validation: (r) => r.required().min(5).max(20),
          }),
          defineField({
            name: "description",
            title: "Beschreibung",
            description: "10-50 Zeichen",
            type: "text",
            validation: (r) => r.min(10).max(50),
          }),
          defineField({
            name: "examSubjectsHeading",
            title: "Prüfungsfächer Überschrift",
            description: "5-20 Zeichen",
            type: "string",
            validation: (r) => r.required().min(5).max(20),
          }),
          defineField({
            name: "items",
            title: "Subjects",
            description: "Mindestens 3 Fächer erforderlich",
            type: "array",
            validation: (r) => r.min(3),
            of: [
              defineArrayMember({
                name: "subject",
                title: "Fach",
                type: "object",
                fields: [
                  defineField({
                    name: "name",
                    title: "Bezeichnung",
                    description: "5-30 Zeichen",
                    type: "string",
                    validation: (r) => r.required().min(5).max(30),
                  }),
                  defineField({
                    name: "isExamSubject",
                    title: "Ist dies ein Prüfungsfach?",
                    type: "boolean",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      defineField({
        name: "testimonials",
        title: "Testimonials",
        description: "Positive Aussagen der Schüler zu diesem Bildungsweg",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "5-40 Zeichen. Sollte die Zufriedenheit der Schüler unterstreichen.",
            type: "string",
            validation: (r) => r.required().min(3).max(40),
          }),
          defineField({
            name: "subheading",
            title: "Unterüberschrift",
            description:
              '50-200 Zeichen. Beispiel: "Schüler lieben die Fachoberschule Wirtschaft. Das wir davon überzeugt sind ist klar – überzeug\' dich besser selbst und lies was unsere Schüler sagen."',
            type: "text",
            validation: (r) => r.required().min(50).max(200),
          }),
        ],
      }),
      defineField({
        name: "FAQs",
        title: "FAQ - Frequently Asked Questions",
        description: "Die häufigsten Fragen zu diesem Bildungsgang können hier beantwortet werden.",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "10-40 Zeichen",
            type: "string",
            validation: (r) => r.required().min(10).max(40),
          }),
          defineField({
            name: "subheading",
            title: "Beschreibung",
            description: "10-200 Zeichen",
            type: "text",
            validation: (r) => r.required().min(10).max(200),
          }),
          defineField({
            name: "faq",
            title: "Einträge",
            type: "faq-items",
          }),
        ],
      }),
    ],
    preview: {
      select: {
        title: "name",
        subtitle: "promotionalHeadline",
      },
    },
  }),
};
