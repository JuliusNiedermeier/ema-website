import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { TagIcon } from "lucide-react";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";

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
        title: "Bezeichnung",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),
      defineField({
        name: "slug",
        title: "Slug",
        type: "default-slug",
        validation: (r) => r.required(),
      }),
    ],
  }),
};
