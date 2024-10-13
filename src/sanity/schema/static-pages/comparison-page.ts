import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { TableColumnsSplitIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";
import { createArrayValidation, createStringValidation } from "~/sanity/lib/validations";

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
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "teaser",
        title: "Teaser",
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "readMoreLabel",
        title: "Mehr lesen Button Text",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "previewImages",
        title: "Vorschaubilder",
        type: "array",
        validation: createArrayValidation([3, 3]),
        of: [
          defineArrayMember({
            name: "image-item",
            title: "Vorschaubild",
            type: "default-image",
            validation: (r) => r.required(),
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
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "description",
            title: "Beschreibung",
            type: "text",
            validation: createStringValidation("description"),
          }),

          defineField({
            name: "image",
            title: "Übersichtsbild",
            type: "default-image",
            validation: (r) => r.required(),
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
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "description",
            title: "Beschreibung",
            type: "text",
            validation: createStringValidation("description"),
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
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "description",
            title: "Beschreibung",
            type: "text",
            validation: createStringValidation("description"),
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Angebots-Vergleich" }),
    },
  }),
};
