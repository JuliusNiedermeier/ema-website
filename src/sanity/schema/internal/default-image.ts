import { defineType } from "sanity";
import { SchemaTypeDef } from "..";

export const defaultImage: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    name: "default-image",
    type: "image",
    fields: [
      {
        name: "alt",
        type: "string",
        title: "Alternativtext",
      },
    ],
  }),
};
