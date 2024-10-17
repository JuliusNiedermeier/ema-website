import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PanelTopIcon } from "lucide-react";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";

export const headerConfigType: SchemaTypeDef = {
  type: "global-component",
  definition: defineType({
    name: "header-config",
    title: "Header",
    type: "document",
    icon: PanelTopIcon,
    fields: [
      defineField({
        name: "educationalProgramsMenuLabel",
        title: "Bildungswege",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "aboutMenuLabel",
        title: "Über uns",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "CTALabel",
        title: "Call-To-Action Text",
        description: getSizeString("label", "Zeichen. Text des Buttons am rechten Rand des Headers."),
        type: "string",
        validation: createStringValidation("label"),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Header" }),
    },
  }),
};
