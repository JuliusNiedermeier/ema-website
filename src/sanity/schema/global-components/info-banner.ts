import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { FlagIcon } from "lucide-react";
import { createStringValidation } from "~/sanity/lib/validations";

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
        validation: createStringValidation([20, 100]),
      }),

      defineField({
        name: "link",
        title: "Link",
        type: "string",
        validation: (r) => r.required(),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Infobanner" }),
    },
  }),
};
