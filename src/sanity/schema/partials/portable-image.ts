import { defineArrayMember } from "sanity";

export const portableImageType = defineArrayMember({
  name: "portableImage",
  type: "image",
  options: { hotspot: true },
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alternative Text",
    },
  ],
});
