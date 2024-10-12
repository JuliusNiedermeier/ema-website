import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { HandCoinsIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";

export const feesPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "fees-page",
    title: "Schulbeitrag",
    type: "document",
    icon: HandCoinsIcon,
    fields: [
      navigationLabel,

      defineField({
        name: "heading",
        title: "Überschrift",
        type: "string",
      }),

      defineField({
        name: "teaser",
        title: "Einleitung",
        type: "text",
      }),

      defineField({
        name: "highlights",
        title: "Highlights",
        type: "array",
        of: [
          defineArrayMember({
            name: "highlight",
            title: "Highlight",
            type: "string",
          }),
        ],
      }),

      defineField({
        name: "programSelectLabel",
        title: "Text über dem Bildungsgangs-Dropdown",
        type: "string",
      }),

      defineField({
        name: "programSelectPlaceholder",
        title: "Bildungsgangs-Dropdown Placeholder",
        description: "Text der im Bildungsgangs-Dropdown angezeigt wird, wenn noch keiner Ausgewählt wurde.",
        type: "string",
      }),

      defineField({
        name: "defaultProgram",
        title: "Voreingestellter Bildungsgang",
        description:
          "Bildungsgang, für den Beiträge angezeigt werden, wenn der Besucher noch keinen anderen Bildungsgang gewählt hat.",
        type: "reference",
        to: { type: "educational-program" },
      }),

      defineField({
        name: "incomeLabel",
        title: "Text über dem Haushaltseinkommen",
        type: "string",
      }),

      defineField({
        name: "feeLabel",
        title: "Text über dem Schulbeitrag",
        type: "string",
      }),

      defineField({
        name: "coverageLabel",
        title: "Kostendeckungssatz-Label",
        type: "string",
      }),

      defineField({
        name: "belowCoverageInfo",
        title: "Info für Beiträge unter dem Kostendeckungssatz",
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
        name: "aboveCoverageInfo",
        title: "Info für Beiträge über dem Kostendeckungssatz",
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
      prepare: () => ({ title: "Schulbeitrag" }),
    },
  }),
};
