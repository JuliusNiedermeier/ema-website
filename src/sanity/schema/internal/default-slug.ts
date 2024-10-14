import { defineType } from "sanity";
import { SchemaTypeDef } from "..";

export const defaultSlug: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    name: "default-slug",
    title: "URL freundlicher Text",
    description: "Kann durch klicken auf 'Generate' automatisch erzeugt werden.",
    type: "slug",
    options: {
      source: "name",
      maxLength: 30,
    },
  }),
};
