import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { UserIcon } from "lucide-react";
import { createStringValidation } from "~/sanity/lib/validations";

export const author: SchemaTypeDef = {
  type: "dynamic-content",
  definition: defineType({
    name: "author",
    title: "Blogbeitrags-Autor",
    type: "document",
    icon: UserIcon,
    fields: [
      defineField({
        name: "name",
        title: "Name",
        type: "string",
        validation: createStringValidation("name"),
      }),
      defineField({
        name: "image",
        title: "Bild",
        type: "default-image",
        validation: (r) => r.required(),
      }),
    ],
  }),
};
