import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { RouteIcon } from "lucide-react";

export const educationalProgramTypePage: SchemaTypeDef = {
  type: "dynamic-page",
  definition: defineType({
    name: "educational-program-type-page",
    title: "Bildungsweg",
    type: "document",
    icon: RouteIcon,
    groups: [],
    fields: [
      defineField({
        name: "readMoreLabel",
        title: "Preview-Link-Text",
        description:
          "5-20 Zeichen. Link-Text, der von anderen Seiten auf diesen einen Bildungsweg verweist. Zum Beispiel 'Mehr erfahren'.",
        type: "string",
        validation: (r) => r.required().min(5).max(20),
      }),

      defineField({
        name: "faqHeading",
        title: "FAQs-Überschrift",
        description: "10-40 Zeichen",
        type: "string",
        validation: (r) => r.required().min(10).max(40),
      }),

      defineField({
        name: "alternativesHeading",
        title: "Überschrift zu den alternativen Bildungswegen",
        description: "10-40 Zeichen",
        type: "string",
        validation: (r) => r.required().min(10).max(40),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Bildungsweg" }),
    },
  }),
};
