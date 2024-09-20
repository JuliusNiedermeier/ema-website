import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { FlagIcon } from "lucide-react";

export const infoBannerConfigType: SchemaTypeDef = {
  type: "global-component",
  definition: defineType({
    name: "info-banner-component",
    title: "Infobanner",
    type: "document",
    icon: FlagIcon,
    fields: [
      defineField({
        name: "content",
        title: "Info-Text",
        description: "Text, der im Infobanner angezeigt wird",
        type: "string",
      }),
      defineField({
        name: "link",
        title: "Link",
        type: "string",
      }),
    ],
    preview: {
      prepare: () => ({ title: "Infobanner" }),
    },
  }),
};
