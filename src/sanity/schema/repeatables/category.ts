import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { TagIcon } from "lucide-react";

export const category: SchemaTypeDef = {
  type: "repeatable",
  definition: defineType({
    name: "category",
    title: "Kategorie",
    icon: TagIcon,
    type: "document",
    fields: [
      defineField({
        name: "title",
        title: "Name",
        type: "string",
      }),
    ],
  }),
};
