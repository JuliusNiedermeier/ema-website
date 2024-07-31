import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { GraduationCapIcon } from "lucide-react";

export const educationalProgramPage: SchemaTypeDef = {
  type: "dynamic-page",
  definition: defineType({
    name: "educational-program-page",
    title: "Bildungsgang",
    type: "document",
    icon: GraduationCapIcon,
    groups: [],
    fields: [
      defineField({
        name: "programDetails",
        title: "Details",
        type: "object",
        fields: [
          defineField({
            name: "startDate",
            title: "Ausbildungsbeginn",
            type: "object",
            fields: [
              defineField({
                name: "applyButtonLabel",
                title: "Bewerbungbutton Text",
                type: "string",
              }),
              defineField({
                name: "backgroundGraphic",
                title: "Hintergrundgrafik",
                type: "image",
              }),
            ],
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Bildungsgang" }),
    },
  }),
};
