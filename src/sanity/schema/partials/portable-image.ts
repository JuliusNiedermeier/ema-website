import { defineArrayMember } from "sanity";

export const portableImageType = defineArrayMember({
  name: "portableImage",
  type: "image",
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alternativtext",
    },
  ],
});
