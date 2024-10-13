import { defineArrayMember, defineField } from "sanity";
import { createStringValidation } from "~/sanity/lib/validations";

export const portableImageType = defineArrayMember({
  name: "portableImage",
  type: "image",
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Alternativtext",
      validation: createStringValidation("heading"),
    }),
  ],
  validation: (r) => r.required(),
});
