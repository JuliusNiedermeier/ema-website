import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PanelBottomIcon } from "lucide-react";

export const footerConfigType: SchemaTypeDef = {
  type: "global-component",
  definition: defineType({
    name: "footer-config",
    title: "Footer",
    type: "document",
    icon: PanelBottomIcon,
    fields: [
      defineField({
        name: "copyrightNotice",
        title: "Copyright-Text",
        description: "Hinweis auf das Copyright. Erscheint am unteren Rand des Footers.",
        type: "string",
      }),
    ],
    preview: {
      prepare: () => ({ title: "Footer" }),
    },
  }),
};
