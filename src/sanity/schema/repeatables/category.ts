import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "../../schema";
import { TagIcon } from "lucide-react";

export const category: SchemaTypeDef = {
  definition: defineType({
    name: "category",
    title: "Category",
    icon: TagIcon,
    type: "document",
    fields: [
      defineField({
        name: "title",
        title: "Title",
        type: "string",
      }),
    ],
  }),
};
