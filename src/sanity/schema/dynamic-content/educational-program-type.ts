import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { RouteIcon } from "lucide-react";
import { createArrayValidation, createStringValidation } from "~/sanity/lib/validations";
import { EducationalProgramType } from "../../../../generated/sanity/types";

export const educationalProgramType: SchemaTypeDef = {
  type: "dynamic-content",
  definition: defineType({
    name: "educational-program-type",
    title: "Bildungsweg",
    type: "document",
    icon: RouteIcon,
    fields: [
      defineField({
        name: "seo",
        type: "seo-fields",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "name",
        title: "Bezeichnung des Bildungswegs",
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
        type: "educational-program-type-order",
      }),

      defineField({
        name: "color",
        title: "Farbe",
        description: "Diese Farbe wird für den Bildungsweg und dessen Bildungsgänge verwendet.",
        type: "color",
        options: { disableAlpha: true },
        validation: (r) => r.required(),
      }),

      defineField({
        name: "slogan",
        title: "Bildungsweg Slogan",
        description: "Ein aussagekräftiger kurzer Slogan, der den Bildungsweg möglichst effektiv bewirbt.",
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "teaser",
        title: "Teaser",
        description:
          "100-500 Zeichen. Ein kurzer Text, der Interesse weckt und die wichtigsten Aspeckte des Bildungsweges erwähnt.",
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "certificate",
        title: "Abschluss",
        type: "program-certificate",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "followUpProgramTypes",
        title: "Welche Bildungswege der EMA können im Anschluss gegangen werden?",
        description:
          "Dem Besucher wird hier ein weiterer Bildungsweg empfohlen, der ihm nach diesem Bildungsweg offen steht.",
        type: "object",
        validation: (r) =>
          r.custom((followUpProgramTypes: EducationalProgramType["followUpProgramTypes"]) => {
            return !followUpProgramTypes?.programTypes?.length ||
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
            hidden: ({ document }) => !(document?.followUpProgramTypes as any)?.programTypes?.length,
          }),

          defineField({
            name: "description",
            title: "Beschreibung",
            description: "Was sind die Vorteile diese Bildungswege zu verbinden?",
            type: "text",
            validation: createStringValidation("description"),
            hidden: ({ document }) => !(document?.followUpProgramTypes as any)?.programTypes?.length,
          }),

          defineField({
            name: "programTypes",
            title: "Bildungswege",
            type: "array",
            validation: (r) => r.max(10),
            of: [
              defineArrayMember({
                name: "educationalProgramType",
                title: "Folgebildungsweg",
                type: "reference",
                to: { type: "educational-program-type" },
                validation: (r) => r.required(),
              }),
            ],
          }),
        ],
      }),

      defineField({
        name: "educationalPrograms",
        title: "Liste der Bildungsgänge",
        description: "Hier werden alle Bildungsgänge dieses Bildungsweges aufgelistet.",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "10-40 Zeichen",
            type: "string",
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "introduction",
            title: "Beschreibung",
            description: "20-200 Zeichen. Kurze Beschreibung oder Unterüberschrift zu diesem Bereich.",
            type: "text",
            validation: createStringValidation("description"),
          }),
        ],
      }),

      defineField({
        name: "faq",
        title: "FAQ - Frequently Asked Questions",
        description: "Hier können häufig gestellte Fragen beantwortet werden.",
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
            name: "items",
            title: "Fragen",
            type: "faq-items",
            validation: (r) => r.required().min(3).max(10),
          }),
        ],
      }),

      defineField({
        name: "alternativesIntroduction",
        title: "Einleitung über den alternativen Bildungswegen",
        description: "50-300 Zeichen",
        type: "text",
        validation: createStringValidation("description"),
      }),
    ],
    preview: {
      select: {
        title: "name",
        subtitle: "slogan",
      },
    },
  }),
};
