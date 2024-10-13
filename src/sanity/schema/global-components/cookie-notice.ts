import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { CookieIcon } from "lucide-react";
import { createStringValidation } from "~/sanity/lib/validations";

export const cookieNoticeConfigType: SchemaTypeDef = {
  type: "global-component",
  definition: defineType({
    name: "cookie-notice-config",
    title: "Cookie-Hinweis",
    type: "document",
    icon: CookieIcon,
    fields: [
      defineField({
        name: "heading",
        title: "Überschrift",
        description: "Hinweis, dass diese Seite Cookies nutzt.",
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
        name: "acceptLabel",
        title: "Text auf dem 'Akzeptieren'-Button",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "rejectLabel",
        title: "Text auf dem 'Ablehnen'-Button",
        type: "string",
        validation: createStringValidation("label"),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Cookie-Hinweis" }),
    },
  }),
};
