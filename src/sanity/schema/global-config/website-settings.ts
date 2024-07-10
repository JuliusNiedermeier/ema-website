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
    ],
    preview: {
      prepare: () => ({ title: "Website-Einstellungen" }),
    },
  }),
};
