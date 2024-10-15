import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { HandCoinsIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";
import { createArrayValidation, createStringValidation } from "~/sanity/lib/validations";

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
        name: "seo",
        type: "seo-fields",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "heading",
        title: "Überschrift",
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "teaser",
        title: "Einleitung",
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "highlights",
        title: "Highlights",
        type: "array",
        validation: createArrayValidation([3, 6]),
        of: [
          defineArrayMember({
            name: "highlight",
            title: "Highlight",
            type: "string",
            validation: createStringValidation("heading"),
          }),
        ],
      }),

      defineField({
        name: "programSelectLabel",
        title: "Text über dem Bildungsgangs-Dropdown",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "programSelectPlaceholder",
        title: "Bildungsgangs-Dropdown Placeholder",
        description: "Text der im Bildungsgangs-Dropdown angezeigt wird, wenn noch keiner Ausgewählt wurde.",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "defaultProgram",
        title: "Voreingestellter Bildungsgang",
        description:
          "Bildungsgang, für den Beiträge angezeigt werden, wenn der Besucher noch keinen anderen Bildungsgang gewählt hat.",
        type: "reference",
        to: { type: "educational-program" },
        validation: (r) => r.required(),
      }),

      defineField({
        name: "incomeLabel",
        title: "Text über dem Haushaltseinkommen",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "feeLabel",
        title: "Text über dem Schulbeitrag",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "feeCurrency",
        title: "Währungssymbol hinter dem Betrag des Schulbeitrag",
        type: "string",
        validation: createStringValidation([1, 3]),
      }),

      defineField({
        name: "coverageLabel",
        title: "Kostendeckungssatz-Label",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "belowCoverageInfo",
        title: "Info für Beiträge unter dem Kostendeckungssatz",
        type: "object",
        validation: (r) => r.required(),
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
        name: "aboveCoverageInfo",
        title: "Info für Beiträge über dem Kostendeckungssatz",
        type: "object",
        validation: (r) => r.required(),
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
      prepare: () => ({ title: "Schulbeitrag" }),
    },
  }),
};
