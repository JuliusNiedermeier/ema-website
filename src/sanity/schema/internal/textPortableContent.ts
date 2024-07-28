import { defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { portableBlockType } from "../partials/portable-block";

export const textPortableContent: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    title: "Text Block Content",
    name: "textPortableContent",
    type: "array",
    of: [portableBlockType],
  }),
};
