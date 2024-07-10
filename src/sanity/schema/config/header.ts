import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PanelTopIcon } from "lucide-react";

export const headerConfigType: SchemaTypeDef = {
  type: "config",
  definition: defineType({
    name: "header-config",
    title: "Header",
    type: "document",
    icon: PanelTopIcon,
    fields: [
      defineField({
        name: "CTALabel",
        title: "Call-To-Action Text",
        description: "Text des Buttons am rechten Rand des Headers.",
        type: "string",
      }),
    ],
    preview: {
      prepare: () => ({ title: "Header" }),
    },
  }),
};
