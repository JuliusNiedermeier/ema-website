import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { SettingsIcon } from "lucide-react";

export const websiteSettingsType: SchemaTypeDef = {
  type: "global-config",
  definition: defineType({
    name: "website-settings",
    title: "Website-Einstellungen",
    type: "document",
    icon: SettingsIcon,
    fields: [
      defineField({
        name: "websiteTitle",
        title: "Titel der Website",
        description: "",
        type: "string",
      }),
      defineField({
        name: "websiteDescription",
        title: "Beschreibung der Website",
        description: "",
        type: "string",
      }),
      defineField({
        name: "gtmID",
        title: "Google-Tag-Manager ID",
        type: "string",
      }),
      defineField({
        name: "logo",
        title: "Logo",
        type: "object",
        fields: [
          defineField({
            name: "textLogoDark",
            title: "Text-Logo auf hellem Hintergrund",
            type: "image",
          }),
          defineField({
            name: "textLogoLight",
            title: "Text-Logo auf dunklem Hintergrund",
            type: "image",
          }),
          defineField({
            name: "logoMarkLight",
            title: "Logo auf hellem Hintergrund",
            type: "image",
          }),
          defineField({
            name: "logoMarkDark",
            title: "Logo auf hellem Hintergrund",
            type: "image",
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Website-Einstellungen" }),
    },
  }),
};
