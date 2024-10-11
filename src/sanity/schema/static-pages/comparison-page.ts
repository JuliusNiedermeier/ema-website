import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { TableColumnsSplitIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";

export const comparisonPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "comparison-page",
    title: "Angebots-Vergleich",
    type: "document",
    icon: TableColumnsSplitIcon,
    fields: [
      navigationLabel,

      defineField({
        name: "heading",
        title: "Überschrift",
        type: "string",
      }),

      defineField({
        name: "teaser",
        title: "Teaser",
        type: "text",
        validation: (r) => r.required().min(50).max(300),
      }),

      defineField({
        name: "readMoreLabel",
        title: "Mehr lesen Button Text",
        type: "string",
      }),

      defineField({
        name: "previewImages",
        title: "Vorschaubilder",
        type: "array",
        of: [
          defineArrayMember({
            name: "image-item",
            title: "Vorschaubild",
            type: "default-image",
          }),
        ],
      }),

      defineField({
        name: "pathsSection",
        title: "Wegeabschnitt",
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
            name: "image",
            title: "Übersichtsbild",
            type: "default-image",
          }),
        ],
      }),

      defineField({
        name: "subjectsSection",
        title: "Fächerabschnitt",
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
        ],
      }),

      defineField({
        name: "learningFieldsSection",
        title: "Lernfelderabschnitt",
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
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Angebots-Vergleich" }),
    },
  }),
};
