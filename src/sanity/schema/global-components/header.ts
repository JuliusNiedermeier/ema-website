import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PanelTopIcon } from "lucide-react";

export const headerConfigType: SchemaTypeDef = {
  type: "global-component",
  definition: defineType({
    name: "header-config",
    title: "Header",
    type: "document",
    icon: PanelTopIcon,
    fields: [
      defineField({
        name: "navLinks",
        title: "Navigations-Links",
        type: "object",
        fields: [
          defineField({
            name: "home",
            title: "Home",
            type: "string",
          }),
          defineField({
            name: "about",
            title: "About",
            type: "string",
          }),
          defineField({
            name: "educationalProgramTypes",
            title: "Bidlungswege",
            type: "string",
          }),
          defineField({
            name: "blog",
            title: "Blog",
            type: "string",
          }),
          defineField({
            name: "contact",
            title: "Kontakt",
            type: "string",
          }),
        ],
      }),
      defineField({
        name: "CTALabel",
        title: "Call-To-Action Text",
        description: "Text des Buttons am rechten Rand des Headers.",
        type: "string",
      }),
    ],
    preview: {
      prepare: () => ({ title: "Header" }),
    },
  }),
};
