import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { UserIcon } from "lucide-react";

export const author: SchemaTypeDef = {
  type: "repeatable",
  definition: defineType({
    name: "author",
    title: "Autor",
    type: "document",
    icon: UserIcon,
    fields: [
      defineField({
        name: "name",
        title: "Name",
        type: "string",
      }),
      defineField({
        name: "image",
        title: "Bild",
        type: "image",
        options: {
          hotspot: true,
        },
      }),
    ],
  }),
};
