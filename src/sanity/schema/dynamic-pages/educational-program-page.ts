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
      defineField({
        name: "subjects",
        title: "Fächer",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "description",
            title: "Beschreibung",
            type: "string",
          }),
          defineField({
            name: "learningFieldsHeading",
            title: "Überschrift der Lernfelder",
            description: "5-20 Zeichen",
            type: "string",
            validation: (r) => r.required().min(5).max(20),
          }),
        ],
      }),
      defineField({
        name: "prerequisites",
        title: "Voraussetzungen",
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
            name: "orLabel",
            title: "Label zwischen Vorraussetzungepaketen",
            type: "string",
          }),
          defineField({
            name: "checkupCTA",
            title: "Checkup CTA",
            type: "object",
            fields: [
              defineField({
                name: "heading",
                title: "Überschrift",
                type: "string",
              }),
              defineField({
                name: "description",
                title: "Beschreibung",
                type: "text",
              }),
              defineField({
                name: "linkLabel",
                title: "Link-text",
                type: "string",
              }),
              defineField({
                name: "image",
                title: "Bild",
                type: "image",
              }),
            ],
          }),
        ],
      }),
      defineField({
        name: "feesLinkLabel",
        title: "Text für den Link zur Schulbeitragsseite",
        type: "string",
      }),
    ],
    preview: {
      prepare: () => ({ title: "Bildungsgang" }),
    },
  }),
};
