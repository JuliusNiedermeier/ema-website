import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { TagIcon } from "lucide-react";
import { createStringValidation } from "~/sanity/lib/validations";

export const category: SchemaTypeDef = {
  type: "dynamic-content",
  definition: defineType({
    name: "category",
    title: "Blogbeitrags-Kategorie",
    icon: TagIcon,
    type: "document",
    fields: [
      defineField({
        name: "name",
        title: "Name",
        type: "string",
        validation: createStringValidation("label"),
      }),
      defineField({
        name: "slug",
        title: "Slug",
        type: "default-slug",
      }),
    ],
  }),
};
