import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { RouteIcon } from "lucide-react";
import { createStringValidation } from "~/sanity/lib/validations";

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
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "faqHeading",
        title: "FAQs-Überschrift",
        description: "10-40 Zeichen",
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "alternativesHeading",
        title: "Überschrift zu den alternativen Bildungswegen",
        description: "10-40 Zeichen",
        type: "string",
        validation: createStringValidation("heading"),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Bildungsweg" }),
    },
  }),
};
