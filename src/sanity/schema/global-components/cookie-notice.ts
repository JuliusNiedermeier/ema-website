import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { CookieIcon } from "lucide-react";

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
      }),
      defineField({
        name: "description",
        title: "Beschreibung",
        type: "text",
      }),
      defineField({
        name: "acceptLabel",
        title: "Text auf dem 'Akzeptieren'-Button",
        type: "string",
      }),
      defineField({
        name: "rejectLabel",
        title: "Text auf dem 'Ablehnen'-Button",
        type: "string",
      }),
    ],
    preview: {
      prepare: () => ({ title: "Cookie-Hinweis" }),
    },
  }),
};
