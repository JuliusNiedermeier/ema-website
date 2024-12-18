import { defineArrayMember, defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { HandCoinsIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";
import { createArrayValidation, createStringValidation, getSizeString } from "~/sanity/lib/validations";

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
        description: getSizeString("heading", "Zeichen"),
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "teaser",
        title: "Einleitung",
        description: getSizeString("description", "Zeichen"),
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "highlights",
        title: "Highlights",
        type: "array",
        description: getSizeString([3, 6], "Highlights"),
        validation: createArrayValidation([3, 6]),
        of: [
          defineArrayMember({
            name: "highlight",
            title: "Highlight",
            description: getSizeString("heading", "Zeichen"),
            type: "string",
            validation: createStringValidation("heading"),
          }),
        ],
      }),

      defineField({
        name: "programSelectLabel",
        title: "Text über dem Bildungsgangs-Dropdown",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "programSelectPlaceholder",
        title: "Bildungsgangs-Dropdown Placeholder",
        description: getSizeString(
          "label",
          "Zeichen. Text der im Bildungsgangs-Dropdown angezeigt wird, wenn noch keiner Ausgewählt wurde.",
        ),
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
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "feeLabel",
        title: "Text über dem Schulbeitrag",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "feeCurrency",
        title: "Währungssymbol hinter dem Betrag des Schulbeitrag",
        description: getSizeString([1, 3], "Zeichen"),
        type: "string",
        validation: createStringValidation([1, 3]),
      }),

      defineField({
        name: "coverageLabel",
        title: "Kostendeckungssatz-Label",
        description: getSizeString("label", "Zeichen"),
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
            description: getSizeString("heading", "Zeichen"),
            type: "string",
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "description",
            title: "Beschreibung",
            description: getSizeString("description", "Zeichen"),
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
            description: getSizeString("heading", "Zeichen"),
            type: "string",
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "description",
            title: "Beschreibung",
            description: getSizeString("description", "Zeichen"),
            type: "text",
            validation: createStringValidation("description"),
          }),
        ],
      }),

      defineField({
        name: "videoHeading",
        title: "Video-Überschrift",
        description: getSizeString("heading", "Zeichen"),
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "videoIntroduction",
        title: "Video-Einleitung",
        description: getSizeString("description", "Zeichen"),
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "videoThumbnail",
        title: "Video-Titelbild",
        type: "image",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "video",
        title: "Video",
        type: "file",
        validation: (r) => r.required(),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Schulbeitrag" }),
    },
  }),
};
