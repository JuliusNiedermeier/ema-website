import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { RouteIcon } from "lucide-react";

export const educationalProgramType: SchemaTypeDef = {
  type: "repeatable",
  definition: defineType({
    name: "educational-program-type",
    title: "Bildungsweg",
    type: "document",
    icon: RouteIcon,
    fields: [
      defineField({
        name: "name",
        title: "Bezeichnung des Bildungswegs",
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
        name: "color",
        title: "Farbe",
        description: "Diese Farbe wird für den Bildungsweg und dessen Bildungsgänge verwendet.",
        type: "color",
        options: { disableAlpha: true },
        validation: (r) => r.required(),
      }),
      defineField({
        name: "promotionalHeadline",
        title: "Bildungsweg Slogan",
        description: "Ein aussagekräftiger kurzer Slogan, der den Bildungsweg möglichst effektiv bewirbt.",
        type: "string",
        validation: (r) => r.required().min(10).max(40),
      }),
      defineField({
        name: "introduction",
        title: "Einleitende Kurzbeschreibung",
        description: "100-500 Zeichen",
        type: "text",
        validation: (r) => r.required().min(100).max(500),
      }),
      defineField({
        name: "readMoreLabel",
        title: "Preview-Link-Text",
        description:
          "5-20 Zeichen. Link-Text, der von anderen Seiten auf diesen Bildungsweg verweist. Zum Beispiel 'Mehr erfahren'.",
        type: "string",
        validation: (r) => r.required().min(5).max(20),
      }),
      defineField({
        name: "certificate",
        title: "Abschluss",
        type: "program-certificate",
      }),
      defineField({
        name: "educationalPrograms",
        title: "Liste der Bildungsgänge",
        description: "Hier werden alle Bildungsgänge dieses Bildungsweges aufgelistet.",
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
            name: "description",
            title: "Beschreibung",
            description: "20-200 Zeichen. Kurze Beschreibung oder Unterüberschrift zu diesem Bereich.",
            type: "text",
            validation: (r) => r.required().min(20).max(200),
          }),
        ],
      }),
      defineField({
        name: "followUpTrainingEnabled",
        title: "Gibt es einen anderen Bildungsweg, der im Anschluss an diesen Bildungsweg empfohlen wird?",
        type: "boolean",
      }),
      defineField({
        name: "followUpTraining",
        title: "Empfehlung des Folgebildungswegs",
        description:
          "Dem Besucher wird hier ein weiterer Bildungsweg empfohlen, den er im Anschluss an diesen Bildungsweg gehen kann.",
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
            name: "description",
            title: "Beschreibung",
            description: "Was sind die Vorteile die beiden Bildungswege zu verbinden?",
            type: "text",
            validation: (r) => r.required().min(50).max(300),
          }),
          defineField({
            name: "educationalProgramType",
            title: "Folgebildungsweg",
            type: "reference",
            to: { type: "educational-program-type" },
            validation: (r) => r.required(),
          }),
        ],
        hidden: ({ document }) => !document?.followUpTrainingEnabled,
      }),
      defineField({
        name: "faq",
        title: "FAQ - Frequently Asked Questions",
        description: "Hier können häufig gestellte Fragen beantwortet werden.",
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
            name: "items",
            title: "Fragen",
            type: "faq-items",
          }),
        ],
      }),
      defineField({
        name: "alternatives",
        title: "Andere Bildungswege",
        description: "Hier werden alle anderen möglichen Bildungswege aufgelistet.",
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
            name: "description",
            title: "Beschreibung",
            description: "50-300 Zeichen",
            type: "text",
            validation: (r) => r.required().min(50).max(200),
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
