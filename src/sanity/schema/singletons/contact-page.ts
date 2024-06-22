import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { MapPinIcon } from "lucide-react";

export const contactPage: SchemaTypeDef = {
  singleton: true,
  definition: defineType({
    name: "contact-page",
    title: "Kontakt",
    type: "document",
    icon: MapPinIcon,
    groups: [],
    fields: [
      defineField({
        name: "heading",
        title: "Überschrift",
        type: "string",
      }),
      defineField({
        name: "preview",
        title: "Vorschau",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "intorduction",
            title: "Einleitung",
            type: "text",
          }),
          defineField({
            name: "readMoreButtonLabel",
            title: "Mehr lesen Text",
            type: "string",
          }),
        ],
      }),
      defineField({
        name: "infoEvening",
        title: "Infoabend",
        type: "object",
        fields: [
          defineField({
            name: "name",
            title: "Name",
            type: "string",
          }),
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "previewText",
            title: "Vorschautext",
            type: "text",
          }),
        ],
      }),
      defineField({
        name: "personalConsulting",
        title: "Persönliches Gespräch",
        type: "object",
        fields: [
          defineField({
            name: "name",
            title: "Name",
            type: "string",
          }),
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "previewText",
            title: "Vorschautext",
            type: "text",
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Kontakt" }),
    },
  }),
};
