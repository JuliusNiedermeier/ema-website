import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { TagIcon } from "lucide-react";

export const category: SchemaTypeDef = {
  type: "dynamic-content",
  definition: defineType({
    name: "category",
    title: "Blogbeitrags-Kategorie",
    icon: TagIcon,
    type: "document",
    fields: [
      defineField({
        name: "title",
        title: "Name",
        type: "string",
      }),
      defineField({
        name: "slug",
        title: "Slug",
        type: "slug",
      }),
    ],
  }),
};
