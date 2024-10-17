import { defineArrayMember, defineField } from "sanity";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";

export const portableImageType = defineArrayMember({
  name: "portableImage",
  type: "image",
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Alternativtext",
      description: getSizeString("heading", "Zeichen"),
      validation: createStringValidation("heading"),
    }),
  ],
});
