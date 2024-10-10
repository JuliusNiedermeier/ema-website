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
    groups: [
      { name: "hero", title: "Hero", default: true },
      { name: "highlights", title: "Highlights" },
      { name: "details", title: "Eckdaten" },
      { name: "subjects", title: "Fächer" },
      { name: "external-cta", title: "Externer CTA" },
      { name: "follow-up-program", title: "Folgeausbildung" },
      { name: "information-gallery", title: "Informations-Gallerie" },
      { name: "prerequisites", title: "Voraussetungen" },
      { name: "closing-section", title: "Abschluss-Bereich" },
      { name: "fees", title: "Beiträge" },
    ],
    fields: [
      defineField({
        name: "name",
        title: "Bezeichnung des Bildungsgangs",
        description: "5-30 Zeichen",
        type: "string",
        group: "hero",
        validation: (r) => r.required().min(5).max(30),
      }),
      defineField({
        name: "slug",
        title: "URL freundlicher Text",
        type: "default-slug",
        group: "hero",
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
        group: "hero",
        validation: (r) => r.required(),
      }),
      defineField({
        name: "slogan",
        title: "Bildungsgang Slogan",
        description:
          "10-40 Zeichen. Ein aussagekräftiger kurzer Slogan, der den Bildungsgang möglichst effektiv bewirbt.",
        type: "string",
        group: "hero",
        validation: (r) => r.required().min(10).max(40),
      }),
      defineField({
        name: "teaser",
        title: "Einleitende Kurzbeschreibung",
        description: "50-300 Zeichen",
        type: "text",
        group: "hero",
        validation: (r) => r.required().min(50).max(300),
      }),
      defineField({
        name: "highlights",
        title: "Highlights des Bildungsgangs",
        description:
          "2-4 Highlights. Welche Aspekte des Bildungsgangs kommen bei Schülern besonders gut an? Welche Vorteile sollen hervorgehoben werden?",
        type: "array",
        group: "highlights",
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
              defineField({
                name: "image",
                title: "Bild",
                type: "default-image",
              }),
            ],
          }),
        ],
      }),
      defineField({
        name: "certificate",
        title: "Abschluss",
        type: "program-certificate",
        group: "details",
      }),
      defineField({
        name: "followUpPrograms",
        title: "Welche Bildungsgänge der EMA können im Anschluss absolviert werden?",
        description:
          "Dem Besucher wird hier ein weiterer Bildungsgang empfohlen, der ihm nach dieser Ausbildung offen steht.",
        type: "object",
        group: "follow-up-program",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "10-40 Zeichen",
            type: "string",
            validation: (r) => r.required().min(10).max(40),
          }),
          defineField({
            name: "description",
            title: "Beschreibung",
            description: "Was sind die Vorteile diese Bildungsgänge zu verbinden?",
            type: "text",
            validation: (r) => r.required().min(50).max(300),
          }),
          defineField({
            name: "programs",
            title: "Bildungsgänge",
            type: "array",
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
        group: "information-gallery",
      }),

      defineField({
        name: "duration",
        title: "Ausbildungsdauer",
        description: "5-20 Zeichen. Wie viele Jahre dauert die Ausbildung? Besipiel: '3 Jahre'",
        type: "string",
        validation: (r) => r.required().min(5).max(20),
      }),

      defineField({
        name: "trainingType",
        title: "Ausbildungsart",
        description: "5-20 Zeichen. Beispiel: 'Ganztagesausbildung'",
        type: "string",
        validation: (r) => r.required().min(5).max(20),
      }),

      defineField({
        name: "lessonTimes",
        title: "Unterrichtszeiten",
        type: "object",
        fields: [
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
        title: "Ferieninformation",
        description: "10-100 Zeichen",
        type: "string",
        validation: (r) => r.required().min(10).max(100),
      }),

      defineField({
        name: "startDate",
        title: "Datum",
        description: "8-20 Zeichen",
        type: "string",
        validation: (r) => r.required().min(8).max(20),
      }),

      defineField({
        name: "subjects",
        title: "Fächer",
        description: "Mindestens 3 Fächer erforderlich",
        type: "array",
        group: "subjects",
        validation: (r) => r.min(3),
        of: [
          defineArrayMember({
            name: "subject",
            title: "Fach",
            type: "reference",
            to: { type: "subject" },
          }),
        ],
      }),

      defineField({
        name: "showHighlightLink",
        title: "Link zu einer Highlight-Seite anzeigen",
        type: "boolean",
        group: "external-cta",
      }),

      defineField({
        name: "highlightLink",
        title: "Link zu einer Highlight-Seite",
        type: "generic-cta",
        group: "external-cta",
        hidden: ({ document }) => !document?.showHighlightLink,
      }),

      defineField({
        name: "informationGallery",
        title: "Weitere Informationen",
        description: "2-10 Einträge",
        type: "array",
        group: "information-gallery",
        validation: (r) => r.min(2).max(10),
        of: [
          defineArrayMember({
            name: "item",
            title: "Eintrag",
            description: "Eintrag bestehend aus einem Bild, einer Überschrift und einem kurzen Text.",
            type: "object",
            fields: [
              defineField({
                name: "preHeading",
                title: "Über-Überschrift",
                description: "<20 Zeichen",
                type: "string",
                validation: (r) => r.required().max(20),
              }),
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
        group: "prerequisites",
        fields: [
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
        name: "testimonialsIntroduction",
        title: "Einleitung zu den Testimonials",
        description:
          '50-200 Zeichen. Beispiel: "Schüler lieben die Fachoberschule Wirtschaft. Das wir davon überzeugt sind ist klar – überzeug\' dich besser selbst und lies was unsere Schüler sagen."',
        type: "text",
        validation: (r) => r.required().min(50).max(200),
      }),

      defineField({
        name: "FAQs",
        title: "FAQ - Frequently Asked Questions",
        description: "Die häufigsten Fragen zu diesem Bildungsgang können hier beantwortet werden.",
        type: "object",
        group: "closing-section",
        fields: [
          defineField({
            name: "introduction",
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
      defineField({
        name: "alternatives",
        title: "Andere Bildungsgänge",
        description: "Hier werden alle anderen Bildungsgänge aufgelistet.",
        type: "object",
        group: "closing-section",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "10-40 Zeichen",
            type: "string",
            validation: (r) => r.required().min(10).max(40),
          }),
          defineField({
            name: "description",
            title: "Beschreibung",
            description: "50-300 Zeichen",
            type: "text",
            validation: (r) => r.required().min(50).max(200),
          }),
        ],
      }),
      defineField({
        name: "fees",
        type: "program-fees",
        group: "fees",
      }),
    ],
    preview: {
      select: {
        title: "name",
        subtitle: "educationalProgramType.name",
      },
    },
  }),
};
