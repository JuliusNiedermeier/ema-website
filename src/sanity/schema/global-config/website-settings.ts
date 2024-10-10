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
        name: "preventIndexing",
        title: "Suchmaschienen abhalten diese Website zu indexieren",
        description:
          "Ist diese Option aktiviert wird diese Seite von der Indexierung durch Suchmaschienen ausgeschlossen.",
        type: "boolean",
      }),

      defineField({
        name: "gtmID",
        title: "Google-Tag-Manager ID",
        type: "string",
      }),

      defineField({
        name: "favicon",
        title: "Favicon",
        type: "image",
      }),

      defineField({
        name: "logo",
        title: "Logo",
        type: "object",
        fields: [
          defineField({
            name: "textLogoDark",
            title: "Text-Logo auf hellem Hintergrund",
            type: "default-image",
          }),
          defineField({
            name: "textLogoLight",
            title: "Text-Logo auf dunklem Hintergrund",
            type: "default-image",
          }),
          defineField({
            name: "logoMarkLight",
            title: "Logo auf hellem Hintergrund",
            type: "default-image",
          }),
          defineField({
            name: "logoMarkDark",
            title: "Logo auf hellem Hintergrund",
            type: "default-image",
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Website-Einstellungen" }),
    },
  }),
};
