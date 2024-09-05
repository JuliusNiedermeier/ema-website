import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { LayoutListIcon } from "lucide-react";

export const blogPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "blog-page",
    title: "Blogbeiträge",
    type: "document",
    icon: LayoutListIcon,
    groups: [],
    fields: [
      defineField({
        name: "latestPostLabel",
        title: "Text über dem neuesten Blogbeitrag",
        description: "5-30 Zeichen",
        type: "string",
        validation: (r) => r.required().min(5).max(30),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Blogbeiträge" }),
    },
  }),
};
