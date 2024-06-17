import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "../../schema";
import { UserIcon } from "lucide-react";

export const author: SchemaTypeDef = {
  definition: defineType({
    name: "author",
    title: "Author",
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
        title: "Image",
        type: "image",
        options: {
          hotspot: true,
        },
      }),
    ],
  }),
};
